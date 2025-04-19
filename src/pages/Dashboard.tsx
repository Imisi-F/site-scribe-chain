
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartBar, Calendar } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

// Mock data for charts
const submissionsWeeklyData = [
  { name: "Mon", submissions: 12 },
  { name: "Tue", submissions: 19 },
  { name: "Wed", submissions: 8 },
  { name: "Thu", submissions: 24 },
  { name: "Fri", submissions: 17 },
  { name: "Sat", submissions: 6 },
  { name: "Sun", submissions: 4 },
];

const submissionTimeData = [
  { name: "Morning", value: 35 },
  { name: "Afternoon", value: 45 },
  { name: "Evening", value: 15 },
  { name: "Night", value: 5 },
];

const pieColors = ["#4C2A85", "#6931CC", "#A383E0", "#C2ACEB"];

const engineersData = [
  { name: "John D.", submissions: 24 },
  { name: "Sarah K.", submissions: 18 },
  { name: "Mike R.", submissions: 27 },
  { name: "Emma L.", submissions: 15 },
  { name: "David P.", submissions: 21 }
];

export default function Dashboard() {
  const [selectedEngineer, setSelectedEngineer] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("week");
  
  // Calculate stats based on mock data
  const totalSubmissions = submissionsWeeklyData.reduce((sum, item) => sum + item.submissions, 0);
  const avgSubmissionTime = 32; // in minutes, mock value
  const industryAvgTime = 45.7; // in minutes, mock value
  const percentageFaster = ((industryAvgTime - avgSubmissionTime) / industryAvgTime * 100).toFixed(0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
          <div className="w-full sm:w-48">
            <Select value={selectedEngineer} onValueChange={setSelectedEngineer}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Engineer" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Engineers</SelectItem>
                  <SelectItem value="john">John D.</SelectItem>
                  <SelectItem value="sarah">Sarah K.</SelectItem>
                  <SelectItem value="mike">Mike R.</SelectItem>
                  <SelectItem value="emma">Emma L.</SelectItem>
                  <SelectItem value="david">David P.</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-48">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center space-x-2">
            <div className="bg-primary/10 p-2 rounded-md">
              <ChartBar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{totalSubmissions}</CardTitle>
              <CardDescription>Total Submissions</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {dateRange === 'week' ? '7 day' : dateRange === 'month' ? '30 day' : 'Current'} submission volume
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center space-x-2">
            <div className="bg-secondary/10 p-2 rounded-md">
              <Calendar className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <CardTitle className="text-lg">{avgSubmissionTime} min</CardTitle>
              <CardDescription>Average Submission Time</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground flex items-center">
              <div className="flex-1 text-xs">
                Industry Avg: {industryAvgTime} min
              </div>
              <div className="flex items-center bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 text-xs font-medium px-2 py-1 rounded-full">
                {percentageFaster}% faster
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Team Performance</CardTitle>
            <CardDescription>Completion rate by priority</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="flex-1 text-sm">High Priority</div>
                <div className="text-sm font-medium">98%</div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary rounded-full h-2" style={{ width: '98%' }}></div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-1 text-sm">Medium Priority</div>
                <div className="text-sm font-medium">87%</div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary rounded-full h-2" style={{ width: '87%' }}></div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-1 text-sm">Low Priority</div>
                <div className="text-sm font-medium">76%</div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary rounded-full h-2" style={{ width: '76%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Weekly Submission Volume</CardTitle>
            <CardDescription>Number of reports submitted per day</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80 w-full p-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={submissionsWeeklyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorSubmissions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4C2A85" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4C2A85" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#8884" vertical={false} />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="submissions" 
                    stroke="#4C2A85" 
                    fillOpacity={1} 
                    fill="url(#colorSubmissions)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Engineers</CardTitle>
              <CardDescription>Ranked by number of submissions</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-60 w-full p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={engineersData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" stroke="#888" />
                    <YAxis dataKey="name" type="category" stroke="#888" width={80} />
                    <Tooltip />
                    <Bar dataKey="submissions" fill="#0099FF" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Submission Time Distribution</CardTitle>
              <CardDescription>When reports are typically submitted</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-60 w-full p-4 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={submissionTimeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {submissionTimeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name, props) => [`${value}%`, name]} />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="absolute flex flex-wrap justify-center gap-3 mt-24">
                  {submissionTimeData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center space-x-1">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: pieColors[index % pieColors.length] }}
                      />
                      <span className="text-xs">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
