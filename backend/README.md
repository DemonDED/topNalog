## `/createUser`

**Method** : `POST`

**Response** : 

```json
{
  "result": "user succesfully created"
}
```

**Code** : `200 OK`

**Content**

```json
{
  "name": "Ded",
  "password": "123321",
  "email": "ded@mail.ru",
  "address": "sportivnaya 5",
  "contact": "8-555-66-33",
  "tin": 55332211
}
```

## `/login`

**Method** : `POST`

**Response** : 

```json
{
  "result": "succefully authorized"
}
```

**Code** : `200 OK`

**Content**

```json
{
  "name": "Ded",
  "password": "123321"
}
```