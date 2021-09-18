create table restaurant (
  id bigint generated by default as identity primary key,
  name varchar(255) not null,
  about_section text
);

CREATE POLICY "Enable access to all users" ON public.restaurant FOR
SELECT
  USING (true);

CREATE POLICY "only admin can insert"
  ON public.restaurant
  FOR UPDATE USING (
    auth.email() = -- <admin email with single quotes>
  ) WITH CHECK (
    auth.email() = -- <admin email with single quotes>
  );

CREATE POLICY "only admin can update"
  ON public.restaurant
  FOR INSERT WITH CHECK (
    auth.email() = -- <admin email with single quotes>
  );

CREATE POLICY "only admin can delete"
  ON public.restaurant
  FOR DELETE USING (
    auth.email() = -- <admin email with single quotes>
  );