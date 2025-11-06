import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Plus, Search, Users, Briefcase, GraduationCap, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { type Candidate } from "@shared/schema";
import { CandidateFormDialog } from "@/components/candidate-form-dialog";
import { DeleteCandidateDialog } from "@/components/delete-candidate-dialog";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [deletingCandidate, setDeletingCandidate] = useState<Candidate | null>(null);

  const { data: candidates, isLoading } = useQuery<Candidate[]>({
    queryKey: ["/api/candidates"],
  });

  const filteredCandidates = candidates?.filter((candidate) => {
    const query = searchQuery.toLowerCase();
    return (
      candidate.fullName.toLowerCase().includes(query) ||
      candidate.email.toLowerCase().includes(query) ||
      candidate.skills?.toLowerCase().includes(query) ||
      false
    );
  });

  const totalCandidates = candidates?.length || 0;
  const experiencedCandidates = candidates?.filter((c) => (c.experienceYears || 0) >= 5).length || 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary text-primary-foreground">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight">HR Candidate Manager</h1>
                <p className="text-xs text-muted-foreground">Talent Acquisition System</p>
              </div>
            </div>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              size="default"
              data-testid="button-add-candidate"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Candidate
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold" data-testid="text-total-candidates">
                  {isLoading ? <Skeleton className="h-9 w-16" /> : totalCandidates}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Active in database
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Experienced (5+ years)</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold" data-testid="text-experienced-candidates">
                  {isLoading ? <Skeleton className="h-9 w-16" /> : experiencedCandidates}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Senior professionals
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Search Results</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold" data-testid="text-filtered-candidates">
                  {isLoading ? <Skeleton className="h-9 w-16" /> : filteredCandidates?.length || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Matching your query
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-2xl font-semibold">Candidate Database</CardTitle>
                  <CardDescription className="mt-1">
                    Search, view, and manage all candidates in your talent pool
                  </CardDescription>
                </div>
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-search"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-lg border">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-3 w-64" />
                      </div>
                      <Skeleton className="h-9 w-20" />
                    </div>
                  ))}
                </div>
              ) : !filteredCandidates || filteredCandidates.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" data-testid="text-empty-state">
                    {searchQuery ? "No candidates found" : "No candidates yet"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                    {searchQuery
                      ? "Try adjusting your search query or clear filters to see all candidates."
                      : "Start building your talent pool by adding your first candidate to the system."}
                  </p>
                  {!searchQuery && (
                    <Button
                      onClick={() => setIsAddDialogOpen(true)}
                      data-testid="button-add-first-candidate"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Candidate
                    </Button>
                  )}
                </div>
              ) : (
                <div className="rounded-lg border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr className="border-b">
                          <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Experience</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Skills</th>
                          <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {filteredCandidates.map((candidate) => (
                          <tr
                            key={candidate.id}
                            className="hover-elevate"
                            data-testid={`row-candidate-${candidate.id}`}
                          >
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-medium" data-testid={`text-name-${candidate.id}`}>
                                  {candidate.fullName}
                                </div>
                                {candidate.education && (
                                  <div className="text-sm text-muted-foreground mt-0.5">
                                    {candidate.education}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="space-y-1">
                                <div className="text-sm" data-testid={`text-email-${candidate.id}`}>
                                  {candidate.email}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {candidate.phoneNumber}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {candidate.experienceYears !== null && candidate.experienceYears !== undefined ? (
                                <Badge variant="secondary" data-testid={`badge-experience-${candidate.id}`}>
                                  {candidate.experienceYears} {candidate.experienceYears === 1 ? 'year' : 'years'}
                                </Badge>
                              ) : (
                                <span className="text-sm text-muted-foreground">N/A</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {candidate.skills ? (
                                <div className="flex flex-wrap gap-1 max-w-xs">
                                  {candidate.skills.split(',').slice(0, 3).map((skill, idx) => (
                                    <Badge
                                      key={idx}
                                      variant="outline"
                                      className="text-xs"
                                      data-testid={`badge-skill-${candidate.id}-${idx}`}
                                    >
                                      {skill.trim()}
                                    </Badge>
                                  ))}
                                  {candidate.skills.split(',').length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{candidate.skills.split(',').length - 3}
                                    </Badge>
                                  )}
                                </div>
                              ) : (
                                <span className="text-sm text-muted-foreground">No skills listed</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => setEditingCandidate(candidate)}
                                  data-testid={`button-edit-${candidate.id}`}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => setDeletingCandidate(candidate)}
                                  data-testid={`button-delete-${candidate.id}`}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <CandidateFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        candidate={null}
      />

      <CandidateFormDialog
        open={!!editingCandidate}
        onOpenChange={(open: boolean) => !open && setEditingCandidate(null)}
        candidate={editingCandidate}
      />

      <DeleteCandidateDialog
        open={!!deletingCandidate}
        onOpenChange={(open: boolean) => !open && setDeletingCandidate(null)}
        candidate={deletingCandidate}
      />
    </div>
  );
}
