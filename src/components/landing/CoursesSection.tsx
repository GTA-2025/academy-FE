import { Clock, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const courses = [
  {
    title: "Forex Trading Fundamentals",
    level: "Beginner",
    duration: "4 weeks",
    price: "$199",
    features: [
      "Basic market concepts",
      "Technical analysis",
      "Risk management",
      "Demo trading",
    ],
  },
  {
    title: "Advanced Trading Strategies",
    level: "Intermediate",
    duration: "6 weeks",
    price: "$299",
    features: [
      "Advanced chart patterns",
      "Market psychology",
      "Portfolio management",
      "Live trading sessions",
    ],
  },
  {
    title: "Professional Trading Masterclass",
    level: "Advanced",
    duration: "8 weeks",
    price: "$499",
    features: [
      "Algorithmic trading",
      "Market making",
      "Risk optimization",
      "1-on-1 mentoring",
    ],
  },
];

const CoursesSection = () => {
  return (
    <section id="courses" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Trading Courses</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose from our range of courses designed to take you from beginner
            to professional trader.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Card
              key={index}
              className="border-0 rounded-lg dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <span className="text-sm font-medium text-blue-600">
                    {course.level}
                  </span>
                  <h3 className="text-2xl font-bold mt-2">{course.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {course.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{course.price}</span>
                  <Button className="bg-blue-600 rounded-full text-white hover:bg-blue-700">
                    Enroll Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
