
import { Card, CardContent } from "@/components/ui/card";

const ManifestoSection = () => {
  return (
    <section id="manifesto" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-nocodext mb-4 font-inter">The Nocodext Manifesto</h2>
            <p className="text-xl text-gray-600 font-inter">We don't do freemium. We do value</p>
          </div>
          
          <div className="space-y-6">
            <Card className="border-l-4 border-l-nocodext bg-gradient-to-r from-blue-50 to-white">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🧠</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">We build for people who build with intention</h3>
                    <p className="text-gray-700 leading-relaxed">
                      If you open Bubble at 9am and close it at midnight, this is for you.<br/>
                      If you're tired of waiting for features that should've existed yesterday, you're in the right place.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-nocodext bg-gradient-to-r from-purple-50 to-white">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">💎</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">We believe in useful over "nice-to-have"</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Nocodext exists to solve real, annoying problems — not to ship dopamine-driven features to pad a changelog.<br/>
                      No fluff. No distractions. Just leverage.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-nocodext bg-gradient-to-r from-green-50 to-white">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">⏳</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">We respect your time — and ours</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We're not here to lure thousands of passive users into a free plan they'll never outgrow.<br/>
                      We'd rather serve 100 power users with 100× more clarity and support.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-nocodext bg-gradient-to-r from-yellow-50 to-white">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">⚡</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">We ship small, but we ship sharp</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Every widget we release is something we needed.<br/>
                      Or you asked for.<br/>
                      Or both.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      No feature factories.<br/>
                      No roadmap bloat.<br/>
                      No eternal beta.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-nocodext bg-gradient-to-r from-indigo-50 to-white">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🧭</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">We're here to stay — and grow smart</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Your subscription powers real, ongoing work.<br/>
                      Support, updates, improvements.<br/>
                      Not a waiting room.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-nocodext-dark bg-gradient-to-r from-gray-50 to-white">
              <CardContent className="p-8">
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-900 leading-relaxed">
                    Nocodext is not a toy. It's your unfair advantage in the Bubble editor.<br/>
                    If you get it, you get it.<br/>
                    If you don't, that's fine — we're not for everyone.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
