import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Clock, MousePointer, Users, Zap } from "lucide-react";

const WatoolsProblemSolution = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The WhatsApp Group Management Nightmare
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every WhatsApp admin knows this pain. Let us show you a better way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-red-600 mb-6 flex items-center">
              <AlertCircle className="mr-3" size={28} />
              The Current Struggle
            </h3>

            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Clock className="text-red-500 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-red-800">Hours of Manual Work</h4>
                    <p className="text-red-700">Adding 50+ members one by one takes forever</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <MousePointer className="text-red-500 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-red-800">Repetitive Clicking</h4>
                    <p className="text-red-700">Tap, search, add, repeat... hundreds of times</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <AlertCircle className="text-red-500 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-red-800">Error-Prone Process</h4>
                    <p className="text-red-700">Easy to miss members or add wrong people</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center">
              <CheckCircle className="mr-3" size={28} />
              Our Smart Solution
            </h3>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Zap className="text-green-500 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-green-800">Instant Bulk Transfer</h4>
                    <p className="text-green-700">Transfer up to 256 members in under 30 seconds</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Users className="text-green-500 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-green-800">Smart Selection Tools</h4>
                    <p className="text-green-700">Filter, search, and select exactly who you want</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="text-green-500 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-green-800">100% Accurate</h4>
                    <p className="text-green-700">No more mistakes, missed members, or duplicate adds</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Transform Your Group Management?
            </h3>
            <p className="text-xl mb-6 text-green-100">
              Join hundreds of admins who've already saved thousands of hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WatoolsProblemSolution;