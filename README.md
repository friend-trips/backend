# backend

# API
## Endpoint:  (POST, GET) /trips
### sample POST /trips request
```
request body {name = (String)}
{
    "name": "spain trip"
}

request body {trip_id = (Number)}
{
    "trip_id": 1
}
```
### sample GET /trips/:trip_id request (DO NOT USE)
```
request params {trip_id = (Number)}
{
    "trip_id": 1
}

request body {trip_id = (Number)}
{
    "name": "sample trip"
}
```
<br /><br />

## Endpoint:  (POST, GET) /users
### sample POST /users request
```
request body {username = (String), password = (String), email = (String), trip_id (Number)}
{
    "username": "sample_user",
    "password": "a_password1",
    "email": "sample@email.com",
    "trip_id": 1
}

response body {user_id = (Number), username = (String), trip_id = (Number)}
{
    user_id: 1,
    "username": "sample_user",
    "trip_id": 1,
}
```

### sample GET /users/:user_id request
```
response params {user_id = (Number)}
{
  user_id: 1
}

response body {trip_id = (Number), user_id = (Number), username = (String), email = (String)}
{
    "trip_id": 1,
    "user_id": 3,
    "username": "mo",
    "email": "mo@moo.com",
}
```
<br /><br />

## Endpoint:  (POST, GET) /messages
### sample POST /messages request

```
request body {user_id = (Number), trip_id = (Number), message = (String)}
{
    "user_id": 1,
    "trip_id": 1,
    "message": "hello world"
}

response body {message_id = (Number)}
{
    "message_id": 1
}
```

### sample GET /messages request
```
request body {trip_id = (Number)}

{
    "trip_id": 1,
}

response body {
    message_id = (Number), user_id = (Number), username = (String)
    trip_id = (Number), has_comments = (Number 0=false, 1=true), message = (String),
    date = (Date)
}

{
    [
        {
            "message_id": 1,
            "user_id": 1,
            "username": "sample user",
            "trip_id": 1,
            "has_comments": 0,
            "message": "hello world",
            "date": "2020-12-02T00:00:00.000Z"
        },
        {
            "message_id": 2,
            "username": "another sample user",
            "user_id": 2,
            "trip_id": 1,
            "has_comments": 0,
            "message": "hello friends",
            "date": "2020-12-02T00:00:00.000Z"
        },
        ....
    ]
}
```
<br /><br />

## Endpoint:  (POST, GET) /messages
### sample POST /comments request
```

```
