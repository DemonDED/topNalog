## `/createUser`

**Method** : `POST`

**Content**

```json
{
  "userName": "Ded",
  "password": "123321",
  "email": "ded@mail.ru",
  "address": "sportivnaya 5",
  "contact": "8-555-66-33",
  "tin": 55332211
}
```

**Response** : 

```json
{
  "result": "user succesfully created"
}
```

**Code** : `200 OK`

<br>

---

<br>

## `/login`

**Method** : `POST`

**Content**

```json
{
  "userName": "Ded",
  "password": "123321"
}
```

**Response** : 

```json
{
  "result": "succefully authorized"
}
```

**Code** : `200 OK`

<br>

---

<br>

## `/getUserInformation/{userName}`

**Method** : `GET`

**Response** : 

```json
{
  "userName": "Ded",
  "email": "ded@mail.ru",
  "address": "sportivnaya 5",
  "contact": "8-555-66-33",
  "tin": 55332211
}
```

**Code** : `200 OK`

<br>

---

<br>
