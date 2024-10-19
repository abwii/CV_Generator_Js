
# API Endpoints

## Hello Word

GET
``/``

*Outputs "Hello Wolrd!"*

## Login / Register

POST	
``api/auth/register``

```json
{
  "firstname": "Jhon",
  "lastname": "Doe",
  "email": "example@gmail.com",
  "phone": "0612121212",
  "password": "SecurePassword123",
  "address": "Paris"
}
```

POST	
``api/auth/login``

```json
{
  "email": "example@gmail.com",
  "password": "SecurePassword123"
}
```

## Users

GET ``api/user/me``

*Provide a valid token, outputs user's informations*


PUT ``api/user/{id}``

```json
{
  "firstname": "Jhony",
  "lastname": "Doey",
  "email": "example2@gmail.com",
  "phone": "0612121213",
  "password": "SecurePassword124",
  "address": "Nice"
}
```

## CV

GET ``api/cv/all``

*Get all CVs informations*

GET ``api/cv/all/{id}``

*Get a specific CV informations*

POST ``api/cv/create``

```json
{
  "user": "615f1f1d1c8a3a16c451e1b9",
  "description": "Experienced software developer with expertise in backend and frontend development.",
  "education": [
    {
      "degree": "Master of Computer Science",
      "institution": "EFREI PARIS",
      "startDate": "10/09/2018",
      "endDate": "20/06/2020",
      "description": "Specialized in software engineering and data science."
    }
  ],
  "experience": [
    {
      "title": "Software Engineer",
      "company": "Space X",
      "description": "Developed RESTful APIs and web applications using Node.js, Express, and MongoDB.",
      "startDate": "01/12/1999",
      "endDate": null
    }
  ],
  "skills": [
    "JavaScript",
    "Node.js",
    "MongoDB",
    "React",
    "Express"
  ],
  "visible": true
}

```

PUT ``api/cv/update/{id}``

```json
{
  "user": "615f1f1d1c8a3a16c451e1b9",
  "description": "Unexperienced software developer with expertise in backend and frontend development.",
  "education": [
    {
      "degree": "Master of Computer Science",
      "institution": "EPITA",
      "startDate": "10/09/2018",
      "endDate": "20/06/2020",
      "description": "Specialized in software engineering and data science."
    }
  ],
  "visible": false
}

```

DELETE ``api/cv/delete/{id}``

## Comments

POST ``api/comment/add``

```json
{
  "cv": "615f1f1d1c8a3a16c451e1b9",
  "user": "616e2e1d2c8a4a16d451e2a7",
  "content": "Great CV! I think you have an impressive work experience."
}
```


DELETE ``api/comment/delete/{id}``

GET ``api/comment/all/{id}``