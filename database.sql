DROP TABLE IF EXISTS public.users_table;
CREATE TABLE users_table (
  id              SERIAL PRIMARY KEY,
  name           VARCHAR(30) NOT NULL,
  password  VARCHAR(100) NOT NULL,
  UNIQUE (name)
);


DROP TABLE IF EXISTS public.planet_votes_table;
CREATE TABLE planet_votes_table (
  id              SERIAL PRIMARY KEY,
  planetid           VARCHAR(50),
  planetname  VARCHAR(50),
  userid integer,
  submissiontime timestamp without time zone
);


DROP TABLE IF EXISTS public.statuses;
CREATE TABLE statuses (
  id              SERIAL PRIMARY KEY,
  name           VARCHAR(50)
);


DROP TABLE IF EXISTS public.boards;
CREATE TABLE boards (
  id              SERIAL PRIMARY KEY,
  title           VARCHAR(50),
  is_active  BOOLEAN
);


DROP TABLE IF EXISTS public.cards;
CREATE TABLE cards (
  id              SERIAL PRIMARY KEY,
  title           VARCHAR(50),
  board_id  integer,
  status_id integer,
  card_order integer
);
