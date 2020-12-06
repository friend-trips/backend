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
  timestamp TEXT,
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
  suggestion_id TEXT,
  user_id INTEGER,
  nonstop TEXT,
  is_suggested VARCHAR(6),
  is_saved VARCHAR(6),
  flight_number TEXT,
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
  abbreviated_carrier_code TEXT,
  total_price TEXT,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS hotels;

CREATE TABLE hotels (
  suggestion_id SERIAL,
  trip_id INTEGER,
  user_id INTEGER,
  check_in_date TEXT,
  check_out_date TEXT,
  room_quanity INTEGER,
  adults INTEGER,
  hotel_name TEXT,
  hotel_address TEXT,
  city_code TEXT,
  rating INTEGER,
  amenities TEXT,
  price INTEGER,
  number_of_reviews INTEGER,
  number_of_ratings INTEGER,
  overall_ratings INTEGER,
  sleep_quality_rating INTEGER,
  service_rating INTEGER,
  facilities_rating INTEGER,
  room_comforts_rating INTEGER,
  value_for_money_rating INTEGER,
  catering_rating INTEGER,
  location_rating INTEGER,
  points_of_interest_rating  INTEGER,
  staff_rating  INTEGER,
  upvotes INTEGER,
  downvotes INTEGER,
  time_created TEXT,
  PRIMARY KEY (suggestion_id)
);

DROP TABLE IF EXISTS votes;

CREATE TABLE votes (
    vote_id SERIAL,
    suggestion_id TEXT,
    user_id INTEGER,
    trip_id INTEGER,
    type TEXT,
    num_value INTEGER,
    PRIMARY KEY (vote_id)
)
