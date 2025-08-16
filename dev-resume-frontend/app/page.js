"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, FileText, Palette, ArrowRight, Star, GitFork, Users } from "lucide-react";

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="font-sans text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Transform Your <span className="text-green-700">GitHub Profile</span>
            <br />
            into a Stunning Resume
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg text-muted-foreground sm:text-xl">
            Convert your GitHub activity into professional resumes and portfolios in seconds. 
            Perfect for developers who want to showcase their work effectively.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-green-700 text-white hover:bg-green-700/90 px-8 py-4 text-lg font-semibold"
              onClick={() => router.push('/profile')}
            >
              Create My Resume
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold bg-transparent"
            >
              View Examples
            </Button>
          </div>
        </div>
      </section>

      {/* Split Preview Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl font-bold text-foreground sm:text-4xl">Two Formats, One Tool</h2>
            <p className="mt-4 font-serif text-lg text-muted-foreground">
              Choose between ATS-friendly resumes or creative portfolios
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* ATS Resume Preview */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-5 w-5 text-green-700" />
                    <h3 className="font-sans text-xl font-semibold">ATS-Friendly Resume</h3>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-card-foreground">Alex Developer</h4>
                      <p className="text-muted-foreground">alex@example.com | github.com/alexdev</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground border-b border-border pb-1">
                        Professional Summary
                      </h4>
                      <p className="text-muted-foreground mt-2">Full-Stack Developer with 5+ years experience...</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground border-b border-border pb-1">Skills</h4>
                      <p className="text-muted-foreground mt-2">JavaScript, React, Node.js, Python...</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground border-b border-border pb-1">Projects</h4>
                      <div className="mt-2 space-y-2">
                        <div>
                          <p className="font-medium text-card-foreground">E-Commerce Platform</p>
                          <p className="text-muted-foreground text-xs">React, Node.js, PostgreSQL</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Preview */}
            <Card className="overflow-hidden relative">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-green-700/20 via-secondary/15 to-accent/10 p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-full translate-y-12 -translate-x-12"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-green-700/10 rounded-lg">
                        <Palette className="h-5 w-5 text-green-700" />
                      </div>
                      <h3 className="font-sans text-xl font-semibold">Creative Portfolio</h3>
                      <div className="ml-auto">
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-green-700/30 to-green-700/20 flex items-center justify-center shadow-lg">
                          <Github className="h-7 w-7 text-green-700" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-card-foreground text-lg">Alex Developer</h4>
                          <p className="text-muted-foreground">Full-Stack Developer & Open Source Contributor</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-background/60 backdrop-blur-sm rounded-lg p-3 text-center border border-green-700/10">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-semibold">234</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Stars</span>
                        </div>
                        <div className="bg-background/60 backdrop-blur-sm rounded-lg p-3 text-center border border-secondary/10">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <GitFork className="h-4 w-4 text-blue-500" />
                            <span className="text-sm font-semibold">45</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Forks</span>
                        </div>
                        <div className="bg-background/60 backdrop-blur-sm rounded-lg p-3 text-center border border-accent/10">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Users className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-semibold">342</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Followers</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">JavaScript</span>
                          <span className="text-green-700 font-medium">85%</span>
                        </div>
                        <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                          <div className="h-full w-[85%] bg-gradient-to-r from-green-700 to-green-700/80 rounded-full"></div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">TypeScript</span>
                          <span className="text-secondary font-medium">72%</span>
                        </div>
                        <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                          <div className="h-full w-[72%] bg-gradient-to-r from-secondary to-secondary/80 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl font-bold text-foreground sm:text-4xl">How It Works</h2>
            <p className="mt-4 font-serif text-lg text-muted-foreground">
              Get your professional resume in three simple steps
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Github className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-sans text-xl font-semibold mb-2">1. Connect Your GitHub</h3>
                <p className="font-serif text-muted-foreground">
                  Simply enter your GitHub username and we'll fetch your profile, repositories, and contribution data.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-sans text-xl font-semibold mb-2">2. Generate Your Resume</h3>
                <p className="font-serif text-muted-foreground">
                  Our AI analyzes your GitHub activity and creates a professional resume highlighting your best work.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Palette className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-sans text-xl font-semibold mb-2">3. Showcase Your Work</h3>
                <p className="font-serif text-muted-foreground">
                  Download your ATS-friendly resume or share your interactive portfolio with potential employers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-sans text-3xl font-bold text-foreground sm:text-4xl">
            Ready to Transform Your GitHub Profile?
          </h2>
          <p className="mt-4 font-serif text-lg text-muted-foreground">
            Join thousands of developers who have already created their professional resumes
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              className="bg-green-700 text-white hover:bg-green-700/90 px-8 py-4 text-lg font-semibold"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="font-serif text-muted-foreground">Built with ❤️ for developers by developers</p>
        </div>
      </footer>
    </div>
  );
}
