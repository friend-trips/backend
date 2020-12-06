DROP TABLE IF EXISTS trips;

CREATE TABLE trips (
  trip_id SERIAL,
  name VARCHAR(20),
  user_id INTEGER,
  PRIMARY KEY (trip_id)
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id SERIAL,
  email VARCHAR(20),
  username VARCHAR(20),
  password VARCHAR(20),
  PRIMARY KEY (user_id)
);

DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
  message_id SERIAL,
  user_id INTEGER,
  trip_id INTEGER,
  has_comments INT,
  message TEXT,
  date DATE,
  time VARCHAR(10),
  PRIMARY KEY (message_id)
);

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
  comment_id SERIAL,
  message_id INTEGER,
  user_id INTEGER,
  comment TEXT,
  date DATE,
  time VARCHAR(10),
  PRIMARY KEY (comment_id)
);

DROP TABLE IF EXISTS flights;

CREATE TABLE flights (
  id SERIAL,
  trip_id INTEGER,
  flight_id TEXT,
  user_id INTEGER,
  non_stop TEXT,
  is_suggested VARCHAR(6),
  is_saved VARCHAR(6),
  duration  TEXT,
  arrival_airport  TEXT,
  arrival_time  TEXT,
  departure_airport  TEXT,
  departure_time  TEXT,
  departure_date  TEXT,
  number_of_stops  INTEGER,
  carrier_code  TEXT,
  operating_carrier_code  TEXT,
  class  TEXT,
  adults INTEGER,
  upvotes INTEGER,
  downvotes INTEGER,
  time_created TEXT,
  type_of_flight TEXT,
  PRIMARY KEY (id)
);