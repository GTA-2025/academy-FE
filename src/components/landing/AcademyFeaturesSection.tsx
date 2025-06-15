import { GraduationCap, BookOpen, Bot } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

const features = [
  {
    icon: GraduationCap,
    title: "Trading School",
    description:
      "Access our comprehensive trading curriculum with live classes, expert instructors, and interactive learning materials.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: [
      "Live trading sessions",
      "Expert-led workshops",
      "Interactive learning",
      "Progress tracking",
    ],
  },
  {
    icon: BookOpen,
    title: "Trading Library",
    description:
      "Explore our extensive collection of trading resources, market analysis, and educational materials.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2091&q=80",
    features: [
      "Market analysis reports",
      "Trading strategies",
      "Video tutorials",
      "Research papers",
    ],
  },
  {
    icon: Bot,
    title: "AI Trading Assistant",
    description:
      "Get real-time market insights and trading suggestions powered by advanced AI technology.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: [
      "Market predictions",
      "Risk analysis",
      "Trading signals",
      "24/7 support",
    ],
  },
];

const AcademyFeaturesSection = () => {
  return (
    <section className="py-20 lg:px-[5rem] px-5 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Academy Features</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our comprehensive trading education platform with advanced
            features designed for your success.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow rounded-lg"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <div className="relative h-48 mb-6 rounded-2xl overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <ul className="space-y-3">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademyFeaturesSection;
