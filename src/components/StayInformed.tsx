
import Newsletter from "@/components/Newsletter";

const StayInformed = () => {
  return (
    <section className="py-24 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-nocodext mb-6 font-inter">Stay Informed</h2>
          <p className="text-lg text-gray-600 mb-10 font-inter">
            Receive our news, tips, and new features directly in your inbox.
          </p>
          <Newsletter />
        </div>
      </div>
    </section>
  );
};

export default StayInformed;
