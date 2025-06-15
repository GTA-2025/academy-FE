import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import {
  BarChart3,
  BookOpen,
  Users,
  Target,
  TrendingUp,
  Clock,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    label: "Active Students",
    value: "2,500+",
  },
  {
    icon: Target,
    label: "Success Rate",
    value: "85%",
  },
  {
    icon: TrendingUp,
    label: "Average ROI",
    value: "23%",
  },
  {
    icon: Clock,
    label: "Course Hours",
    value: "200+",
  },
];

const DashboardSection = () => {
  return (
    <section className="py-20 bg-gray-50  dark:bg-gray-900">
      <div className="container  mx-auto px-4">
        <div className="text-center   mb-16">
          <h2 className="text-4xl font-bold mb-4">Academy Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience our comprehensive trading education platform with
            real-time analytics and personalized learning paths.
          </p>
        </div>

        {/* Main Dashboard Preview */}
        <div className="relative h-[600px] rounded-[2rem] mb-16 rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Trading Dashboard"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10  dark:from-black/50 to-black" />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-white dark:bg-black">
            <h3 className="text-2xl font-bold mb-2">
              Interactive Trading Platform
            </h3>
            <p className="font-light">
              Real-time market data, advanced charting tools, and personalized
              trading insights.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg rounded-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                    <stat.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative h-[400px] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Learning Analytics"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t  from-black/50 to-black" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white dark:bg-black">
              <h3 className="text-xl font-bold mb-2">Learning Analytics</h3>
              <p className="font-light">
                Track your progress, identify strengths, and focus on areas that
                need improvement.
              </p>
            </div>
          </div>

          <div className="relative h-[400px] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Trading Tools"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black" />
            <div className="absolute bottom-0 bg-white dark:bg-black left-0 right-0 p-6 ">
              <h3 className="text-xl font-bold mb-2">Advanced Trading Tools</h3>
              <p className=" font-light ">
                Access professional-grade trading tools and real-time market
                analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
