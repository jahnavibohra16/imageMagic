-- Create a table for storing image transformation history
create table public.images (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  original_image_url text not null,
  transformed_image_url text,
  transformation_type text,
  platform text,
  created_at timestamp with time zone not null default now(),
  constraint images_pkey primary key (id)
);

-- Enable Row Level Security (RLS)
alter table public.images enable row level security;

-- Create policies for interactions with the 'images' table
create policy "Users can view their own images"
on public.images
for select
to authenticated
using (
  (select auth.uid()) = user_id
);

create policy "Users can insert their own images"
on public.images
for insert
to authenticated
with check (
  (select auth.uid()) = user_id
);

create policy "Users can delete their own images"
on public.images
for delete
to authenticated
using (
  (select auth.uid()) = user_id
);
