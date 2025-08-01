import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Zap, Shield, Users, Target, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Save 10+ Hours Weekly",
    description: "Eliminate the tedious process of adding members one by one. What used to take hours now happens in seconds.",
    color: "text-blue-600"
  },
  {
    icon: Zap,
    title: "Lightning Fast Transfers",
    description: "Bulk transfer up to 256 members (WhatsApp's limit) from one group to another with a single click.",
    color: "text-yellow-600"
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Your data never leaves your device. We use WhatsApp's official APIs to ensure complete security and privacy.",
    color: "text-green-600"
  },
  {
    icon: Users,
    title: "Smart Member Management",
    description: "Filter by activity, join date, or custom criteria. Only transfer the members you actually want.",
    color: "text-purple-600"
  },
  {
    icon: Target,
    title: "Perfect for Admins",
    description: "Whether you're managing communities, businesses, or events - streamline your group management.",
    color: "text-red-600"
  },
  {
    icon: TrendingUp,
    title: "Scale Your Communities",
    description: "Easily reorganize large communities, create specialized sub-groups, or merge related groups.",
    color: "text-indigo-600"
  }
];

const WatoolsValueProposition = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why WhatsApp Power Users Love Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform how you manage WhatsApp groups with features that actually matter
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 ${benefit.color}`}>
                  <benefit.icon size={24} />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              From Hours to Seconds
            </h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-red-500 mb-2">3+ Hours</div>
                <p className="text-gray-600">Manual adding (50 members)</p>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-4xl">→</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-500 mb-2">30 Seconds</div>
                <p className="text-gray-600">With our bulk transfer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WatoolsValueProposition;