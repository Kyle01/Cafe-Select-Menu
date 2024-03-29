create table menu_item (
  id uuid default uuid_generate_v4() primary key,
  category_id uuid not null,
  name varchar(255) not null,
  description text,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);

CREATE POLICY "Enable access to all users" ON public.menu_item FOR
SELECT
  USING (true);

CREATE POLICY "only admin can insert"
  ON public.menu_item
  FOR UPDATE USING (
    auth.email() = -- <admin email with single quotes>
  ) WITH CHECK (
    auth.email() = -- <admin email with single quotes>
  );

CREATE POLICY "only admin can update"
  ON public.menu_item
  FOR INSERT WITH CHECK (
    auth.email() = -- <admin email with single quotes>
  );

CREATE POLICY "only admin can delete"
  ON public.menu_item
  FOR DELETE USING (
    auth.email() = -- <admin email with single quotes>
  );