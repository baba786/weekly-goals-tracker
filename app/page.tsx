import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Target, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Target className="w-6 h-6 text-primary" />
            <span className="font-semibold text-xl">Mindful Goals</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/auth/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Less Goals.<br />More Impact.
              </h1>
              <p className="text-xl text-muted-foreground">
                Most goal trackers overwhelm you with endless lists. We help you focus on just 5 meaningful goals each week. Because sometimes, less is more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/login">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Your Week
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Try Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/60 rounded-lg blur opacity-30"></div>
              <div className="relative bg-card rounded-lg p-6 shadow-xl">
                <h3 className="text-lg font-semibold mb-4">This Week's Focus</h3>
                {[
                  { title: 'Launch new product feature', progress: 75, tag: 'Work' },
                  { title: 'Exercise 3 times this week', progress: 66, tag: 'Health' },
                  { title: 'Write blog post about mindfulness', progress: 90, tag: 'Personal' },
                ].map((goal, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className={cn(
                        "w-5 h-5 mt-0.5",
                        goal.progress === 100 ? "text-primary" : "text-muted-foreground/40"
                      )} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{goal.title}</span>
                          <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                        </div>
                        <div className="mt-1 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-muted/50">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <Target className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Focus on What Matters</h3>
                <p className="text-muted-foreground">
                  By limiting to 5 goals per week, you're forced to prioritize what truly matters. No more endless to-do lists.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <Trophy className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Celebrate Every Win</h3>
                <p className="text-muted-foreground">
                  Each completed goal is celebrated with delightful animations. Because small wins lead to big achievements.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle2 className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                <p className="text-muted-foreground">
                  Visualize your journey with beautiful progress indicators. Stay motivated by seeing how far you've come.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Mindful Goals</h4>
              <p className="text-sm text-muted-foreground">Focus on what truly matters.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="#features" className="block text-sm text-muted-foreground hover:text-primary">
                  Features
                </Link>
                <Link href="/demo" className="block text-sm text-muted-foreground hover:text-primary">
                  Demo
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-sm text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Stay updated with our latest features and tips.
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 rounded-md border bg-background"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 Mindful Goals. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}