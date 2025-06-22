import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ArrowRight, Star } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 w-full overflow-hidden">
      <div className="container mx-auto  px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Card className="border-0 bg-gradient-to-br from-gray-50 to-white rounded-lg dark:from-gray-900 dark:to-gray-800 shadow-xl relative overflow-hidden">
          {/* Subtle Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-transparent to-transparent" />
          </div>

          <CardContent className="p-6 rounded-lg sm:p-8 md:p-12 text-center relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-600 dark:text-gray-300 font-medium">
                Join 2,500+ Successful Traders
              </span>
              <Star className="w-5 h-5 text-yellow-400" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Start Your Trading Journey Today
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 text-base sm:text-lg">
              Join thousands of successful traders who have transformed their
              careers with our academy. Get access to expert-led courses,
              real-time market insights, and a supportive community.
            </p>

            <div className="flex  sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-2 py-5  px-6 sm:px-8  sm:py-6 text-base sm:text-lg group"
              >
                View Courses
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg group">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>14-Day Free Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTASection;
