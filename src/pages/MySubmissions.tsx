
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Filter, Check, Loader } from "lucide-react";
import { toast } from "sonner";

// Mock data for submissions
const mockSubmissions = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80",
    engineerId: "ENG-1234",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    location: { lat: 37.7749, lon: -122.4194 },
    status: "on-chain",
    transactionHash: "0x7fc5c43d0f7320b26263df33ad040038972b4802e8db5a71defd0d8ed304cf08"
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80",
    engineerId: "ENG-1234",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    location: { lat: 37.7735, lon: -122.3912 },
    status: "on-chain",
    transactionHash: "0x5ba91d8e80fb71cd65b95357351a3b7d491dd6cd9a2e7ecb13f8a3d435d37863"
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
    engineerId: "ENG-1234",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    location: { lat: 37.7835, lon: -122.4122 },
    status: "pending",
    transactionHash: null
  }
];

export default function MySubmissions() {
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  
  // Filter submissions based on search term
  const filteredSubmissions = searchTerm.trim() !== "" 
    ? submissions.filter(sub => 
        sub.engineerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sub.transactionHash && sub.transactionHash.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : submissions;

  // Mock function to generate PDF for download
 const downloadPDF = async (submission: any) => {
  setIsDownloading(submission.id);
  toast.info("Preparing PDF download...");

  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const link = document.createElement("a");
  link.href = "@/components/truetrace.pdf";
  link.download = `truetrace-${submission.id}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  toast.success("PDF report downloaded");
  setIsDownloading(null);
};


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">My Submissions</h1>
        <div className="relative w-full sm:w-64">
          <Input
            placeholder="Search by ID or transaction"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Filter className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      {filteredSubmissions.length === 0 ? (
        <Card className="p-8 text-center">
          <CardContent className="pt-6">
            <p className="text-muted-foreground">No submissions found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSubmissions.map((submission) => (
            <Card key={submission.id} className="overflow-hidden">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={submission.imageUrl} 
                  alt={`Submission ${submission.id}`}
                  className="w-full h-full object-cover"
                />
                <div 
                  className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold
                    ${submission.status === 'on-chain' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/60 dark:text-green-300' 
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300'
                    }`}
                >
                  {submission.status === 'on-chain' ? 'On-Chain' : 'Pending'}
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle>{submission.engineerId}</CardTitle>
                <CardDescription>
                  {new Date(submission.timestamp).toLocaleString()}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2 space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Location: </span>
                  {submission.location.lat}, {submission.location.lon}
                </div>
                
                {submission.transactionHash && (
                  <div>
                    <span className="text-muted-foreground">Tx: </span>
                    <span className="font-mono text-xs break-all">
                      {submission.transactionHash.substring(0, 10)}...
                      {submission.transactionHash.substring(submission.transactionHash.length - 10)}
                    </span>
                  </div>
                )}
              </CardContent>
              
              <CardFooter>
                <Button 
                  variant="outline"
                  onClick={() => downloadPDF(submission)}
                  className="w-full"
                  disabled={isDownloading === submission.id || submission.status === 'pending'}
                >
                  {isDownloading === submission.id ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
