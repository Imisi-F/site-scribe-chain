
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-primary">True</span>
          <span className="text-secondary">Trace</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto">
          Secure and transparent site inspection reporting with blockchain verification
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <Card className="p-1 bg-gradient-to-br from-deepPurple-700 to-deepPurple-500">
          <CardContent className="bg-background p-6 rounded-md h-full flex flex-col">
            <div className="text-center mb-4">
              <div className="bg-primary/10 inline-flex p-3 rounded-full">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-primary h-6 w-6"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mt-3">New Report</h3>
            </div>
            <p className="text-muted-foreground mb-6 flex-grow">
              Create a new site inspection report with photo evidence and blockchain verification.
            </p>
            <Button asChild className="w-full">
              <Link to="/new-report">Create Report</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="p-1 bg-gradient-to-br from-electricBlue-500 to-electricBlue-300">
          <CardContent className="bg-background p-6 rounded-md h-full flex flex-col">
            <div className="text-center mb-4">
              <div className="bg-secondary/10 inline-flex p-3 rounded-full">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-secondary h-6 w-6"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mt-3">My Submissions</h3>
            </div>
            <p className="text-muted-foreground mb-6 flex-grow">
              View your past reports, check their blockchain status, and download as PDF.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/my-submissions">View History</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="p-1 bg-gradient-to-br from-deepPurple-500 to-electricBlue-500">
          <CardContent className="bg-background p-6 rounded-md h-full flex flex-col">
            <div className="text-center mb-4">
              <div className="bg-accent/10 inline-flex p-3 rounded-full">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-accent h-6 w-6"
                >
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mt-3">Dashboard</h3>
            </div>
            <p className="text-muted-foreground mb-6 flex-grow">
              Get insights into submission trends, team performance, and analytics.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/dashboard">View Analytics</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">
          Secure, transparent, and immutable site inspection reports
        </p>
        <div className="flex justify-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <span>Blockchain Verified</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
            <span>Offline Support</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
            <span>Data Analytics</span>
          </div>
        </div>
      </div>
    </div>
  );
}
