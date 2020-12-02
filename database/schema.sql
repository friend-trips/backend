DROP TABLE IF EXISTS trips;

CREATE TABLE trips (
  id SERIAL,
  name VARCHAR(20),
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL,
  trip_id INTEGER,
  email VARCHAR(20),
  username VARCHAR(20),
  password VARCHAR(20),
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
  id SERIAL,
  user_id INTEGER,
  trip_id INTEGER,
  has_comments INT,
  message TEXT,
  date DATE,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
  id SERIAL,
  message_id INTEGER,
  suggestion_id INTEGER,
  user_id INTEGER,
  comment TEXT,
  date DATE,
  PRIMARY KEY (id)
);
