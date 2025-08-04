import { supabase } from "@/integrations/supabase/client";

export const resetPassword = async (email: string) => {
  const redirectUrl = `${window.location.origin}/reset-password?type=recovery`;
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl,
  });
  
  return { error };
};

export const updatePassword = async (newPassword: string) => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  });
  
  return { error };
};