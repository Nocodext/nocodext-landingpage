import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Filter, Download, Smartphone, Globe, Headphones } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "Bulk Selection Interface",
    description: "Select multiple members with checkboxes, search, and filters. No more tapping one by one.",
    status: "Available",
    color: "bg-green-100 text-green-800"
  },
  {
    icon: Filter,
    title: "Smart Filtering",
    description: "Filter by last seen, join date, activity level, or create custom member lists.",
    status: "Available",
    color: "bg-green-100 text-green-800"
  },
  {
    icon: Download,
    title: "Export Member Lists",
    description: "Export your group members to CSV or Excel for backup and analysis.",
    status: "Available",
    color: "bg-green-100 text-green-800"
  },
  {
    icon: Smartphone,
    title: "Cross-Platform",
    description: "Works on Android, iOS, and WhatsApp Web. Use it wherever you manage your groups.",
    status: "Coming Soon",
    color: "bg-yellow-100 text-yellow-800"
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Available in 15+ languages including English, Spanish, Portuguese, and Hindi.",
    status: "Coming Soon",
    color: "bg-yellow-100 text-yellow-800"
  },
  {
    icon: Headphones,
    title: "Priority Support",
    description: "Get help when you need it with our dedicated support team and video tutorials.",
    status: "Coming Soon",
    color: "bg-yellow-100 text-yellow-800"
  }
];

const WatoolsFeatures = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Group Admins
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to manage WhatsApp groups like a pro
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                    <feature.icon size={24} />
                  </div>
                  <Badge className={feature.color}>
                    {feature.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
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

export default WatoolsFeatures;