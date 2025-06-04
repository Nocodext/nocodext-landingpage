
const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-nocodext to-nocodext-light text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-white mb-6 font-inter">Ready to improve your productivity?</h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto font-inter">
          Join thousands of users who have already transformed their way of working with Nocodext.
        </p>
        <button 
          onClick={() => window.open("https://chromewebstore.google.com/detail/nocodext-for-bubble/dpjnneeknnpjcnphfahhcofciocedggp", "_blank")}
          className="flex items-center h-14 mx-auto rounded-full bg-gradient-to-r from-pink-50 to-blue-50 text-gray-600 font-medium shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
        >
          <div className="flex h-full items-center justify-center bg-neutral-100 aspect-square rounded-full">
            <svg viewBox="0 0 24 24" width="28" height="28">
              <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.003h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.366zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z" 
                fill="#4285F4" />
              <path d="M12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z" 
                fill="#34A853" />
              <path d="M22 12c0-1.54-.29-3.011-.818-4.366H10.182A5.451 5.451 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545"
                fill="#FBBC05" />
              <path d="M2.632 4.501A11.947 11.947 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29z"
                fill="#EA4335" />
            </svg>
          </div>
          <span className="text-gray-700 font-inter text-lg px-6">Install from Chrome Webstore</span>
        </button>
      </div>
    </section>
  );
};

export default CTASection;
