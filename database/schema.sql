
DROP TABLE IF EXISTS trips;
CREATE TABLE trips (
  trip_id SERIAL,
  name VARCHAR(20),
  PRIMARY KEY (trip_id)
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id SERIAL,
  email VARCHAR(20),
  username VARCHAR(20),
  password TEXT,
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
  trip_id INTEGER,
  user_id INTEGER,
  comment TEXT,
  timestamp TEXT,
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
  num_of_seats INTEGER,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS hotels;

CREATE TABLE hotels (
  h_id SERIAL,
  suggestion_id TEXT,
  trip_id INTEGER,
  user_id INTEGER,
  check_in_date TEXT,
  check_out_date TEXT,
  room_quantity INTEGER,
  adults INTEGER,
  hotel_name TEXT,
  hotel_address TEXT,
  city_code TEXT,
  rating INTEGER,
  amenities TEXT,
  offer_id TEXT,
  price DECIMAL,
  currency TEXT,
  room_type TEXT,
  bed_type TEXT,
  number_of_beds INTEGER,
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
  distance_from_city_center TEXT,
  hotel_id TEXT,
  is_suggested VARCHAR(6),
  is_saved VARCHAR(6),
  num_of_nights INTEGER,
  PRIMARY KEY (h_id)
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
);

DROP TABLE IF EXISTS itinerary;

CREATE TABLE itinerary (
    itinerary_id SERIAL,
    name TEXT,
    user_id INTEGER,
    trip_id INTEGER,
    time_created TEXT,
    last_updated TEXT,
    PRIMARY KEY (itinerary_id)
);

DROP TABLE IF EXISTS sii;

CREATE TABLE sii (
    sii_id SERIAL,
    itinerary_id INTEGER,
    suggestion_id TEXT,
    PRIMARY KEY (sii_id)
);