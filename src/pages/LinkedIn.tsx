import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ExternalLink, Youtube } from "lucide-react";

const LinkedIn = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <img 
                src="https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/1949086/482799_213058.png"
                alt="LinkedIn Logo"
                className="w-full max-w-md mx-auto md:mx-0"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                The extension augments LinkedIn feed by providing widgets that should exist natively but don't
              </h1>
              <p className="text-xl text-muted-foreground mb-8">(not yet...or will never)</p>
              <Button size="lg" className="bg-[#CB3837] hover:bg-[#CB3837]/90 text-white">
                Discover more
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Usual Widgets Section */}
      <section className="py-20 px-4 bg-secondary/10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#CB3837]">Usual widgets</h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <img 
                src="https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/1949086/950229_389007.png"
                alt="Get people badge from post content"
                className="w-full rounded-lg mb-6"
              />
              <h3 className="text-2xl font-semibold mb-4 text-[#CB3837]">Get people badge from inside main content of a post</h3>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <img 
                src="https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/1949086/144864_911639.png"
                alt="Get people badge from comments"
                className="w-full rounded-lg mb-6"
              />
              <h3 className="text-2xl font-semibold mb-4 text-[#CB3837]">Get people badge throughout a comment tied to a post</h3>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <img 
                src="https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/1949086/43181_462657.png"
                alt="Get badge of people who reacted"
                className="w-full rounded-lg mb-6"
              />
              <h3 className="text-2xl font-semibold mb-4 text-[#CB3837]">Get badge of people who reacted</h3>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <img 
                src="https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/1949086/876185_906316.png"
                alt="Upload profile to CRM"
                className="w-full rounded-lg mb-6"
              />
              <h3 className="text-2xl font-semibold mb-4 text-[#CB3837]">Upload a profile to your CRM instantly</h3>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#CB3837]">Upcoming features</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-4 text-[#CB3837]">Push to CRM (in-progress)</h3>
              <p className="text-muted-foreground">
                Grab relevant data from badge and context and push that matter up to your company's CRM
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-4 text-[#CB3837]">Bookmark people</h3>
              <p className="text-muted-foreground">
                Pin people who interacted in this post, get more on their interest
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 bg-secondary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#CB3837]">Demo</h2>
          <a 
            href="https://www.youtube.com/watch?v=HI3Qhh6Mq9g"
            target="_blank"
            rel="noopener noreferrer"
            className="block relative group"
          >
            <img 
              src="https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/1949086/691979_446787.png"
              alt="Demo video"
              className="w-full rounded-lg shadow-xl group-hover:shadow-2xl transition-shadow"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 rounded-full p-6 group-hover:scale-110 transition-transform">
                <Youtube className="w-12 h-12 text-[#CB3837]" />
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Interest Form Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#CB3837]">Say your interest!</h2>
          
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <Input id="firstName" required />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <Input id="lastName" required />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input id="email" type="email" required />
              </div>
              
              <div>
                <label htmlFor="comment" className="block text-sm font-medium mb-2">
                  Comment
                </label>
                <Textarea id="comment" rows={4} />
              </div>
              
              <Button type="submit" className="w-full bg-[#CB3837] hover:bg-[#CB3837]/90 text-white">
                Submit
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="py-20 px-4 bg-secondary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-12">See you there</h2>
          
          <div className="flex justify-center gap-8">
            <a
              href="https://www.youtube.com/@nocodext1060"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img 
                src="https://uploads.strikinglycdn.com/page/images/icons/youtube-icon.png"
                alt="YouTube"
                className="w-16 h-16"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/nocodext"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img 
                src="https://uploads.strikinglycdn.com/page/images/icons/linkedin-icon.png"
                alt="LinkedIn"
                className="w-16 h-16"
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LinkedIn;
