define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "User's Authentication",
    "version": "0.2.0",
    "name": "Login",
    "group": "Authentication",
    "success": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body:",
          "content": "\n{\n\"email\":\"lemaitre@gmail.com\",\n\"password\":\"Conquérantdelunivers\"\n}",
          "type": "json"
        },
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"user\": {\n    \"first_name\": \"Missy\",\n    \"last_name\": \"Of Gallifrey\",\n    \"pseudo\": \"LeMaitre\",\n    \"email\": \"lemaitre@gmail.com\",\n    \"is_admin\": false\n  },\n  \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsZW1haXRyZUBnbWFpbC5jb20iLCJpYXQiOjE2MTkwNDYxMTEsImV4cCI6MTYxOTA0OTcxMX0.cQBvaaj7czxA5kUp9DrmK_GYw-M8IG8cT5pJLj62ome26q30TQZC4lZSvqRmpQpzkhRd-BFBzu8EDklNTaMgyQ\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "type": "Object",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Bad credentials.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/AuthenticationView.py",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/signup",
    "title": "Create a new User",
    "version": "0.2.0",
    "name": "SignUp",
    "group": "Authentication",
    "success": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>User's first name</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>User's last name</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "pseudo",
            "description": "<p>User's pseudo</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body:",
          "content": "\n{\n\"first_name\":\"Missy\",\n\"last_name\":\"Of Gallifrey\",\n\"pseudo\":\"LeMaitre\",\n\"email\":\"lemaitre@gmail.com\",\n\"password\":\"Conquérantdelunivers\"\n}",
          "type": "json"
        },
        {
          "title": "Success response:",
          "content": "HTTP/1.1 201 Created\n\n{\n    \"first_name\": \"Missy\",\n    \"last_name\": \"Of Gallifrey\",\n    \"pseudo\": \"LeMaitre\",\n    \"email\": \"lemaitre@gmail.com\",\n    \"is_admin\": false\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "Object",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Malformed request syntax.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'first_name': ['Field must not be null.']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'last_name': ['Field must not be null.']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'email': ['Field must not be null.']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'pseudo': ['Field must not be null.']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'password': ['Field must not be null.']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"This email is already in use. Please use another one.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"This pseudo is already in use. Please use another one.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'email': ['Not a valid email address.']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Pseudo can contain only letters, numbers and underscores.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/AuthenticationView.py",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "/whoami",
    "title": "Request a user informations",
    "version": "0.2.0",
    "name": "Whoami",
    "group": "Authentication",
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"first_name\": \"Missy\",\n  \"last_name\": \"Of Gallifrey\",\n  \"pseudo\": \"Le maitre\",\n  \"email\": \"lemaitre@gmail.com\",\n  \"is_admin\": false\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "type": "Object",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Bad credentials.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>The User is not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/AuthenticationView.py",
    "groupTitle": "Authentication"
  },
  {
    "type": "delete",
    "url": "/challenges/:id",
    "title": "Delete a challenge",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Challenge's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "DeleteChallenge",
    "group": "Challenge",
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/ChallengeView.py",
    "groupTitle": "Challenge"
  },
  {
    "type": "get",
    "url": "/challenges/:id",
    "title": "Request a challenge informations",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Challenge's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "GetChallenge",
    "group": "Challenge",
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Challenge's ID</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Challenge's name</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Challenge's description</p>"
          },
          {
            "group": "OK 200",
            "type": "Date",
            "optional": false,
            "field": "start_date",
            "description": "<p>Challenge's validation date</p>"
          },
          {
            "group": "OK 200",
            "type": "Date",
            "optional": false,
            "field": "end_date",
            "description": "<p>Challenge's end date</p>"
          },
          {
            "group": "OK 200",
            "type": "Bool",
            "optional": false,
            "field": "alone_only",
            "description": "<p>If true user is the only person to participate in challenge, if false it is a team</p>"
          },
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "level",
            "description": "<p>Challenge's difficulty</p>"
          },
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "scalling",
            "description": "<p>Challenge's scale in meters</p>"
          },
          {
            "group": "OK 200",
            "type": "Float",
            "optional": false,
            "field": "step_length",
            "description": "<p>Challenge's step length in meters</p>"
          },
          {
            "group": "OK 200",
            "type": "Bool",
            "optional": false,
            "field": "draft",
            "description": "<p>If true the challenge is in edition mode, if false challenge is published</p>"
          },
          {
            "group": "OK 200",
            "type": "Object",
            "optional": false,
            "field": "start_crossing_point",
            "description": "<p>Challenge's start crossing point</p>"
          },
          {
            "group": "OK 200",
            "type": "Object",
            "optional": false,
            "field": "end_crossing_point",
            "description": "<p>Challenge's end crossing point</p>"
          },
          {
            "group": "OK 200",
            "type": "Array",
            "optional": false,
            "field": "segments",
            "description": "<p>All segments of the challenge</p>"
          },
          {
            "group": "OK 200",
            "type": "Object",
            "optional": false,
            "field": "admin",
            "description": "<p>Challenge's creator aka administrator</p>"
          },
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "event_sum",
            "description": "<p>Sum of distance passed of all challenge's events</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"id\": 1,\n  \"name\": \"A la recherche d'Aslan\",\n  \"description\": \"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous\",\n  \"start_date\": \"2021-04-22T11:57:00\"\n  \"end_date\": \"2021-12-15T03:16:00\",\n  \"alone_only\": 0,\n  \"level\": 3,\n  \"scalling\": 3,\n  \"step_length\": 0.7,\n  \"draft\": false,\n  \"start_crossing_point\": {\n    \"id\": 2,\n    \"name\": \"La passe du faune\",\n    \"position_x\": 0.1,\n    \"position_y\": 0.1\n  },\n  \"end_crossing_point\": {\n    \"id\": 3,\n    \"name\": \"La passe du magicien\",\n    \"position_x\": 0.2,\n    \"position_y\": 0.4\n  },\n  \"segments\": [\n    {\n      \"id\": 2,\n      \"name\": \"La route d'Ettinsmoor\",\n      \"start_crossing_point\": {\n        \"id\": 2,\n        \"name\": \"La passe du faune\",\n        \"position_x\": 0.1,\n        \"position_y\": 0.1\n      },\n      \"end_crossing_point\": {\n        \"id\": 3,\n        \"name\": \"La passe du magicien\",\n        \"position_x\": 0.2,\n        \"position_y\": 0.4\n      },\n      \"coordinates\": []\n    },\n    {\n      \"id\": 3,\n      \"name\": \"La traversée du grand désert\",\n      \"start_crossing_point\": {\n        \"id\": 2,\n        \"name\": \"La passe du faune\",\n        \"position_x\": 0.1,\n        \"position_y\": 0.1\n      },\n      \"end_crossing_point\": {\n        \"id\": 3,\n        \"name\": \"La passe du magicien\",\n        \"position_x\": 0.2,\n        \"position_y\": 0.4\n      },\n      \"coordinates\": []\n    },\n    {\n      \"id\": 4,\n      \"name\": \"La traversée du Grand Océan Oriental\",\n      \"start_crossing_point\": {\n        \"id\": 5,\n        \"name\": \"Le pont des centaures\",\n        \"position_x\": 0.3,\n        \"position_y\": 0.5\n      },\n      \"end_crossing_point\": {\n        \"id\": 8,\n        \"name\": \"La table de pierre\",\n        \"position_x\": 0.2,\n        \"position_y\": 0.5\n      },\n      \"coordinates\": []\n    }\n  ],\n  \"admin\": {\n    \"id\": 1,\n    \"first_name\": \"Missy\",\n    \"last_name\": \"Of Gallifrey\",\n    \"pseudo\": \"Le maitre\",\n    \"email\": \"lemaitre@gmail.com\"\n  }\n  \"event_sum\": 395\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/ChallengeView.py",
    "groupTitle": "Challenge"
  },
  {
    "type": "get",
    "url": "/challenges/:id/image",
    "title": "Request a challenge's map",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Challenge's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "GetChallengeImage",
    "group": "Challenge",
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "File",
            "optional": false,
            "field": "Image",
            "description": "<p>Challenge's map in jpeg/png format.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "ImageNotFound",
            "description": "<p>Challenge's map is not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource 'Challenge' is not found.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/ChallengeView.py",
    "groupTitle": "Challenge"
  },
  {
    "type": "get",
    "url": "/challenges",
    "title": "Request all challenges informations",
    "version": "0.1.0",
    "name": "GetChallenges",
    "group": "Challenge",
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Array",
            "optional": false,
            "field": "Challenges",
            "description": "<p>All challenges created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"challenges\": [\n    {\n      \"id\": 1,\n      \"name\": \"A la recherche d'Aslan\",\n      \"description\": \"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous\",\n      \"start_date\": \"2021-04-22T11:57:00\"\n      \"end_date\": \"2020-03-18T00:00:00\",\n      \"alone_only\": null,\n      \"level\": 1,\n      \"scalling\": 4,\n      \"step_length\": 0.7,\n      \"draft\": false,\n      \"start_crossing_point\": null,\n      \"end_crossing_point\": null,\n      \"segments\": [\n        {\n          \"id\": 1,\n          \"name\": \"A travers le bois d'entre les mondes\",\n          \"start_crossing_point\": {\n            \"id\": 1,\n            \"name\": \"L'armoire\",\n            \"position_x\": 0.1,\n            \"position_y\": 0.1\n          },\n          \"end_crossing_point\": {\n            \"id\": 2,\n            \"name\": \"La passe du faune\",\n            \"position_x\": 0.1,\n            \"position_y\": 0.1\n          },\n          \"coordinates\": []\n        },\n        {\n          \"id\": 2,\n          \"name\": \"La route d'Ettinsmoor\",\n          \"start_crossing_point\": {\n            \"id\": 2,\n            \"name\": \"La passe du faune\",\n            \"position_x\": 0.1,\n            \"position_y\": 0.1\n          },\n          \"end_crossing_point\": {\n            \"id\": 3,\n            \"name\": \"La passe du magicien\",\n            \"position_x\": 0.2,\n            \"position_y\": 0.4\n          },\n          \"coordinates\": null\n        },\n        {\n          \"id\": 3,\n          \"name\": \"La traversée du grand désert\",\n          \"start_crossing_point\": {\n            \"id\": 2,\n            \"name\": \"La passe du faune\",\n            \"position_x\": 0.1,\n            \"position_y\": 0.1\n          },\n          \"end_crossing_point\": {\n            \"id\": 3,\n            \"name\": \"La passe du magicien\",\n            \"position_x\": 0.2,\n            \"position_y\": 0.4\n          },\n          \"coordinates\": []\n        },\n        {\n          \"id\": 4,\n          \"name\": \"La traversée du Grand Océan Oriental\",\n          \"start_crossing_point\": {\n            \"id\": 5,\n            \"name\": \"Le pont des centaures\",\n            \"position_x\": 0.3,\n            \"position_y\": 0.5\n          },\n          \"end_crossing_point\": {\n            \"id\": 8,\n            \"name\": \"La table de pierre\",\n            \"position_x\": 0.2,\n            \"position_y\": 0.5\n          },\n          \"coordinates\": null\n        }\n      ],\n      \"admin\": {\n        \"id\": 1,\n        \"first_name\": \"Missy\",\n        \"last_name\": \"Of Gallifrey\",\n        \"pseudo\": \"Le maitre\",\n        \"email\": \"lemaitre@gmail.com\"\n      }\n    },\n    {\n      \"id\": 2,\n      \"name\": \"Oops, on a perdu Han Solo\",\n      \"description\": \"Leia Organa, Lando Calrissian et le reste de l'équipe ont merdé et ont été capturé par Jabba le Hutt. Les services secrets de la résistance ont trouvé le lieu ou ils sont tenus captifs. Il te faut donc jeune padawan allait sauver tout ce beau monde, et fissa car la lutte n'attends pas\",\n      \"start_date\": \"2021-04-22T11:57:00\"\n      \"end_date\": \"2020-03-18T00:00:00\",\n      \"alone_only\": null,\n      \"level\": 2,\n      \"scalling\": 4,\n      \"step_length\": 0.7,\n      \"draft\": false,\n      \"start_crossing_point\": null,\n      \"end_crossing_point\": null,\n      \"segments\": [],\n      \"admin\": {\n        \"id\": 1,\n        \"first_name\": \"Missy\",\n        \"last_name\": \"Of Gallifrey\",\n        \"pseudo\": \"Le maitre\",\n        \"email\": \"lemaitre@gmail.com\"\n      }\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>No challenges were found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/ChallengeView.py",
    "groupTitle": "Challenge"
  },
  {
    "type": "patch",
    "url": "/challenges/:id",
    "title": "Partially modify a challenge",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Challenge's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "PatchChallenge",
    "group": "Challenge",
    "success": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Challenge's name</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Challenge's description</p>"
          },
          {
            "group": "Body parameters",
            "type": "Date",
            "optional": false,
            "field": "end_date",
            "description": "<p>Challenge's end date in format &quot;YYYY-MM-DD&quot;</p>"
          },
          {
            "group": "Body parameters",
            "type": "Bool",
            "optional": false,
            "field": "alone_only",
            "description": "<p>If true user is the only person to participate in challenge, if false it is a team</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": false,
            "field": "level",
            "description": "<p>Challenge's difficulty</p>"
          },
          {
            "group": "Body parameters",
            "type": "Bool",
            "optional": false,
            "field": "draft",
            "description": "<p>If true the challenge is in edition mode, if false challenge is published</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": false,
            "field": "scalling",
            "description": "<p>Challenge's scale in meters</p>"
          },
          {
            "group": "Body parameters",
            "type": "Float",
            "optional": false,
            "field": "step_length",
            "description": "<p>Challenge's step length in meters</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": false,
            "field": "start_crossing_point_id",
            "description": "<p>ID of crossing point choosed as start of a challenge</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": false,
            "field": "end_crossing_point_id",
            "description": "<p>ID of end point choosed as end of a challenge</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body:",
          "content": "\n{\n  \"draft\":false\n}",
          "type": "json"
        },
        {
          "title": "Success response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "Object",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Malformed request syntax.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"The given value {name} is already used as a challenge name.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'name': ['Field must not be null.']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'name': ['Invalid value']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Invalid isoformat string: '2022-10-'\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Challenge's end date must be greater of today's date (22-04-2021, 12:59)\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Crossing point does not exist.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/ChallengeView.py",
    "groupTitle": "Challenge"
  },
  {
    "type": "post",
    "url": "/challenges",
    "title": "Create a new Challenge",
    "version": "0.1.0",
    "name": "PostChallenge",
    "group": "Challenge",
    "success": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Challenge's name</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Challenge's description</p>"
          },
          {
            "group": "Body parameters",
            "type": "Date",
            "optional": false,
            "field": "end_date",
            "description": "<p>Challenge's end date in format &quot;YYYY-MM-DD&quot;</p>"
          },
          {
            "group": "Body parameters",
            "type": "Bool",
            "optional": false,
            "field": "alone_only",
            "description": "<p>If true user is the only person to participate in challenge, if false it is a team</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": false,
            "field": "level",
            "description": "<p>Challenge's difficulty</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": false,
            "field": "scalling",
            "description": "<p>Challenge's scale in meters</p>"
          },
          {
            "group": "Body parameters",
            "type": "Float",
            "optional": false,
            "field": "step_length",
            "description": "<p>Challenge's step length in meters</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body:",
          "content": "\n{\n\"name\":\"A la recherche d'Aslan\",\n\"description\":\"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous\",\n\"end_date\":\"2022-10-18\",\n\"alone_only\":\"0\",\n\"level\":3,\n\"scalling\":10000,\n  \"step_length\": 0.7\n}",
          "type": "json"
        },
        {
          "title": "Success response:",
          "content": "HTTP/1.1 201 Created\n\n\n{\n  \"id\": 1,\n  \"name\": \"A la recherche d'Aslan\",\n  \"description\": \"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous\",\n  \"start_date\": null\n  \"end_date\": \"2021-12-15T03:16:00\",\n  \"alone_only\": 0,\n  \"level\":3,\n  \"scalling\": 3,\n  \"step_length\": 0.7,\n  \"draft\": false,\n  \"admin\": {\n    \"id\": 1,\n    \"first_name\": \"Missy\",\n    \"last_name\": \"Of Gallifrey\",\n    \"pseudo\": \"Le maitre\",\n    \"email\": \"lemaitre@gmail.com\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "Object",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Malformed request syntax.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"The given value {name} is already used as a challenge name.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'name': ['Field must not be null.']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'name': ['Invalid value']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Invalid isoformat string: '2022-10-'\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Challenge's end date must be greater of today's date (22-04-2021, 12:59)\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/ChallengeView.py",
    "groupTitle": "Challenge"
  },
  {
    "type": "post",
    "url": "/challenges/:id/image",
    "title": "Upload a challenge's map",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Challenge's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "PostChallengeImage",
    "group": "Challenge",
    "success": {
      "fields": {
        "Body parameter": [
          {
            "group": "Body parameter",
            "type": "File",
            "optional": false,
            "field": "Image",
            "description": "<p>Challenge's map in jpeg/png format.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "Object",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Malformed request syntax.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          }
        ],
        "Error 415": [
          {
            "group": "Error 415",
            "type": "Object",
            "optional": false,
            "field": "UnsupportedMediaType",
            "description": "<p>File is not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"File is not found.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"The size of image is too big.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource 'Challenge' is not found.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 415 response:",
          "content": "HTTP/1.1 415 Unsupported Media Type\n\n{\n  \"error\": {\n    \"status\": \"UNSUPPORTED MEDIA TYPE\",\n    \"message\": \"The file's type is not supported on this server.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/ChallengeView.py",
    "groupTitle": "Challenge"
  },
  {
    "type": "put",
    "url": "/challenges/:id",
    "title": "Update a challenge",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Challenge's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "PutChallenge",
    "group": "Challenge",
    "success": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Challenge's name</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Challenge's description</p>"
          },
          {
            "group": "Body parameters",
            "type": "Date",
            "optional": false,
            "field": "end_date",
            "description": "<p>Challenge's end date in format &quot;YYYY-MM-DD&quot;</p>"
          },
          {
            "group": "Body parameters",
            "type": "Bool",
            "optional": false,
            "field": "alone_only",
            "description": "<p>If true user is the only person to participate in challenge, if false it is a team</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": false,
            "field": "level",
            "description": "<p>Challenge's difficulty</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": false,
            "field": "scalling",
            "description": "<p>Challenge's scale in meters</p>"
          },
          {
            "group": "Body parameters",
            "type": "Float",
            "optional": false,
            "field": "step_length",
            "description": "<p>Challenge's step length in meters</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": false,
            "field": "start_crossing_point_id",
            "description": "<p>ID of crossing point choosed as start of a challenge</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": false,
            "field": "end_crossing_point_id",
            "description": "<p>ID of end point choosed as end of a challenge</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body:",
          "content": "\n{\n  \"name\":\"A la recherche d'Aslan\",\n  \"description\":\"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous\",\n  \"end_date\":\"2022-10-18\",\n  \"alone_only\":0,\n  \"level\":3,\n  \"scalling\":10000,\n  \"step_length\": 0.7,\n  \"start_crossing_point_id\":1,\n  \"end_crossing_point_id\":2\n}",
          "type": "json"
        },
        {
          "title": "Success response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "Object",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Malformed request syntax.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"The given value {name} is already used as a challenge name.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'name': ['Field must not be null.']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'name': ['Invalid value']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Invalid isoformat string: '2022-10-'\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Challenge's end date must be greater of today's date (22-04-2021, 12:59)\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Crossing point does not exist.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/ChallengeView.py",
    "groupTitle": "Challenge"
  },
  {
    "type": "post",
    "url": "/challenges/:id/subscribe",
    "title": "User's subscription to a challenge",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Challenge's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.2.0",
    "name": "SubscribeChallenge",
    "group": "Challenge",
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "type": "Object",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Bad credentials.</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "Object",
            "optional": false,
            "field": "UnfinishedChallenge",
            "description": "<p>User's subscription to a unfinished challenge.</p>"
          },
          {
            "group": "Error 403",
            "type": "Object",
            "optional": false,
            "field": "ChallengesOwner",
            "description": "<p>User's subscription to a challenge that he has created.</p>"
          },
          {
            "group": "Error 403",
            "type": "Object",
            "optional": false,
            "field": "AlreadySubscribed",
            "description": "<p>User's subscription to a challenge that he has already subscribed.</p>"
          },
          {
            "group": "Error 403",
            "type": "Object",
            "optional": false,
            "field": "TerminatedChallenge",
            "description": "<p>User's subscription to a challenge that has already been terminated.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You cannot subscribe to a unfinished challenge.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You cannot subscribe to a challenge you have created.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You are already subscribed to this challenge.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You cannot subscribe to a challenge that has already been terminated.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/ChallengeView.py",
    "groupTitle": "Challenge"
  },
  {
    "type": "post",
    "url": "/challenges/:id/unsubscribe",
    "title": "User's unsubscription from a challenge",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Challenge's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.2.0",
    "name": "UnSubscribeChallenge",
    "group": "Challenge",
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "type": "Object",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Bad credentials.</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "Object",
            "optional": false,
            "field": "NotSubscribedChallenge",
            "description": "<p>User's unsubscription from a challenge that he is not subscribed to.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You cannot unsubscribe from a challenge that you are not subscribed to.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/ChallengeView.py",
    "groupTitle": "Challenge"
  },
  {
    "type": "post",
    "url": "/challenges/:id/verify",
    "title": "Verification of graph integrity",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Challenge's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.2.0",
    "name": "verifyChallenge",
    "group": "Challenge",
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"loop\": [\n      [\n          {\n              \"id\": 1,\n              \"name\": \"L'armoire\",\n              \"position_x\": 0.142,\n              \"position_y\": 0.324511\n          },\n          {\n              \"id\": 2,\n              \"name\": \"La passe du faune\",\n              \"position_x\": 0.524667,\n              \"position_y\": 0.335221\n          },\n          {\n              \"id\": 14,\n              \"name\": \"Crossing point\",\n              \"position_x\": 0.586207,\n              \"position_y\": 0.0824353\n          }\n      ]\n  ],\n  \"deadend\": [\n      {\n          \"id\": 14,\n          \"name\": \"Crossing point\",\n          \"position_x\": 0.586207,\n          \"position_y\": 0.0824353\n      }\n  ],\n  \"orphans\": [\n      {\n          \"id\": 14,\n          \"name\": \"Crossing point\",\n          \"position_x\": 0.586207,\n          \"position_y\": 0.0824353\n      }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "type": "Object",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Bad credentials.</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "Object",
            "optional": false,
            "field": "NotSubscribedChallenge",
            "description": "<p>User's unsubscription from a challenge that he is not subscribed to.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You cannot unsubscribe from a challenge that you are not subscribed to.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/ChallengeView.py",
    "groupTitle": "Challenge"
  },
  {
    "type": "delete",
    "url": "/challenges/:challenge_id/crossing-points/:id",
    "title": "Delete a crossing point",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "challenge_id",
            "description": "<p>Challenge's unique ID.</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Crossing point's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "DeleteCrossingPoint",
    "group": "CrossingPoint",
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "ChallengeNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>No crossing points were found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource 'Challenge' is not found.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/CrossingPointView.py",
    "groupTitle": "CrossingPoint"
  },
  {
    "type": "get",
    "url": "/challenges/:challenge_id/crossing-points/:id",
    "title": "Request a crossing-point informations of challenge's id",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "challenge_id",
            "description": "<p>Challenge's unique ID.</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Crossing point's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "GetCrossingPoint",
    "group": "CrossingPoint",
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Crossing point's ID</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Crossing point's name</p>"
          },
          {
            "group": "OK 200",
            "type": "Float",
            "optional": false,
            "field": "position_x",
            "description": "<p>Crossing point's position x on map</p>"
          },
          {
            "group": "OK 200",
            "type": "Float",
            "optional": false,
            "field": "position_y",
            "description": "<p>Crossing point's position y on map</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"id\": 1,\n  \"name\": \"La passe du faune\",\n  \"position_x\": 0.1,\n  \"position_y\": 0.1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "ChallengeNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>No crossing points were found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource 'Challenge' is not found.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/CrossingPointView.py",
    "groupTitle": "CrossingPoint"
  },
  {
    "type": "get",
    "url": "/challenges/:challenge_id/crossing-points",
    "title": "Request all crossing points informations of challenge's id.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "challenge_id",
            "description": "<p>Challenge's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "GetCrossingPoints",
    "group": "CrossingPoint",
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Array",
            "optional": false,
            "field": "CrossingPoints",
            "description": "<p>All crossing points created of challenge's id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"crossing_points\": [\n    {\n      \"id\": 1,\n      \"name\": \"L'armoire\",\n      \"position_x\": 0.1,\n      \"position_y\": 0.1\n    },\n    {\n      \"id\": 2,\n      \"name\": \"La passe du faune\",\n      \"position_x\": 0.1,\n      \"position_y\": 0.1\n    },\n    {\n      \"id\": 3,\n      \"name\": \"La passe du magicien\",\n      \"position_x\": 0.2,\n      \"position_y\": 0.4\n    },\n    {\n      \"id\": 4,\n      \"name\": \"Le carrousel des ours\",\n      \"position_x\": 0.3,\n      \"position_y\": 0.4\n    },\n    {\n      \"id\": 5,\n      \"name\": \"Le pont des centaures\",\n      \"position_x\": 0.3,\n      \"position_y\": 0.5\n    },\n    {\n      \"id\": 6,\n      \"name\": \"Le pont de la sorcière\",\n      \"position_x\": 0.2,\n      \"position_y\": 0.5\n    },\n    {\n      \"id\": 7,\n      \"name\": \"Le nid des griffons\",\n      \"position_x\": 0.2,\n      \"position_y\": 0.5\n    },\n    {\n      \"id\": 8,\n      \"name\": \"La table de pierre\",\n      \"position_x\": 0.2,\n      \"position_y\": 0.5\n    },\n    {\n      \"id\": 9,\n      \"name\": \"Cair Paravel\",\n      \"position_x\": 0.2,\n      \"position_y\": 0.5\n    },\n    {\n      \"id\": 10,\n      \"name\": \"Test4\",\n      \"position_x\": 13.0099,\n      \"position_y\": 87.1313\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "ChallengeNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>No crossing points were found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource 'Challenge' is not found.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/CrossingPointView.py",
    "groupTitle": "CrossingPoint"
  },
  {
    "type": "patch",
    "url": "/challenges/:challenge_id/crossing-points/:id",
    "title": "Partially modify a crossing point",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "challenge_id",
            "description": "<p>Challenge's unique ID.</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Crossing point's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "PatchCrossingPoint",
    "group": "CrossingPoint",
    "success": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Crossing point's name</p>"
          },
          {
            "group": "Body parameters",
            "type": "Float",
            "optional": false,
            "field": "position_x",
            "description": "<p>Crossing point's position x on map</p>"
          },
          {
            "group": "Body parameters",
            "type": "Float",
            "optional": false,
            "field": "position_y",
            "description": "<p>Crossing point's position y on map</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body:",
          "content": "\n{\n  \"name\": \"La passe du magicien\"\n}",
          "type": "json"
        },
        {
          "title": "Success response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "Object",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Malformed request syntax.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "ChallengeNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>No crossing points were found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'name': ['Field must not be null.']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'name': ['Invalid value']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource 'Challenge' is not found.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/CrossingPointView.py",
    "groupTitle": "CrossingPoint"
  },
  {
    "type": "post",
    "url": "/challenges/:challenge_id/crossing-points",
    "title": "Create a new Crossing point of challenge's id",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "challenge_id",
            "description": "<p>Challenge's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "PostCrossingPoint",
    "group": "CrossingPoint",
    "success": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Crossing point's name</p>"
          },
          {
            "group": "Body parameters",
            "type": "Float",
            "optional": false,
            "field": "position_x",
            "description": "<p>Crossing point's position x on map</p>"
          },
          {
            "group": "Body parameters",
            "type": "Float",
            "optional": false,
            "field": "position_y",
            "description": "<p>Crossing point's position y on map</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body:",
          "content": "\n{\n  \"name\": \"La passe du faune\",\n  \"position_x\": 0.1,\n  \"position_y\": 0.1\n}",
          "type": "json"
        },
        {
          "title": "Success response:",
          "content": "HTTP/1.1 201 Created\n\n{\n  \"id\": 1,\n  \"name\": \"La passe du faune\",\n  \"position_x\": 0.1,\n  \"position_y\": 0.1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "Object",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Malformed request syntax.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'name': ['Field must not be null.']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'name': ['Invalid value']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"The given value 'La passe du faune' is already used as a crossing point name for this challenge.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource 'Challenge' is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/CrossingPointView.py",
    "groupTitle": "CrossingPoint"
  },
  {
    "type": "put",
    "url": "/challenges/:challenge_id/crossing-points/:id",
    "title": "Update a crossing point",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "challenge_id",
            "description": "<p>Challenge's unique ID.</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Crossing point's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "PutCrossingPoint",
    "group": "CrossingPoint",
    "success": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Crossing point's name</p>"
          },
          {
            "group": "Body parameters",
            "type": "Float",
            "optional": false,
            "field": "position_x",
            "description": "<p>Crossing point's position x on map</p>"
          },
          {
            "group": "Body parameters",
            "type": "Float",
            "optional": false,
            "field": "position_y",
            "description": "<p>Crossing point's position y on map</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body:",
          "content": "\n{\n  \"name\": \"La passe du faune\",\n  \"position_x\": 0.1,\n  \"position_y\": 0.1\n}",
          "type": "json"
        },
        {
          "title": "Success response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "Object",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Malformed request syntax.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "ChallengeNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>No crossing points were found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'name': ['Field must not be null.']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'name': ['Invalid value']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource 'Challenge' is not found.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/CrossingPointView.py",
    "groupTitle": "CrossingPoint"
  },
  {
    "type": "delete",
    "url": "/challenges/:challenge_id/crossing-points/:id",
    "title": "Delete a segment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "challenge_id",
            "description": "<p>Challenge's unique ID.</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Segment's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "DeleteSegment",
    "group": "Segment",
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "ChallengeNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>No segments were found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource 'Challenge' is not found.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/SegmentView.py",
    "groupTitle": "Segment"
  },
  {
    "type": "get",
    "url": "/challenges/:challenge_id/segments/:id",
    "title": "Request a segment informations of challenge's id",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "challenge_id",
            "description": "<p>Challenge's unique ID.</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Segment's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "GetSegment",
    "group": "Segment",
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Segment's ID</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Segment's name</p>"
          },
          {
            "group": "OK 200",
            "type": "Object",
            "optional": false,
            "field": "start_crossing_point",
            "description": "<p>Segment's start crossing point</p>"
          },
          {
            "group": "OK 200",
            "type": "Object",
            "optional": false,
            "field": "end_crossing_point",
            "description": "<p>Segment's end crossing point</p>"
          },
          {
            "group": "OK 200",
            "type": "Array",
            "optional": false,
            "field": "coordinates",
            "description": "<p>Array of segment's coordinates</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n    \"id\": 1,\n    \"name\": \"A travers le bois d'entre les mondes\",\n    \"start_crossing_point\": {\n      \"id\": 1,\n      \"name\": \"L'armoire\",\n      \"position_x\": 0.1,\n      \"position_y\": 0.1\n    },\n    \"end_crossing_point\": {\n      \"id\": 2,\n      \"name\": \"La passe du faune\",\n      \"position_x\": 0.1,\n      \"position_y\": 0.1\n    },\n    \"coordinates\": [],\n    \"challenge\": {\n        \"id\": 1,\n        \"name\": \"A la recherche d'Aslan\",\n        \"description\": \"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous\",\n        \"end_date\": \"2020-03-18T00:00:00\",\n        \"alone_only\": null,\n        \"level\": \"1\",\n        \"scalling\": 4,\n        \"draft\": false,\n        \"start_crossing_point\": {\n            \"id\": 10,\n            \"name\": \"cr 1\",\n            \"position_x\": 0.417391,\n            \"position_y\": 0.207442\n        },\n        \"end_crossing_point\": {\n            \"id\": 12,\n            \"name\": \"cr 3\",\n            \"position_x\": 0.573043,\n            \"position_y\": 0.492283\n        },\n        \"admin\": {\n            \"id\": 1,\n            \"first_name\": \"Missy\",\n            \"last_name\": \"Of Gallifrey\",\n            \"pseudo\": \"Le maitre\",\n            \"email\": \"lemaitre@gmail.com\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "ChallengeNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>No segments were found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource 'Challenge' is not found.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/SegmentView.py",
    "groupTitle": "Segment"
  },
  {
    "type": "get",
    "url": "/challenges/:challenge_id/segments",
    "title": "Request all segments informations of challenge's id.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "challenge_id",
            "description": "<p>Challenge's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "GetSegments",
    "group": "Segment",
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Array",
            "optional": false,
            "field": "Segments",
            "description": "<p>All segments created of challenge's id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"segments\": [\n    {\n      \"id\": 1,\n      \"name\": \"A travers le bois d'entre les mondes\",\n      \"start_crossing_point\": {\n        \"id\": 1,\n        \"name\": \"L'armoire\",\n        \"position_x\": 0.1,\n        \"position_y\": 0.1\n      },\n      \"end_crossing_point\": {\n        \"id\": 2,\n        \"name\": \"La passe du faune\",\n        \"position_x\": 0.1,\n        \"position_y\": 0.1\n      },\n      \"coordinates\": [],\n      \"challenge\": {\n        \"id\": 1,\n        \"name\": \"A la recherche d'Aslan\",\n        \"description\": \"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous\",\n        \"end_date\": \"2020-03-18T00:00:00\",\n        \"alone_only\": null,\n        \"level\": \"1\",\n        \"scalling\": 4,\n        \"draft\": false,\n        \"start_crossing_point\": {\n          \"id\": 10,\n          \"name\": \"cr 1\",\n          \"position_x\": 0.417391,\n          \"position_y\": 0.207442\n        },\n        \"end_crossing_point\": {\n          \"id\": 12,\n          \"name\": \"cr 3\",\n          \"position_x\": 0.573043,\n          \"position_y\": 0.492283\n        },\n        \"admin\": {\n          \"id\": 1,\n          \"first_name\": \"Missy\",\n          \"last_name\": \"Of Gallifrey\",\n          \"pseudo\": \"Le maitre\",\n          \"email\": \"lemaitre@gmail.com\"\n        }\n      }\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "ChallengeNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>No segments were found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource 'Challenge' is not found.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/SegmentView.py",
    "groupTitle": "Segment"
  },
  {
    "type": "patch",
    "url": "/challenges/:challenge_id/segments/:id",
    "title": "Partially modify a segment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "challenge_id",
            "description": "<p>Challenge's unique ID.</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Segment's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "PatchSegment",
    "group": "Segment",
    "success": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Segment's name</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": false,
            "field": "start_crossing_point_id",
            "description": "<p>ID of crossing point choosed as start of a segment</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": false,
            "field": "end_crossing_point_id",
            "description": "<p>ID of crossing point choosed as end of a segment</p>"
          },
          {
            "group": "Body parameters",
            "type": "Array",
            "optional": false,
            "field": "coordinates",
            "description": "<p>Array of segment's coordinates</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body:",
          "content": "\n{\n  \"coordinates\":[\n    {\n      \"position_x\": 455,\n      \"position_y\": 465.125\n    },\n    {\n      \"position_x\": 567,\n      \"position_y\": 591.125\n    }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Success response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "Object",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Malformed request syntax.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "ChallengeNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>No segments were found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'name': ['Field must not be null.']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'name': ['Invalid value']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"The segment's coordinates must be of the type array.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"The coordinates must have x and y positions.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource 'Challenge' is not found.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/SegmentView.py",
    "groupTitle": "Segment"
  },
  {
    "type": "post",
    "url": "/challenges/:challenge_id/segments",
    "title": "Create a new segment of challenge's id.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "challenge_id",
            "description": "<p>Challenge's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "PostSegment",
    "group": "Segment",
    "success": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Segment's name</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": false,
            "field": "start_crossing_point_id",
            "description": "<p>ID of crossing point choosed as start of a segment</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": false,
            "field": "end_crossing_point_id",
            "description": "<p>ID of crossing point choosed as end of a segment</p>"
          },
          {
            "group": "Body parameters",
            "type": "Array",
            "optional": false,
            "field": "coordinates",
            "description": "<p>Array of segment's coordinates</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body:",
          "content": "\n{\n  \"name\": \"A travers le bois d'entre les mondes\",\n  \"start_crossing_point_id\":5,\n\"end_crossing_point_id\":6,\n  \"coordinates\":[\n    {\n      \"position_x\": 355,\n      \"position_y\": 365.125\n    },\n    {\n      \"position_x\": 300,\n      \"position_y\": 347.125\n    }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Success response:",
          "content": "HTTP/1.1 201 Created\n\n\n{\n    \"id\": 1,\n    \"name\": \"A travers le bois d'entre les mondes\",\n    \"start_crossing_point\": {\n      \"id\": 1,\n      \"name\": \"L'armoire\",\n      \"position_x\": 0.1,\n      \"position_y\": 0.1\n    },\n    \"end_crossing_point\": {\n      \"id\": 2,\n      \"name\": \"La passe du faune\",\n      \"position_x\": 0.1,\n      \"position_y\": 0.1\n    },\n    \"coordinates\": [\n      {\n        \"position_x\": 355,\n        \"position_y\": 365.125\n      },\n      {\n        \"position_x\": 300,\n        \"position_y\": 347.125\n      }\n    ],\n    \"challenge\": {\n        \"id\": 1,\n        \"name\": \"A la recherche d'Aslan\",\n        \"description\": \"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous\",\n        \"end_date\": \"2020-03-18T00:00:00\",\n        \"alone_only\": null,\n        \"level\": \"1\",\n        \"scalling\": 4,\n        \"draft\": false,\n        \"start_crossing_point\": {\n            \"id\": 10,\n            \"name\": \"cr 1\",\n            \"position_x\": 0.417391,\n            \"position_y\": 0.207442\n        },\n        \"end_crossing_point\": {\n            \"id\": 12,\n            \"name\": \"cr 3\",\n            \"position_x\": 0.573043,\n            \"position_y\": 0.492283\n        },\n        \"admin\": {\n            \"id\": 1,\n            \"first_name\": \"Missy\",\n            \"last_name\": \"Of Gallifrey\",\n            \"pseudo\": \"Le maitre\",\n            \"email\": \"lemaitre@gmail.com\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "Object",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Malformed request syntax.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "ChallengeNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>No segments were found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"The segment's coordinates must be of the type array.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"The coordinates must have x and y positions.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource 'Challenge' is not found.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/SegmentView.py",
    "groupTitle": "Segment"
  },
  {
    "type": "put",
    "url": "/challenges/:challenge_id/segments/:id",
    "title": "Update a segment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "challenge_id",
            "description": "<p>Challenge's unique ID.</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Segment's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "PutSegment",
    "group": "Segment",
    "success": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Segment's name</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": false,
            "field": "start_crossing_point_id",
            "description": "<p>ID of crossing point choosed as start of a segment</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": false,
            "field": "end_crossing_point_id",
            "description": "<p>ID of crossing point choosed as end of a segment</p>"
          },
          {
            "group": "Body parameters",
            "type": "Array",
            "optional": false,
            "field": "coordinates",
            "description": "<p>Array of segment's coordinates</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body:",
          "content": "\n{\n  \"name\": \"A travers le bois d'entre les mondes\",\n  \"start_crossing_point_id\":5,\n\"end_crossing_point_id\":6,\n  \"coordinates\":[\n    {\n      \"position_x\": 355,\n      \"position_y\": 365.125\n    },\n    {\n      \"position_x\": 300,\n      \"position_y\": 347.125\n    }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Success response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "Object",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Malformed request syntax.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "ChallengeNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>No segments were found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'name': ['Field must not be null.']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'name': ['Invalid value']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"The segment's coordinates must be of the type array.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"The coordinates must have x and y positions.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource 'Challenge' is not found.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/SegmentView.py",
    "groupTitle": "Segment"
  }
] });
