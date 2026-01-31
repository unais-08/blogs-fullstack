/**
 * HomePage Component
 * Redesigned to match the high-contrast geometric theme with purple accents
 */
import { Link } from "react-router"; // Updated to standard react-router-dom
import { MainLayout } from "@/shared/layouts/MainLayout";
import { Button, Card } from "@/shared/components";
import { ROUTES } from "@/constants";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Github, Linkedin, Twitter, Youtube, BookOpen } from "lucide-react";

export const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <MainLayout>
      {/* Social Sidebar - Matches Screenshot */}
      <div className="fixed left-0 top-1/2 z-50 hidden -translate-y-1/2 flex-col bg-white p-2 shadow-2xl md:flex">
        {[Linkedin, Twitter, Youtube, Github, BookOpen].map((Icon, idx) => (
          <a
            key={idx}
            href="#"
            className="p-4 text-[#333] transition-colors hover:bg-[#7843e91a] hover:text-[#7843e9]"
          >
            <Icon size={24} />
          </a>
        ))}
      </div>

      <div className="relative">
        {/* Hero Section with Geometric Background */}
        <section className="relative flex min-h-[85vh] items-center justify-center bg-[#f8f8f8] px-4 py-20 text-center">
          {/* Subtle Background Pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png')`,
            }}
          />

          <div className="relative z-10 max-w-5xl">
            <h1 className="text-5xl font-black uppercase tracking-widest text-[#111] md:text-5xl">
              Welcome to <span className="text-[#7843e9]">Dev Blogs</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg font-medium leading-relaxed text-[#444] md:text-xl uppercase tracking-tight">
              A Result-Oriented platform for building and managing insightful
              articles that lead to the success of the developer community.
            </p>

            <div className="mt-12 flex flex-wrap gap-6 justify-center">
              <Link to={ROUTES.BLOGS}>
                <Button size="lg">Explore Blogs</Button>
              </Link>

              {!isAuthenticated ? (
                <Link to={ROUTES.REGISTER}>
                  <Button size="lg" variant="outline">
                    Get Started
                  </Button>
                </Link>
              ) : (
                <Link to={ROUTES.CREATE_BLOG}>
                 
                  <Button size="lg" variant="outline">
                    Write a Blog
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Features Section - Clean White Background */}
        <section className="bg-white py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-black text-center text-[#111] uppercase tracking-widest mb-20">
              Platform Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <FeatureCard
                title="Easy Writing"
                desc="Create and publish your blogs with our simple and intuitive editor."
                color="bg-purple-100 text-[#7843e9]"
              />
              <FeatureCard
                title="Growing Community"
                desc="Join thousands of writers and readers sharing their stories daily."
                color="bg-purple-100 text-[#7843e9]"
              />
              <FeatureCard
                title="Secure & Private"
                desc="Your data is protected with industry-standard security practices."
                color="bg-purple-100 text-[#7843e9]"
              />
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

// Modular Helper for Feature Cards
const FeatureCard = ({
  title,
  desc,
  color,
}: {
  title: string;
  desc: string;
  color: string;
}) => (
  <Card className="border-none shadow-none hover:shadow-md transition-shadow p-8 text-center group">
    <div
      className={`w-20 h-20 ${color} rounded-full flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110`}
    >
      <BookOpen size={32} />
    </div>
    <h3 className="text-xl font-bold uppercase tracking-wider mb-4 text-[#111]">
      {title}
    </h3>
    <p className="text-[#666] leading-relaxed">{desc}</p>
  </Card>
);
