import { db } from "@/lib/drizzle";
import { applications } from "@/lib/schema";
import { desc } from "drizzle-orm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ExternalLink, Github, Linkedin, Calendar, Users, BookOpen, Globe, Code, FileText, Eye } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { GeistMono } from "geist/font/mono";
import Link from "next/link";

// Component for displaying project links with previews
function ProjectLinks({ projectsString }: { projectsString: string | null }) {
  if (!projectsString) {
    return <span className="text-slate-400 dark:text-slate-500 italic">No projects</span>;
  }

  let projects: string[] = [];
  try {
    projects = JSON.parse(projectsString);
  } catch {
    // If it's not valid JSON, treat it as a single string
    projects = [projectsString];
  }

  const validProjects = projects.filter(project => 
    project && typeof project === 'string' && project.trim() !== ''
  );

  if (validProjects.length === 0) {
    return <span className="text-slate-400 dark:text-slate-500 italic">No projects</span>;
  }

  const extractDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch {
      return url.substring(0, 20) + '...';
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {validProjects.map((project, index) => (
        <Popover key={index}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-auto py-1 px-2 text-xs hover:bg-blue-50 dark:hover:bg-blue-950/20 border-blue-200 dark:border-blue-800"
            >
              <Globe className="h-3 w-3 mr-1" />
              {extractDomain(project)}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" side="top">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Project Preview
                  </h4>
                </div>
                <Link 
                  href={project} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
              
              <div className="space-y-3">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  <span className="font-medium">URL:</span> {project}
                </div>
                
                <div className="border rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-900">
                  <div className="h-32 flex items-center justify-center">
                    <iframe
                      src={project}
                      className="w-full h-full border-0 scale-50 origin-top-left"
                      style={{
                        width: '200%',
                        height: '200%',
                        pointerEvents: 'none'
                      }}
                      sandbox="allow-same-origin"
                      loading="lazy"
                      title={`Preview of ${extractDomain(project)}`}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Click the external link icon to visit
                  </span>
                  <Button asChild size="sm" className="h-7 text-xs">
                    <Link href={project} target="_blank" rel="noopener noreferrer">
                      Visit Site
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}

// Component for displaying notes with expandable view
function NotesDisplay({ notes }: { notes: string | null }) {
  if (!notes || notes.trim() === '') {
    return <span className="text-slate-400 dark:text-slate-500 italic">No notes</span>;
  }

  const isLong = notes.length > 50;
  const previewText = isLong ? `${notes.substring(0, 50)}...` : notes;

  if (!isLong) {
    return (
      <div className="text-sm text-slate-600 dark:text-slate-400">
        {notes}
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-auto p-0 text-left justify-start hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <div className="flex items-center gap-2">
            <Eye className="h-3 w-3 text-slate-500" />
            <div className="text-sm text-slate-600 dark:text-slate-400">
              {previewText}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" side="top">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Full Notes
            </h4>
          </div>
          <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
            {notes}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default async function DashboardPage() {
  const allApplications = await db
    .select()
    .from(applications)
    .orderBy(desc(applications.createdAt));

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getYearBadgeColor = (year: number) => {
    switch (year) {
      case 1:
        return "bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-400";
      case 2:
        return "bg-blue-100 text-blue-800 dark:bg-blue-950/20 dark:text-blue-400";
      case 3:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-400";
      case 4:
        return "bg-red-100 text-red-800 dark:bg-red-950/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-950/20 dark:text-gray-400";
    }
  };

  const getPositionBadgeColor = (position: string) => {
    if (position.toLowerCase().includes('lead')) {
      return "bg-purple-100 text-purple-800 dark:bg-purple-950/20 dark:text-purple-400";
    }
    return "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/20 dark:text-indigo-400";
  };

  return (
    <div className={`min-h-screen bg-background ${GeistMono.className}`}>
      <div className="max-w-[95vw] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Applications Dashboard
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            View and manage all submitted applications ({allApplications.length} total)
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {allApplications.length}
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Total Applications</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                    {allApplications.filter(app => app.preferredPosition.toLowerCase().includes('lead')).length}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">Leadership Applications</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    {allApplications.filter(app => app.createdAt > new Date(Date.now() - 24 * 60 * 60 * 1000)).length}
                  </p>
                  <p className="text-sm text-purple-600 dark:text-purple-400">Recent (24h)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Table */}
        <Card className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950/20 dark:to-gray-950/20 border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-700 dark:text-slate-300">
              All Applications
            </CardTitle>
            <CardDescription>
              Complete list of student applications with details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-950/50">
                    <TableHead className="w-[200px] font-semibold">Name</TableHead>
                    <TableHead className="w-[140px] font-semibold">Roll Number</TableHead>
                    <TableHead className="w-[120px] font-semibold">Branch</TableHead>
                    <TableHead className="w-[100px] font-semibold">Year</TableHead>
                    <TableHead className="w-[150px] font-semibold">Position</TableHead>
                    <TableHead className="w-[120px] font-semibold">Links</TableHead>
                    <TableHead className="w-[200px] font-semibold">Projects</TableHead>
                    <TableHead className="w-[250px] font-semibold">Notes</TableHead>
                    <TableHead className="w-[140px] font-semibold">Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allApplications.map((application) => (
                    <TableRow key={application.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/50">
                      <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                        {application.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {application.rollNumber}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-700 dark:text-slate-300">
                        {application.branch}
                      </TableCell>
                      <TableCell>
                        <Badge className={getYearBadgeColor(application.yearOfStudy)}>
                          Year {application.yearOfStudy}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPositionBadgeColor(application.preferredPosition)}>
                          {application.preferredPosition}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {application.githubProfile && application.githubProfile.trim() !== '' && (
                            <Link
                              href={application.githubProfile}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button size="sm" variant="outline" className="hover:bg-slate-100 dark:hover:bg-slate-800">
                                <Github className="h-4 w-4" />
                              </Button>
                            </Link>
                          )}
                          {application.linkedinProfile && application.linkedinProfile.trim() !== '' && (
                            <Link
                              href={application.linkedinProfile}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button size="sm" variant="outline" className="hover:bg-blue-100 dark:hover:bg-blue-900">
                                <Linkedin className="h-4 w-4" />
                              </Button>
                            </Link>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <ProjectLinks projectsString={application.projects} />
                      </TableCell>
                      <TableCell>
                        <NotesDisplay notes={application.notes} />
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          {formatDate(application.createdAt)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {allApplications.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-500 dark:text-slate-400 text-lg">No applications found.</p>
                <p className="text-slate-400 dark:text-slate-500 text-sm">Applications will appear here once submitted.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 