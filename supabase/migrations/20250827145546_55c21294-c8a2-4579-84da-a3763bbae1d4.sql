-- Enable RLS on the stripe_user_orders view
-- Note: This is a view, so we need to secure the underlying table instead
-- The view stripe_user_orders appears to be based on stripe_orders table

-- First, let's check if RLS is enabled on the underlying tables and add proper policies

-- Ensure RLS is enabled on stripe_orders table (should already be enabled)
ALTER TABLE public.stripe_orders ENABLE ROW LEVEL SECURITY;

-- Ensure RLS is enabled on stripe_customers table (should already be enabled) 
ALTER TABLE public.stripe_customers ENABLE ROW LEVEL SECURITY;

-- Create a secure view that only shows orders for the authenticated user
-- Drop the existing view if it exists and recreate it with proper security
DROP VIEW IF EXISTS public.stripe_user_orders;

-- Create a new secure view that respects RLS
CREATE VIEW public.stripe_user_orders 
WITH (security_barrier=true) AS
SELECT 
  o.id as order_id,
  o.amount_subtotal,
  o.amount_total,
  o.status as order_status,
  o.created_at as order_date,
  o.currency,
  o.payment_status,
  o.customer_id,
  o.checkout_session_id,
  o.payment_intent_id
FROM public.stripe_orders o
INNER JOIN public.stripe_customers c ON o.customer_id = c.customer_id
WHERE c.user_id = auth.uid() AND c.deleted_at IS NULL AND o.deleted_at IS NULL;

-- Grant SELECT permission to authenticated users on the view
GRANT SELECT ON public.stripe_user_orders TO authenticated;

-- Revoke access from anon users
REVOKE ALL ON public.stripe_user_orders FROM anon;