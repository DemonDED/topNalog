## `/createUser`

**Method** : `POST`

**Content**

```json
{
  "userName": "Ded",
  "password": "123321",
  "email": "ded@mail.ru",
  "accessLevel": 1,
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

## `/getUserInformation?username={userName}`

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

## `/createTaxReporting`

**Method** : `POST`

**Content**

```json
{
  "userName": "Ded",
  "type": "Имущественная декларация",
  "text": "Сведения об имуществе, облагаемом налогами",
  "date": "new Date().getTime()"
}
```

**Response** : 

```json
{
  "result": "Succefully create tax reporting"
}
```

**Code** : `200 OK`

<br>

---

<br>

## `/getTaxReporting?username={userName}`

**Method** : `GET`

**Response** : 

```json
{
  [
    {
      "userName": "Ded",
      "type": "Имущественная декларация",
      "text": "Сведения об имуществе, облагаемом налогами",
      "date": "1650894461661"
    },
    {
      "userName": "Ded",
      "type": "Политическая декларация",
      "text": "Основы деятельности международных организаций",
      "date": "1650894461661"
    }
  ]
}
```

**Code** : `200 OK`

<br>

---

<br>