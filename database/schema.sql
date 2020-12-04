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
