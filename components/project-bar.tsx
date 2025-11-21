"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FolderKanban, ChevronDown, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/lib/providers/user-provider";
import { listUserProjects } from "@/lib/api/projects";
import { createClient } from "@/lib/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ProjectBar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();
  
  // Get current project from URL params or default to "all"
  const currentProjectId = searchParams.get("project") || "all";
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch user's projects
  const { data: projects = [], isLoading: isProjectsLoading } = useQuery({
    queryKey: ["projects", user?.id],
    queryFn: listUserProjects,
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Fetch gig counts for all projects
  const { data: gigCounts = {} } = useQuery({
    queryKey: ["project-gig-counts", user?.id],
    queryFn: async () => {
      const supabase = createClient();
      const counts: Record<string, number> = {};
      
      // Fetch count for "All Projects"
      const { count: totalCount, error: totalError } = await supabase
        .from("gigs")
        .select("*", { count: "exact", head: true });
      
      if (!totalError && totalCount !== null) {
        counts["all"] = totalCount;
      }
      
      // Fetch gig counts for each user project
      for (const project of projects) {
        const { count, error } = await supabase
          .from("gigs")
          .select("*", { count: "exact", head: true })
          .eq("project_id", project.id);
        
        if (!error && count !== null) {
          counts[project.id] = count;
        }
      }
      
      return counts;
    },
    enabled: !!user && projects.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleProjectChange = (projectId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (projectId === "all") {
      params.delete("project");
    } else {
      params.set("project", projectId);
    }
    // Keep current path and just update query params
    router.push(`${pathname}?${params.toString()}`);
  };

  // Don't show project bar on certain pages
  const shouldShowProjectBar = [
    "/dashboard",
    "/gigs",
    "/money",
    "/calendar",
  ].some((path) => pathname === path || pathname.startsWith(`${path}/`));

  if (!shouldShowProjectBar) {
    return null;
  }

  // Show top 5 projects as pills, rest in dropdown
  const displayedProjects = projects.slice(0, 5);
  const remainingProjects = projects.slice(5);

  return (
    <div className="sticky top-16 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-6 gap-4">
        {/* Left - Projects Label & Pills */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-fit">
            <FolderKanban className="h-4 w-4" />
            <span className="hidden sm:inline">Projects:</span>
          </div>

          {/* Project Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-1">
            {isProjectsLoading ? (
              <>
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </>
            ) : (
              <>
                {/* All Projects pill */}
                <Button
                  variant={currentProjectId === "all" ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "gap-2 rounded-full whitespace-nowrap",
                    currentProjectId === "all" && "font-semibold"
                  )}
                  onClick={() => handleProjectChange("all")}
                >
                  All
                  {gigCounts["all"] !== undefined && (
                    <Badge 
                      variant={currentProjectId === "all" ? "secondary" : "outline"}
                      className="rounded-full px-1.5 py-0 h-5 min-w-5"
                    >
                      {gigCounts["all"]}
                    </Badge>
                  )}
                </Button>

                {/* Individual project pills */}
                {displayedProjects.map((project) => (
                  <Button
                    key={project.id}
                    variant={currentProjectId === project.id ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "gap-2 rounded-full whitespace-nowrap",
                      currentProjectId === project.id && "font-semibold"
                    )}
                    onClick={() => handleProjectChange(project.id)}
                  >
                    {project.name}
                    {gigCounts[project.id] !== undefined && (
                      <Badge 
                        variant={currentProjectId === project.id ? "secondary" : "outline"}
                        className="rounded-full px-1.5 py-0 h-5 min-w-5"
                      >
                        {gigCounts[project.id]}
                      </Badge>
                    )}
                  </Button>
                ))}

                {/* View All dropdown for remaining projects */}
                {remainingProjects.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2 rounded-full">
                        <span>More</span>
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64">
                      <DropdownMenuLabel>More Projects</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <ScrollArea className="h-64">
                        {remainingProjects.map((project) => (
                          <DropdownMenuItem
                            key={project.id}
                            onClick={() => handleProjectChange(project.id)}
                            className="flex items-center justify-between cursor-pointer"
                          >
                            <span>{project.name}</span>
                            {gigCounts[project.id] !== undefined && (
                              <Badge variant="outline" className="ml-2">
                                {gigCounts[project.id]}
                              </Badge>
                            )}
                          </DropdownMenuItem>
                        ))}
                      </ScrollArea>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/projects" className="cursor-pointer font-medium">
                          View all projects
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                {/* View all link if no overflow */}
                {remainingProjects.length === 0 && projects.length > 0 && (
                  <Link href="/projects">
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                      <span className="text-xs">View all</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>

        {/* Right - Search & Filters (optional, can be shown on specific pages) */}
        {(pathname === "/gigs" || pathname === "/money") && (
          <div className="flex items-center gap-2 min-w-fit">
            {/* Search input - show only on larger screens */}
            <div className="relative hidden lg:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 w-64 h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter button - placeholder for future filters */}
            <Button variant="outline" size="sm" className="gap-2 hidden md:flex">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

