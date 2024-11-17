-- Обновление таблицы profiles с расширенными ролями
create type user_role as enum (
  'super_admin',
  'analyst',
  'director',
  'head_teacher',
  'secretary',
  'teacher',
  'curator',
  'medical_worker',
  'psychologist',
  'speech_therapist',
  'parent',
  'student'
);

create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  role user_role not null,
  email text unique not null,
  phone text,
  avatar_url text,
  additional_roles user_role[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Таблица для управления правами доступа
create table permissions (
  id uuid default uuid_generate_v4() primary key,
  role user_role not null,
  module text not null,
  can_view boolean default false,
  can_create boolean default false,
  can_edit boolean default false,
  can_delete boolean default false,
  can_moderate boolean default false
);

-- Таблица классов
create table classes (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  curator_id uuid references profiles(id),
  academic_year text not null,
  created_at timestamptz default now()
);

-- Таблица предметов
create table subjects (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  code text unique not null,
  description text
);

-- Таблица расписания
create table schedule (
  id uuid default uuid_generate_v4() primary key,
  class_id uuid references classes(id),
  subject_id uuid references subjects(id),
  teacher_id uuid references profiles(id),
  day_of_week smallint check (day_of_week between 1 and 7),
  start_time time not null,
  end_time time not null,
  room_number text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Таблица замен
create table substitutions (
  id uuid default uuid_generate_v4() primary key,
  schedule_id uuid references schedule(id),
  original_teacher_id uuid references profiles(id),
  substitute_teacher_id uuid references profiles(id),
  date date not null,
  reason text,
  status text check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz default now(),
  approved_by uuid references profiles(id)
);

-- Таблица оценок
create table grades (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references profiles(id),
  subject_id uuid references subjects(id),
  teacher_id uuid references profiles(id),
  grade numeric(3,1) not null,
  weight smallint default 1,
  type text not null,
  comment text,
  status text check (status in ('draft', 'pending', 'approved', 'rejected')),
  created_at timestamptz default now(),
  approved_at timestamptz,
  approved_by uuid references profiles(id)
);

-- Таблица домашних заданий
create table homework (
  id uuid default uuid_generate_v4() primary key,
  class_id uuid references classes(id),
  subject_id uuid references subjects(id),
  teacher_id uuid references profiles(id),
  title text not null,
  description text not null,
  due_date date not null,
  materials jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Таблица библиотеки
create table library_materials (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  type text not null,
  subject_id uuid references subjects(id),
  url text not null,
  metadata jsonb,
  uploaded_by uuid references profiles(id),
  created_at timestamptz default now()
);

-- Таблица новостей
create table news (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text not null,
  author_id uuid references profiles(id),
  status text check (status in ('draft', 'published', 'archived')),
  publish_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Таблица чатов
create table chats (
  id uuid default uuid_generate_v4() primary key,
  type text check (type in ('private', 'group')),
  created_at timestamptz default now()
);

create table chat_participants (
  chat_id uuid references chats(id),
  user_id uuid references profiles(id),
  primary key (chat_id, user_id)
);

create table messages (
  id uuid default uuid_generate_v4() primary key,
  chat_id uuid references chats(id),
  sender_id uuid references profiles(id),
  content text not null,
  attachments jsonb,
  created_at timestamptz default now()
);

-- Политики безопасности
alter table profiles enable row level security;
alter table permissions enable row level security;
alter table classes enable row level security;
alter table schedule enable row level security;
alter table substitutions enable row level security;
alter table grades enable row level security;
alter table homework enable row level security;
alter table library_materials enable row level security;
alter table news enable row level security;
alter table chats enable row level security;
alter table chat_participants enable row level security;
alter table messages enable row level security;

-- Базовые политики для profiles
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Функции для проверки прав доступа
create or replace function has_permission(user_id uuid, required_role user_role)
returns boolean as $$
begin
  return exists (
    select 1 from profiles
    where id = user_id
    and (role = required_role or required_role = any(additional_roles))
  );
end;
$$ language plpgsql security definer;
