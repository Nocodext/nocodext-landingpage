-- Fix security definer views by recreating them without SECURITY DEFINER

-- First, drop the duplicate view that seems to be incorrectly named
DROP VIEW IF EXISTS public.pinnmp_view_user_favorites;

-- Drop and recreate stripe_user_orders view without SECURITY DEFINER
DROP VIEW IF EXISTS public.stripe_user_orders CASCADE;

CREATE VIEW public.stripe_user_orders AS 
SELECT 
    o.id AS order_id,
    o.amount_subtotal,
    o.amount_total,
    o.status AS order_status,
    o.created_at AS order_date,
    o.currency,
    o.payment_status,
    o.customer_id,
    o.checkout_session_id,
    o.payment_intent_id
FROM stripe_orders o
JOIN stripe_customers c ON o.customer_id = c.customer_id
WHERE c.user_id = auth.uid() 
    AND c.deleted_at IS NULL 
    AND o.deleted_at IS NULL;

-- Drop and recreate stripe_user_subscriptions view without SECURITY DEFINER
DROP VIEW IF EXISTS public.stripe_user_subscriptions CASCADE;

CREATE VIEW public.stripe_user_subscriptions AS 
SELECT 
    c.customer_id,
    s.subscription_id,
    s.status AS subscription_status,
    s.price_id,
    s.current_period_start,
    s.current_period_end,
    s.cancel_at_period_end,
    s.payment_method_brand,
    s.payment_method_last4
FROM stripe_customers c
LEFT JOIN stripe_subscriptions s ON c.customer_id = s.customer_id
WHERE c.user_id = auth.uid() 
    AND c.deleted_at IS NULL 
    AND s.deleted_at IS NULL;