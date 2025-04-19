
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CloudUpload, Check, X, Loader } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mock function to simulate blockchain interaction
const submitToBlockchain = async (data: any): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate a fake transaction hash
      resolve('0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join(''));
    }, 2000);
  });
};

// Mock ML image quality check
const checkImageQuality = async (imageFile: File): Promise<{isValid: boolean, message: string}> => {
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      // Random result for demo purposes
      const isValid = Math.random() > 0.3;
      resolve({
        isValid,
        message: isValid 
          ? "Image is clear and valid" 
          : "Image may be blurry or missing cable – consider retaking"
      });
    }, 1000);
  });
};

export default function NewReport() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [engineerId, setEngineerId] = useState("");
  const [location, setLocation] = useState<{lat: number; lon: number} | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [imageQuality, setImageQuality] = useState<{isValid: boolean; message: string} | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingSubmissions, setPendingSubmissions] = useState<any[]>([]);

  // Setup online/offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("You are back online");
      
      // Try to submit any pending submissions
      if (pendingSubmissions.length > 0) {
        toast.info(`Attempting to submit ${pendingSubmissions.length} pending reports`);
        // In a real app, we'd implement the submission logic here
      }
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast.warning("You are offline. Submissions will be saved locally.");
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [pendingSubmissions]);

  // Get current time
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toISOString());
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Get location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Could not get your location. Please allow location access.");
          // Fallback to a default location or ask user to input manually
          setLocation({ lat: 0, lon: 0 });
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
      setLocation({ lat: 0, lon: 0 });
    }
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File is too large (max 10MB)");
      return;
    }
    
    // Check file type
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      toast.error("Only JPEG and PNG files are allowed");
      return;
    }
    
    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    // Run quality check
    toast.info("Analyzing image quality...");
    const quality = await checkImageQuality(file);
    setImageQuality(quality);
    
    if (quality.isValid) {
      toast.success(quality.message);
    } else {
      toast.warning(quality.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile) {
      toast.error("Please upload a site photo");
      return;
    }
    
    if (!engineerId) {
      toast.error("Please enter your Engineer ID");
      return;
    }
    
    const submission = {
      engineerId,
      imageFile,
      location,
      timestamp: currentTime,
      imageQuality
    };
    
    if (!isOnline) {
      // Store submission locally
      const newPendingSubmissions = [...pendingSubmissions, submission];
      setPendingSubmissions(newPendingSubmissions);
      localStorage.setItem('pendingSubmissions', JSON.stringify(newPendingSubmissions));
      
      toast.success("Submission saved locally and will be uploaded when you're back online");
      return;
    }
    
    // Online submission
    try {
      setIsSubmitting(true);
      toast.info("Submitting to blockchain...");
      
      // In a real app, we would upload the image to IPFS or similar
      // and then submit the IPFS hash to the blockchain
      const hash = await submitToBlockchain(submission);
      
      setTransactionHash(hash);
      toast.success("Successfully submitted to blockchain!");
      
      // In a real app, we would save this submission to our local history
      // For now, just reset the form after a delay
      setTimeout(() => {
        setImageFile(null);
        setImagePreview(null);
        setEngineerId("");
        setImageQuality(null);
        setTransactionHash(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 3000);
      
    } catch (error) {
      toast.error("Error submitting to blockchain");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">New Site Report</CardTitle>
          <CardDescription className="text-center">Upload site inspection data</CardDescription>
        </CardHeader>
        
        {!isOnline && (
          <Alert className="mx-6 bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200">
            <AlertDescription className="flex items-center">
              <span className="text-sm">You are offline. Your submission will be saved locally and uploaded when you're back online.</span>
            </AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="site-photo">Upload Site Photo</Label>
              <div 
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors
                  ${imagePreview ? 'border-primary/50' : 'border-border'}`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  id="site-photo"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png"
                  className="hidden"
                  onChange={handleImageChange}
                />
                
                {imagePreview ? (
                  <div className="space-y-3">
                    <div className="relative w-full h-48 overflow-hidden rounded-md">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {imageQuality && (
                      <div className={`flex items-center justify-center gap-2 p-2 rounded-md text-sm
                        ${imageQuality.isValid 
                          ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
                          : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'}`}
                      >
                        {imageQuality.isValid 
                          ? <Check className="w-4 h-4" /> 
                          : <X className="w-4 h-4" />
                        }
                        {imageQuality.message}
                      </div>
                    )}
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageFile(null);
                        setImagePreview(null);
                        setImageQuality(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                    >
                      Change Photo
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-2 py-4">
                    <CloudUpload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop<br />
                      JPEG or PNG (max 10MB)
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Engineer ID */}
            <div className="space-y-2">
              <Label htmlFor="engineer-id">Engineer ID</Label>
              <Input 
                id="engineer-id" 
                placeholder="Enter your ID"
                value={engineerId}
                onChange={(e) => setEngineerId(e.target.value)}
              />
            </div>
            
            {/* Auto-filled Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Current Location</Label>
                <Input 
                  value={location ? `${location.lat}, ${location.lon}` : 'Fetching location...'}
                  readOnly
                  className="bg-muted/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Current Time</Label>
                <Input 
                  value={currentTime ? new Date(currentTime).toLocaleString() : 'Fetching time...'}
                  readOnly
                  className="bg-muted/50"
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full text-lg py-6"
              disabled={!imageFile || !engineerId || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Submitting to Blockchain...
                </>
              ) : (
                "Submit to Blockchain"
              )}
            </Button>
          </CardFooter>
        </form>
        
        {transactionHash && (
          <div className="px-6 pb-6 pt-2">
            <div className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 p-4 rounded-md text-center">
              <Check className="w-5 h-5 mx-auto mb-2" />
              <p className="font-medium">Successfully submitted!</p>
              <p className="text-xs mt-1 break-all">Transaction hash: {transactionHash}</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
