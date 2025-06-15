import { BookOpen, Clock, Users, Award } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const features = [
  {
    icon: BookOpen,
    title: "Comprehensive Curriculum",
    description:
      "Learn from basic to advanced trading strategies with our structured learning path.",
  },
  {
    icon: Clock,
    title: "Real-time Market Analysis",
    description:
      "Access live market data and expert analysis to make informed trading decisions.",
  },
  {
    icon: Users,
    title: "Expert Community",
    description:
      "Join a community of traders and learn from experienced professionals.",
  },
  {
    icon: Award,
    title: "Certified Training",
    description:
      "Get certified in forex trading with our industry-recognized courses.",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className=" lg:px-[5rem] px-5 py-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Our Academy?</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We provide comprehensive training and support to help you become a
            successful forex trader.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg rounded-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
