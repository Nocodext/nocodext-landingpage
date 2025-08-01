import { supabase } from "@/integrations/supabase/client";

interface NewsletterSubscription {
  name?: string;
  email: string;
  product: string;
}

interface NewsletterResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const subscribeToNewsletter = async ({
  name,
  email,
  product
}: NewsletterSubscription): Promise<NewsletterResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
      body: { 
        name: name || undefined, 
        email, 
        product 
      }
    });
    
    if (error) {
      console.error("Newsletter subscription error:", error);
      return { success: false, error: error.message || "Failed to subscribe" };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An error occurred" 
    };
  }
};