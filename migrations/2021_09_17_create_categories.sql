create table category (
  id uuid default uuid_generate_v4() primary key,
  name varchar(255) not null,
  path ltree not null,
  level integer GENERATED ALWAYS AS (nlevel(path)) STORED not null,
  has_header boolean not null default true,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

CREATE POLICY "Enable access to all users" ON public.category FOR
SELECT
  USING (true);

CREATE POLICY "only admin can insert"
  ON public.category
  FOR UPDATE USING (
    auth.email() = -- <admin email with single quotes>
  ) WITH CHECK (
    auth.email() = -- <admin email with single quotes>
  );

CREATE POLICY "only admin can update"
  ON public.category
  FOR INSERT WITH CHECK (
    auth.email() = -- <admin email with single quotes>
  );

CREATE POLICY "only admin can delete"
  ON public.category
  FOR DELETE USING (
    auth.email() = -- <admin email with single quotes>
  );