-- Fix security definer views by recreating them without SECURITY DEFINER

-- Drop and recreate stripe_user_orders view without SECURITY DEFINER
DROP VIEW IF EXISTS public.stripe_user_orders;

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
DROP VIEW IF EXISTS public.stripe_user_subscriptions;

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

-- Also check and fix the duplicate pinnpm view if it has SECURITY DEFINER
DROP VIEW IF EXISTS public.pinnmp_view_user_favorites;

-- Recreate it properly without SECURITY DEFINER (this appears to be a duplicate of pinnpm_view_user_favorites)
CREATE VIEW public.pinnpm_view_user_favorites AS 
SELECT 
    uf.user_id,
    uf.created_at AS pinned_at,
    p.id AS package_id,
    p.name AS package_name,
    p.tag AS package_tag,
    p.downloads,
    p.description,
    p.keywords,
    p.pin_count,
    p.security_score,
    p.maintenance_score,
    p.security_last_checked,
    p.maintenance_last_checked
FROM pinnpm_user_favorites uf
JOIN pinnpm_packages p ON uf.package_id = p.id;