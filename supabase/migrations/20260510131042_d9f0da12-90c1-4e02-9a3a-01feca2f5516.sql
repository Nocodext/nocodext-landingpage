
-- 1. Lock down beta_invitations: drop public SELECT policy, add validation RPC
DROP POLICY IF EXISTS "Anyone can validate a token" ON public.beta_invitations;

CREATE OR REPLACE FUNCTION public.validate_invite_token(p_token text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.beta_invitations
    WHERE token = p_token
      AND used_at IS NULL
      AND expires_at > now()
  );
$$;

REVOKE ALL ON FUNCTION public.validate_invite_token(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.validate_invite_token(text) TO anon, authenticated;

-- 2. Remove overpermissive policy on pinnpm_user_favorites
DROP POLICY IF EXISTS "allow_all_authenticated" ON public.pinnpm_user_favorites;

-- 3. Remove overpermissive write policy on pinnpm_packages (keep read + service role)
DROP POLICY IF EXISTS "pinnpm_packages_policy" ON public.pinnpm_packages;

-- 4. Recreate pinnpm_view_user_favorites scoped to current user
DROP VIEW IF EXISTS public.pinnpm_view_user_favorites CASCADE;
CREATE VIEW public.pinnpm_view_user_favorites
WITH (security_invoker = true, security_barrier = true) AS
SELECT uf.user_id,
       uf.created_at AS pinned_at,
       p.*
FROM public.pinnpm_user_favorites uf
JOIN public.pinnpm_packages p ON uf.package_id = p.id
WHERE uf.user_id = auth.uid();

-- 5. Make feedback-screenshots bucket private and restrict reads to owner
UPDATE storage.buckets SET public = false WHERE id = 'feedback-screenshots';

DROP POLICY IF EXISTS "Public read for feedback screenshots" ON storage.objects;

CREATE POLICY "Users can read their own feedback screenshots"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'feedback-screenshots'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- 6. Set search_path on existing SECURITY DEFINER functions to address linter warning
ALTER FUNCTION public.pinnpm_add_user_favorite(uuid, text, text, text) SET search_path = public;
ALTER FUNCTION public.pinnpm_get_user_favorites(uuid) SET search_path = public;
ALTER FUNCTION public.pinnpm_remove_user_favorite(uuid, text) SET search_path = public;
ALTER FUNCTION public.pinnpm_get_user_preferences(uuid) SET search_path = public;
ALTER FUNCTION public.pinnpm_upsert_user_preferences(uuid, jsonb) SET search_path = public;
