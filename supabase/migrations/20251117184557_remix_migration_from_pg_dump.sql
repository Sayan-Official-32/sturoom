--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: room_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.room_status AS ENUM (
    'pending',
    'approved',
    'rejected'
);


--
-- Name: room_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.room_type AS ENUM (
    'single',
    'shared',
    'pg',
    'flat'
);


--
-- Name: user_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.user_role AS ENUM (
    'student',
    'owner',
    'admin'
);


--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  );
  RETURN NEW;
END;
$$;


--
-- Name: has_role(uuid, public.user_role); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.has_role(_user_id uuid, _role public.user_role) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: bookmarks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.bookmarks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid NOT NULL,
    room_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: colleges; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.colleges (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    city text NOT NULL,
    address text,
    latitude numeric(10,8),
    longitude numeric(11,8),
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    full_name text NOT NULL,
    phone text,
    avatar_url text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reviews (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    room_id uuid NOT NULL,
    student_id uuid NOT NULL,
    rating integer NOT NULL,
    comment text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


--
-- Name: room_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.room_images (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    room_id uuid NOT NULL,
    image_url text NOT NULL,
    is_primary boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: rooms; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rooms (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    owner_id uuid NOT NULL,
    college_id uuid,
    title text NOT NULL,
    description text,
    room_type public.room_type NOT NULL,
    rent numeric(10,2) NOT NULL,
    address text NOT NULL,
    city text NOT NULL,
    latitude numeric(10,8),
    longitude numeric(11,8),
    distance_from_college numeric(5,2),
    amenities text[],
    is_available boolean DEFAULT true NOT NULL,
    status public.room_status DEFAULT 'pending'::public.room_status NOT NULL,
    views_count integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role public.user_role DEFAULT 'student'::public.user_role NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: bookmarks bookmarks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_pkey PRIMARY KEY (id);


--
-- Name: bookmarks bookmarks_student_id_room_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_student_id_room_id_key UNIQUE (student_id, room_id);


--
-- Name: colleges colleges_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.colleges
    ADD CONSTRAINT colleges_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: room_images room_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.room_images
    ADD CONSTRAINT room_images_pkey PRIMARY KEY (id);


--
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_user_id_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);


--
-- Name: profiles update_profiles_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: rooms update_rooms_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON public.rooms FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: bookmarks bookmarks_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id) ON DELETE CASCADE;


--
-- Name: bookmarks bookmarks_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_student_id_fkey FOREIGN KEY (student_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: reviews reviews_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id) ON DELETE CASCADE;


--
-- Name: reviews reviews_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_student_id_fkey FOREIGN KEY (student_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: room_images room_images_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.room_images
    ADD CONSTRAINT room_images_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id) ON DELETE CASCADE;


--
-- Name: rooms rooms_college_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_college_id_fkey FOREIGN KEY (college_id) REFERENCES public.colleges(id) ON DELETE SET NULL;


--
-- Name: rooms rooms_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: rooms Admins can delete rooms; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can delete rooms" ON public.rooms FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.user_role));


--
-- Name: colleges Admins can manage colleges; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage colleges" ON public.colleges TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.user_role));


--
-- Name: rooms Anyone can view approved rooms; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view approved rooms" ON public.rooms FOR SELECT TO authenticated USING (((status = 'approved'::public.room_status) OR (owner_id = auth.uid()) OR public.has_role(auth.uid(), 'admin'::public.user_role)));


--
-- Name: colleges Anyone can view colleges; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view colleges" ON public.colleges FOR SELECT TO authenticated USING (true);


--
-- Name: reviews Anyone can view reviews; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT TO authenticated USING (true);


--
-- Name: room_images Anyone can view room images; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view room images" ON public.room_images FOR SELECT TO authenticated USING (true);


--
-- Name: rooms Owners can insert rooms; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Owners can insert rooms" ON public.rooms FOR INSERT TO authenticated WITH CHECK (((auth.uid() = owner_id) AND public.has_role(auth.uid(), 'owner'::public.user_role)));


--
-- Name: rooms Owners can update their rooms; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Owners can update their rooms" ON public.rooms FOR UPDATE TO authenticated USING (((auth.uid() = owner_id) OR public.has_role(auth.uid(), 'admin'::public.user_role)));


--
-- Name: room_images Room owners can manage their room images; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Room owners can manage their room images" ON public.room_images TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.rooms
  WHERE ((rooms.id = room_images.room_id) AND (rooms.owner_id = auth.uid())))));


--
-- Name: reviews Students can create reviews; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can create reviews" ON public.reviews FOR INSERT TO authenticated WITH CHECK (((auth.uid() = student_id) AND public.has_role(auth.uid(), 'student'::public.user_role)));


--
-- Name: reviews Students can delete their own reviews; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can delete their own reviews" ON public.reviews FOR DELETE TO authenticated USING ((auth.uid() = student_id));


--
-- Name: bookmarks Students can manage their bookmarks; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can manage their bookmarks" ON public.bookmarks TO authenticated USING ((auth.uid() = student_id)) WITH CHECK ((auth.uid() = student_id));


--
-- Name: reviews Students can update their own reviews; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can update their own reviews" ON public.reviews FOR UPDATE TO authenticated USING ((auth.uid() = student_id));


--
-- Name: bookmarks Students can view their bookmarks; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view their bookmarks" ON public.bookmarks FOR SELECT TO authenticated USING ((auth.uid() = student_id));


--
-- Name: profiles Users can insert their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK ((auth.uid() = id));


--
-- Name: user_roles Users can insert their own roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert their own roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK ((auth.uid() = user_id));


--
-- Name: profiles Users can update their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE TO authenticated USING ((auth.uid() = id));


--
-- Name: profiles Users can view all profiles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (true);


--
-- Name: user_roles Users can view their own roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT TO authenticated USING ((auth.uid() = user_id));


--
-- Name: bookmarks; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

--
-- Name: colleges; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: reviews; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

--
-- Name: room_images; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.room_images ENABLE ROW LEVEL SECURITY;

--
-- Name: rooms; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


