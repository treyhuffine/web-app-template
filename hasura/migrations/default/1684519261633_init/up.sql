SET check_function_bodies = false;
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    firebase_id text NOT NULL,
    email text NOT NULL,
    stripe_customer_id text NOT NULL,
    full_name text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    birthday date,
    original_auth_provider text NOT NULL,
    last_auth_provider text NOT NULL,
    profile_image_url text NOT NULL,
    about_me text NOT NULL,
    signup_provider_data jsonb,
    zipcode text NOT NULL,
    phone_number text,
    username text
);
CREATE VIEW public.user_profiles AS
 SELECT users.id,
    users.created_at,
    users.updated_at,
    users.deleted_at,
    users.username,
    users.full_name,
    users.about_me,
    users.profile_image_url
   FROM public.users;
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_firebase_id_key UNIQUE (firebase_id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_stripe_customer_id_key UNIQUE (stripe_customer_id);
CREATE TRIGGER set_public_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_users_updated_at ON public.users IS 'trigger to set value of column "updated_at" to current timestamp on row update';
