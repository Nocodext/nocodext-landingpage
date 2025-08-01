import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PinNpm = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-8">
              Pin'npm
            </h1>
            <p className="text-lg text-muted-foreground">
              Cette page est en cours de développement.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PinNpm;