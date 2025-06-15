import { Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Professional Trader",
    image: "https://i.pravatar.cc/150?img=1",
    content:
      "The academy's structured approach helped me transition from a beginner to a professional trader. The mentors are incredibly supportive.",
  },
  {
    name: "Michael Chen",
    role: "Investment Analyst",
    image: "https://i.pravatar.cc/150?img=2",
    content:
      "The real-time market analysis and expert insights provided by the academy have been invaluable to my trading journey.",
  },
  {
    name: "Emma Rodriguez",
    role: "Day Trader",
    image: "https://i.pravatar.cc/150?img=3",
    content:
      "The community aspect and continuous support make this academy stand out. I've learned more here than in years of self-study.",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hear from our successful graduates who have transformed their
            trading careers.
          </p>
        </div>
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className=" rounded-lg border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {testimonial.content}
                </p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
