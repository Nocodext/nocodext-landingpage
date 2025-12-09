import UnstreamHero from "@/components/unstream/UnstreamHero";
import UnstreamValueProps from "@/components/unstream/UnstreamValueProps";
import UnstreamHowItWorks from "@/components/unstream/UnstreamHowItWorks";
import UnstreamPrivacy from "@/components/unstream/UnstreamPrivacy";
import UnstreamTestimonials from "@/components/unstream/UnstreamTestimonials";
import UnstreamDownload from "@/components/unstream/UnstreamDownload";
import UnstreamPerformance from "@/components/unstream/UnstreamPerformance";
import UnstreamFAQ from "@/components/unstream/UnstreamFAQ";
import UnstreamFooter from "@/components/unstream/UnstreamFooter";

const Unstream = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <UnstreamHero />
      <UnstreamValueProps />
      <UnstreamHowItWorks />
      <UnstreamPrivacy />
      <UnstreamTestimonials />
      <UnstreamDownload />
      <UnstreamPerformance />
      <UnstreamFAQ />
      <UnstreamFooter />
    </div>
  );
};

export default Unstream;
