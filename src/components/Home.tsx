'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  Play,
  Check,
  Star,
  Globe
} from 'lucide-react';

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Testimonial rotation
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Real-time analytics and instant insights powered by AI"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Bank-level security with end-to-end encryption"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Smart Analytics",
      description: "Advanced metrics that help you grow your business"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description: "Work together seamlessly with your team"
    }
  ];

  const stats = [
    { number: "0", label: "Active Users", suffix: "+" },
    { number: "0", label: "Revenue Generated", suffix: "", prefix: "$" },
    { number: "0", label: "Countries", suffix: "+" },
    { number: "99.9", label: "Uptime", suffix: "%" }
  ];

  const testimonials = [
    {
      name: "Ready for Growth",
      role: "Your Success Story",
      content: "Join thousands of entrepreneurs who trust LuminaFlow.ai to power their digital success.",
      avatar: "/api/placeholder/48/48"
    },
    {
      name: "Built for Scale",
      role: "Enterprise Ready",
      content: "From startup to enterprise, LuminaFlow.ai grows with your business needs.",
      avatar: "/api/placeholder/48/48"
    },
    {
      name: "AI-Powered",
      role: "Next Generation",
      content: "Experience the future of business intelligence with our AI-driven platform.",
      avatar: "/api/placeholder/48/48"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-4 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className={`text-center transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-6 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">Welcome to the Future</span>
            <ChevronRight className="w-4 h-4" />
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight mb-6">
            Lumina<span className="text-blue-400">Flow</span>
            <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">.ai</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Transform your business with AI-powered analytics, real-time insights, and intelligent automation that scales with your success.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/register"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-1000 delay-${index * 200} transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.prefix}{stat.number}{stat.suffix}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Why Choose <span className="text-blue-400">LuminaFlow.ai</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Built for the modern entrepreneur who demands excellence, speed, and results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-blue-400 mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Start?</h2>
        </div>

        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 relative overflow-hidden">
          <div className="flex items-center space-x-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          
          <div className="transition-all duration-500">
            <p className="text-lg text-gray-100 mb-6 leading-relaxed">
              "{testimonials[currentTestimonial].content}"
            </p>
            
            <div className="flex items-center space-x-4">
              <img
                src={testimonials[currentTestimonial].avatar}
                alt={testimonials[currentTestimonial].name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h4 className="font-semibold text-white">{testimonials[currentTestimonial].name}</h4>
                <p className="text-gray-400">{testimonials[currentTestimonial].role}</p>
              </div>
            </div>
          </div>

          {/* Testimonial indicators */}
          <div className="flex space-x-2 mt-8 justify-center">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-blue-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Start Your Journey Today
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the entrepreneurs who are already scaling their success with LuminaFlow.ai. No credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/register"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-2"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/login"
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors flex items-center space-x-2"
            >
              <span>Already have an account? Sign in</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 LuminaFlow.ai. Built for entrepreneurs who demand excellence.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;