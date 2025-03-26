
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Layers, Users, BookOpen, CheckCircle2, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: 'Extensive Course Library',
      description: 'Access a vast collection of courses across various subjects and skill levels.'
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: 'Learn from Experts',
      description: 'Courses taught by industry professionals and academic experts in their fields.'
    },
    {
      icon: <Layers className="h-10 w-10 text-primary" />,
      title: 'Structured Learning Path',
      description: 'Follow curated learning paths to master skills in a logical progression.'
    },
    {
      icon: <CheckCircle2 className="h-10 w-10 text-primary" />,
      title: 'Achievement Certification',
      description: 'Earn certificates to showcase your new skills and achievements.'
    },
  ];

  React.useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="font-semibold text-xl">Educate</Link>
          
          {/* Mobile menu button */}
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          )}
          
          {/* Desktop navigation */}
          <div className={`${isMobile ? 'hidden' : 'flex'} items-center gap-4`}>
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/login">Get Started</Link>
            </Button>
          </div>
        </div>
        
        {/* Mobile navigation */}
        {isMobile && mobileMenuOpen && (
          <div className="container py-4 flex flex-col space-y-4 bg-background border-t border-border animate-fade-in">
            <Button variant="ghost" size="sm" asChild className="justify-center">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild className="justify-center">
              <Link to="/login">Get Started</Link>
            </Button>
            <div className="flex justify-center pt-2">
              <ThemeToggle />
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 animate-fade-in">
        <div className="max-w-4xl text-center space-y-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">Transform Your Learning Experience</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Access high-quality courses taught by experts and achieve your educational goals at your own pace.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link to="/login">
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <a href="#features">Explore Features</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-10 md:py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Why Choose Our Platform</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="bg-card shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 hover:scale-[1.02]"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="glass-card rounded-xl p-6 md:p-12 flex flex-col items-center text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-6 md:mb-8">
              Join thousands of students already learning on our platform.
            </p>
            <Button size="lg" asChild>
              <Link to="/login">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-border">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2023 Educate. All rights reserved.
          </p>
          <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </a>
            <ThemeToggle />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
