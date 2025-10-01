
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "@/components/bubble/Header";
import Footer from "@/components/bubble/Footer";
import Bubble from "./pages/Bubble";
import PinNpm from "./pages/PinNpm";
import Watools from "./pages/Watools";
import Airtable from "./pages/Airtable";
import LinkedIn from "./pages/LinkedIn";
import ResetPassword from "./pages/ResetPassword";
import NewsletterConfirmation from "./pages/NewsletterConfirmation";
import BubbleNewsletterConfirmation from "./pages/BubbleNewsletterConfirmation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="/bubble" element={<Bubble />} />
              <Route path="/pinnpm" element={<PinNpm />} />
              <Route path="/watools" element={<Watools />} />
              <Route path="/airtable" element={<Airtable />} />
              <Route path="/linkedin" element={<LinkedIn />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/pinnpm/newsletter-confirmed" element={<NewsletterConfirmation />} />
              <Route path="/bubble/newsletter-confirmed" element={<BubbleNewsletterConfirmation />} />
              <Route path="/" element={<Bubble />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
