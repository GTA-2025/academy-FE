"use client";

import Footer from "@/components/landing/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/init-button";
import { Calendar, Clock, Tag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: "Understanding Forex Market Fundamentals",
    description:
      "Learn the essential concepts that drive the forex market and how to use them in your trading strategy.",
    category: "Trading Basics",
    date: "Mar 15, 2024",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "Advanced Technical Analysis Techniques",
    description:
      "Discover powerful technical analysis methods used by professional traders to identify market opportunities.",
    category: "Technical Analysis",
    date: "Mar 12, 2024",
    readTime: "12 min read",
    image:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop",
    featured: true,
  },
  {
    id: 3,
    title: "Risk Management Strategies for Forex Traders",
    description:
      "Essential risk management techniques to protect your trading capital and maximize returns.",
    category: "Risk Management",
    date: "Mar 10, 2024",
    readTime: "10 min read",
    image:
      "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?q=80&w=2070&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 4,
    title: "Psychology of Successful Trading",
    description:
      "Understanding the mental aspects of trading and how to develop the right mindset for success.",
    category: "Trading Psychology",
    date: "Mar 8, 2024",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 5,
    title: "Market Sentiment Analysis",
    description:
      "Learn how to analyze market sentiment and use it to make better trading decisions.",
    category: "Market Analysis",
    date: "Mar 6, 2024",
    readTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 6,
    title: "Building a Trading System",
    description:
      "Step-by-step guide to creating and implementing your own trading system.",
    category: "Trading Systems",
    date: "Mar 4, 2024",
    readTime: "15 min read",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop",
    featured: false,
  },
];

const categories = [
  "All Posts",
  "Trading Basics",
  "Technical Analysis",
  "Risk Management",
  "Trading Psychology",
  "Market Analysis",
  "Trading Systems",
];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");

  const filteredPosts =
    selectedCategory === "All Posts"
      ? blogPosts
      : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const recentPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Trading Insights & Education
          </h1>
          <p className="text-xl text-center max-w-2xl mx-auto text-blue-100">
            Stay updated with the latest trading strategies, market analysis,
            and educational content
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`rounded-full transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-600 hover:text-white"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="grid  grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {featuredPosts.map(post => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-64">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold mb-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400">
                      <Tag className="w-4 h-4" />
                      {post.category}
                    </span>
                    <Button
                      variant="link"
                      className="text-blue-600 dark:text-blue-400"
                    >
                      Read More →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Recent Posts Grid */}
        {recentPosts.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-8">Recent Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map(post => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-bold mb-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription>{post.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400">
                        <Tag className="w-4 h-4" />
                        {post.category}
                      </span>
                      <Button
                        variant="link"
                        className="text-blue-600 dark:text-blue-400"
                      >
                        Read More →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* No Results Message */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No posts found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try selecting a different category or check back later for new
              content.
            </p>
          </div>
        )}

        {/* Newsletter Section */}
        <section className="mt-20 bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Get the latest trading insights and educational content delivered
              to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
