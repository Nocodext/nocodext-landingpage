import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is my data sent over the internet?",
    answer: "No, never. All processing happens locally on your machine. Your music files and metadata never leave your computer. There's no server, no cloud, no upload. Everything stays with you."
  },
  {
    question: "Do I need an account?",
    answer: "No. unstream.fm is designed to be completely anonymous. No registration, no login, no email required. Just download and use."
  },
  {
    question: "Is this legal?",
    answer: "unstream.fm is designed for personal, private use of content you have legitimate access to. As with any tool, users are responsible for ensuring their use complies with applicable laws and terms of service. We do not encourage or support redistribution of copyrighted content."
  },
  {
    question: "Why a USB key?",
    answer: "The USB key serves as your personal, portable music vault. It's a physical symbol of ownership — your music exists as tangible files you control, not as ephemeral streams dependent on a subscription or internet connection."
  },
  {
    question: "Can I use the desktop app without the extension?",
    answer: "Yes. The desktop app works completely independently. The Chrome extension is an additional convenience for browser-based workflows, but the desktop app is fully self-contained and offline-capable."
  }
];

const UnstreamFAQ = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-950 to-black relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
          Frequently asked questions
        </h2>
        <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">
          Everything you need to know.
        </p>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-800 rounded-xl px-6 bg-gray-950/50 data-[state=open]:border-[#00FF77]/30"
              >
                <AccordionTrigger className="text-white hover:text-[#00FF77] text-left py-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default UnstreamFAQ;
