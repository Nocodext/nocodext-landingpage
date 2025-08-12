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
    const response = await fetch('https://umnmvwyxjxswwidueaqy.supabase.co/functions/v1/newsletter-subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        productName: product
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to subscribe' }));
      console.error("Newsletter subscription error:", errorData);
      return { success: false, error: errorData.error || "Failed to subscribe" };
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An error occurred" 
    };
  }
};