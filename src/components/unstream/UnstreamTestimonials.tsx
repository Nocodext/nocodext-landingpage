import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Finally, I own my music again. No subscriptions, no algorithms deciding what I should hear. Just my collection, my way.",
    author: "Marcus T.",
    role: "Music Producer"
  },
  {
    quote: "The offline-first approach is exactly what I needed. No more worrying about internet connections or service shutdowns.",
    author: "Sarah K.",
    role: "Digital Nomad"
  },
  {
    quote: "Zero cloud, zero tracking. This is how software should be built. My data stays on my hardware, period.",
    author: "James L.",
    role: "Privacy Advocate"
  }
];

const UnstreamTestimonials = () => {
  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
          What users say
        </h2>
        <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">
          People who reclaimed their music.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl border border-gray-800 bg-gradient-to-b from-gray-900/50 to-gray-950/50 hover:border-[#00FF77]/20 transition-colors"
            >
              <Quote className="text-[#00FF77]/30 mb-4" size={32} />
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-gray-800 pt-4">
                <p className="text-white font-semibold">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnstreamTestimonials;
