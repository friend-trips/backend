# backend

# API
## Endpoint:  (POST, GET) /trips
### sample POST /trips request
```
request body  value types
{
    name = (String)
}

request sample
{
    "name": "spain trip"
}

---------------------------

request body  value types
{
    trip_id = (Number)
}

request sample
{
    "trip_id": 1
}
```
### sample GET /trips/:trip_id request (DO NOT USE)
```
request params  value types
{
    trip_id = (Number)
}

request sample
{
    "trip_id": 1
}

---------------------------

request body  value types
{
    trip_id = (Number)
}

request sample
{
    "name": "sample trip"
}
```
<br /><br />

## Endpoint:  (POST, GET) /users
### sample POST /users request
```
request body value types
{
    username = (String),
    password = (String),
    email = (String),
    trip_id (Number)
}

request sample
{
    "username": "sample_user",
    "password": "a_password1",
    "email": "sample@email.com",
    "trip_id": 1
}

---------------------------

response body value types
{
    user_id = (Number),
    username = (String),
    trip_id = (Number)
}

response sample
{
    user_id: 1,
    "username": "sample_user",
    "trip_id": 1,
}
```

### sample GET /users/:user_id request
```
response params value types
{
    user_id = (Number)
}

response sample
{
  user_id: 1
}

---------------------------

response body value types
{
    trip_id = (Number),
    user_id = (Number),
    username = (String),
    email = (String)
}

response sample
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
request body value types
{
    user_id = (Number),
    trip_id = (Number),
    message = (String)
}

request sample
{
    "user_id": 1,
    "trip_id": 1,
    "message": "hello world"
}

---------------------------

response body value types
{
    message_id = (Number)
}

response sample
{
    "message_id": 1
}
```

### sample GET /messages request
```
request body value types
{
    trip_id = (Number)
}

request sample
{
    "trip_id": 1,
}

---------------------------

response body value types
{
    message_id = (Number),
    user_id = (Number),
    username = (String),
    trip_id = (Number),
    has_comments = (Number 0=false, 1=true),
    message = (String),
    date = (Date)
}

response sample
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

## Endpoint:  (POST, GET) /comments
### sample POST /comments request
```
request body value types
{
    trip_id = (Number),
    user_id = (Number),
    comment = (String)
}

request sample
{
    "trip_id": 1.
    "user_id": 1,
    "comment": "This place looks perfect"
}

---------------------------

response body value types
{
    comment_id = (Number)
}

response sample
{
    "comment_id": 1,
}
```

### sample GET /comments request
```
request body value types
{
    message_id = (Number)
}

request sample
{
    "message_id": 1,
}

---------------------------

response body value types
{
    comment_id = (Number),
    message_id =  (Number),
    user_id =  (Number),
    username =  (String),
    comment =  (String),
    date =  (Date),
}

response sample
{
    [
        {
            "comment_id": 1,
            "message_id": 1,
            "user_id": 1,
            "username": "a user",
            "comment": "Let's go to Spain afterward",
            "date": "2020-12-02T00:00:00.000Z"
        },
        {
            "comment_id": 2,
            "message_id": 1,
            "user_id": 2,
            "username": "another user",
            "comment": "Great idea!!",
            "date": "2020-12-02T00:00:00.000Z"
        },
        ....
    ]
}
```