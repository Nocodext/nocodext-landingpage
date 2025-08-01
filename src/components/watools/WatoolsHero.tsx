import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Zap } from "lucide-react";

const WatoolsHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 text-white mt-20">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative container mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <MessageCircle size={80} className="text-white animate-pulse" />
            <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2">
              <Users size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          Transfer WhatsApp Groups
          <span className="block text-yellow-300">In Seconds, Not Hours</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto animate-fade-in">
          Stop adding members one by one. Our tool lets you transfer entire groups or bulk-add members instantly.
        </p>

        <div className="flex justify-center animate-fade-in">
          <Button size="lg" className="bg-yellow-400 text-green-800 hover:bg-yellow-300 font-semibold px-8 py-4 text-lg">
            <Zap className="mr-2" size={20} />
            Get Early Access
          </Button>
        </div>

        <div className="mt-12 text-green-100">
          <p className="text-sm">🚀 Coming Soon • Join 500+ WhatsApp Power Users</p>
        </div>
      </div>
    </section>
  );
};

export default WatoolsHero;