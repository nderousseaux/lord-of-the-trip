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
          "content": "\n{\n  \"email\":\"lemaitre@gmail.com\",\n  \"password\":\"Conquérantdelunivers\"\n}",
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
          "content": "\n{\n  \"first_name\":\"Missy\",\n  \"last_name\":\"Of Gallifrey\",\n  \"pseudo\":\"LeMaitre\",\n  \"email\":\"lemaitre@gmail.com\",\n  \"password\":\"Conquérantdelunivers\"\n}",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
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
    "type": "get",
    "url": "/admin/challenges",
    "title": "Request all challenges that were created by user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Challenge's unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Bool",
            "optional": true,
            "field": "draft",
            "defaultValue": "true",
            "description": "<p>Status of the challenge</p>"
          }
        ]
      }
    },
    "version": "0.3.0",
    "name": "AdminChallenges",
    "group": "Challenge",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Array",
            "optional": false,
            "field": "Challenges",
            "description": "<p>All challenges created by user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"challenges\": [\n    {\n      \"id\": 1,\n      \"name\": \"A la recherche d'Aslan\",\n      \"description\": \"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous\",\n      \"start_date\": \"2021-05-27T10:12:52\",\n      \"end_date\": \"2021-03-18T12:00:00\",\n      \"level\": \"1\",\n      \"scalling\": 2,\n      \"step_length\": 0.7,\n      \"draft\": true,\n      \"start_crossing_point_id\": 1,\n      \"end_crossing_point_id\": 1,\n      \"nb_subscribers\": 12\n    },\n    {\n      \"id\": 2,\n      \"name\": \"Oops, on a perdu Han Solo\",\n      \"description\": \"Leia Organa, Lando Calrissian et le reste de l'équipe ont merdé et ont été capturé par Jabba le Hutt. Les services secrets de la résistance ont trouvé le lieu ou ils sont tenus captifs. Il te faut donc jeune padawan allait sauver tout ce beau monde, et fissa car la lutte n'attends pas\",\n      \"start_date\": \"2021-05-27T10:12:52\",\n      \"end_date\": \"2022-03-18T18:30:00\",\n      \"level\": \"2\",\n      \"scalling\": 4200,\n      \"step_length\": 0.8,\n      \"draft\": true,\n      \"start_crossing_point_id\": 4,\n      \"end_crossing_point_id\": 5,\n      \"nb_subscribers\": 12\n    }\n  ]\n}",
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
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/ChallengeView.py",
    "groupTitle": "Challenge"
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
            "type": "Number",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
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
        "Error 403": [
          {
            "group": "Error 403",
            "type": "Object",
            "optional": false,
            "field": "PublishedChallenge",
            "description": "<p>Modification of a published challenge</p>"
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
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to perform this action using the credentials that you supplied.\"\n  }\n}",
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
    "url": "/challenges/:id/duplicate",
    "title": "Duplication of challenge",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Challenge's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.2.0",
    "name": "DuplicateChallenge",
    "group": "Challenge",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"id\": 47,\n  \"name\": \"A la recherche d'Aslan *2\",\n  \"description\": \"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous\",\n  \"start_date\": \"2021-05-27T10:12:52\",\n  \"end_date\": \"2021-03-18T12:00:00\",\n  \"level\": \"1\",\n  \"scalling\": 2,\n  \"step_length\": 0.7,\n  \"draft\": true,\n  \"start_crossing_point_id\": 364,\n  \"end_crossing_point_id\": 365\n}",
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
            "field": "UserNotOwner",
            "description": "<p>Duplication of challenge that user is not creator of.</p>"
          },
          {
            "group": "Error 403",
            "type": "Object",
            "optional": false,
            "field": "PermanentChallenge",
            "description": "<p>Duplication of a permanent challenge.</p>"
          },
          {
            "group": "Error 403",
            "type": "Object",
            "optional": false,
            "field": "ChallengeNotTerminated",
            "description": "<p>Duplication of challenge that is not terminated yet.</p>"
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
        "Error 422": [
          {
            "group": "Error 422",
            "type": "Object",
            "optional": false,
            "field": "ErrorOnCreation",
            "description": "<p>Informations were missing during challenge duplication.</p>"
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
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to duplicate a challenge that you did not create.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to duplicate a permanent challenge.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to duplicate a challenge that hasn't been terminated yet.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 422 response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n\n{\n  \"error\": {\n    \"status\": \"UNPROCESSABLE ENTITY\",\n    \"message\": \"Challenge's start and end crossing points were missing.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 422 response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n\n{\n  \"error\": {\n    \"status\": \"UNPROCESSABLE ENTITY\",\n    \"message\": \"Segment's start and end crossing points were missing.\"\n  }\n}",
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
            "type": "Number",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
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
            "description": "<p>Challenge's start date</p>"
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
            "type": "Number",
            "optional": false,
            "field": "start_crossing_point_id",
            "description": "<p>ID of crossing point choosed as start of a challenge</p>"
          },
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "end_crossing_point_id",
            "description": "<p>ID of crossing point choosed as start of a challenge</p>"
          },
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "nb_subscribers",
            "description": "<p>Number of users subscribed to a challenge</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"id\": 1,\n  \"name\": \"A la recherche d'Aslan\",\n  \"description\": \"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous\",\n  \"start_date\": \"2021-12-18T03:16:00\",\n  \"end_date\": \"2022-10-18T03:16:00\",\n  \"level\":3,\n  \"scalling\": 1000,\n  \"step_length\": 0.7,\n  \"draft\": false,\n  \"start_crossing_point_id\": null,\n  \"end_crossing_point_id\": null,\n  \"nb_subscribers\": 12\n}",
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
            "field": "PermissionDenied",
            "description": "<p>User is not challenge's admin or challenge's is not published yet</p>"
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
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to view this resource using the credentials that you supplied.\"\n  }\n}",
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
            "type": "Number",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
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
            "field": "UserNotAdmin",
            "description": "<p>User is not super admin</p>"
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
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to view this resource using the credentials that you supplied.\"\n  }\n}",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Bool",
            "optional": true,
            "field": "draft",
            "defaultValue": "False",
            "description": "<p>Status of the challenge</p>"
          }
        ]
      }
    },
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
          "content": "HTTP/1.1 200 OK\n\n{\n  \"challenges\": [\n    {\n      \"id\": 1,\n      \"name\": \"A la recherche d'Aslan\",\n      \"description\": \"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous\",\n      \"start_date\": \"2021-05-27T10:12:52\",\n      \"end_date\": \"2021-03-18T12:00:00\",\n      \"level\": \"1\",\n      \"scalling\": 2,\n      \"step_length\": 0.7,\n      \"draft\": true,\n      \"start_crossing_point_id\": 1,\n      \"end_crossing_point_id\": 1,\n      \"nb_subscribers\": 12\n    },\n    {\n      \"id\": 2,\n      \"name\": \"Oops, on a perdu Han Solo\",\n      \"description\": \"Leia Organa, Lando Calrissian et le reste de l'équipe ont merdé et ont été capturé par Jabba le Hutt. Les services secrets de la résistance ont trouvé le lieu ou ils sont tenus captifs. Il te faut donc jeune padawan allait sauver tout ce beau monde, et fissa car la lutte n'attends pas\",\n      \"start_date\": \"2021-05-27T10:12:52\",\n      \"end_date\": \"2022-03-18T18:30:00\",\n      \"level\": \"2\",\n      \"scalling\": 4200,\n      \"step_length\": 0.8,\n      \"draft\": true,\n      \"start_crossing_point_id\": 4,\n      \"end_crossing_point_id\": 5,\n      \"nb_subscribers\": 12\n    }\n  ]\n}",
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
            "field": "UserNotAdmin",
            "description": "<p>User is not super administrator</p>"
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
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to view this resource using the credentials that you supplied.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/ChallengeView.py",
    "groupTitle": "Challenge"
  },
  {
    "type": "get",
    "url": "/challenges/:id/image-mobile",
    "title": "Request a challenge's map for mobile client",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Challenge's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.2.0",
    "name": "ImageMobile",
    "group": "Challenge",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Base64",
            "optional": false,
            "field": "Image",
            "description": "<p>Challenge's jpeg/png map in base64 format.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK",
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
            "field": "UserNotAdmin",
            "description": "<p>User is not super admin</p>"
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
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to view this resource using the credentials that you supplied.\"\n  }\n}",
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
    "type": "patch",
    "url": "/challenges/:id",
    "title": "Partially modify a challenge",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
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
            "optional": true,
            "field": "description",
            "description": "<p>Challenge's description</p>"
          },
          {
            "group": "Body parameters",
            "type": "Date",
            "optional": true,
            "field": "start_date",
            "description": "<p>Challenge's start date in format &quot;YYYY-MM-DD&quot;</p>"
          },
          {
            "group": "Body parameters",
            "type": "Date",
            "optional": true,
            "field": "end_date",
            "description": "<p>Challenge's end date in format &quot;YYYY-MM-DD&quot;</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": true,
            "field": "level",
            "description": "<p>Challenge's difficulty</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": true,
            "field": "scalling",
            "description": "<p>Challenge's scale in meters</p>"
          },
          {
            "group": "Body parameters",
            "type": "Float",
            "optional": true,
            "field": "step_length",
            "description": "<p>Challenge's step length in meters</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": true,
            "field": "start_crossing_point_id",
            "description": "<p>ID of crossing point choosed as start of a challenge</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": true,
            "field": "end_crossing_point_id",
            "description": "<p>ID of end point choosed as end of a challenge</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body:",
          "content": "\n{\n  \"step_length\": 0.8\n}",
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
            "field": "UserNotAdmin",
            "description": "<p>User is not administrator</p>"
          },
          {
            "group": "Error 403",
            "type": "Object",
            "optional": false,
            "field": "DraftField",
            "description": "<p>Draft field in JSON body</p>"
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
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Challenge's start date must be greater of today's date (22-04-2021, 12:59)\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Challenge's end date must be greater of today's date (22-04-2021, 12:59)\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Challenge's start and end date must be greater of today's date (22-04-2021, 12:59)\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"This value (-2) is not valid for scalling.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Start crossing point does not exist.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"End crossing point does not exist.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Nothing to update.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"The field level must contain value 1, 2 or 3\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"The value (0.2) is not valid for step length.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to perform this action using the credentials that you supplied.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"The field draft is not used on challenge's creation.\"\n  }\n}",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
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
            "optional": true,
            "field": "description",
            "description": "<p>Challenge's description</p>"
          },
          {
            "group": "Body parameters",
            "type": "Date",
            "optional": true,
            "field": "start_date",
            "description": "<p>Challenge's start date in format &quot;YYYY-MM-DD&quot;</p>"
          },
          {
            "group": "Body parameters",
            "type": "Date",
            "optional": true,
            "field": "end_date",
            "description": "<p>Challenge's end date in format &quot;YYYY-MM-DD&quot;</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": true,
            "field": "level",
            "description": "<p>Challenge's difficulty</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": true,
            "field": "scalling",
            "description": "<p>Challenge's scale in meters</p>"
          },
          {
            "group": "Body parameters",
            "type": "Float",
            "optional": true,
            "field": "step_length",
            "description": "<p>Challenge's step length in meters</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body:",
          "content": "\n{\n  \"name\":\"A la recherche d'Aslan\",\n  \"description\":\"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous\",\n  \"start_date\":\"2021-12-18\",\n  \"end_date\":\"2022-10-18\",\n  \"level\":3,\n  \"scalling\":10000,\n  \"step_length\": 0.7\n}",
          "type": "json"
        },
        {
          "title": "Success response:",
          "content": "HTTP/1.1 201 Created\n\n{\n  \"id\": 1,\n  \"name\": \"A la recherche d'Aslan\",\n  \"description\": \"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous\",\n  \"start_date\": \"2021-12-18T03:16:00\",\n  \"end_date\": \"2022-10-18T03:16:00\",\n  \"level\":3,\n  \"scalling\": 1000,\n  \"step_length\": 0.7,\n  \"draft\": false,\n  \"start_crossing_point_id\": null,\n  \"end_crossing_point_id\": null\n}",
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
            "field": "UserNotAdmin",
            "description": "<p>User is not administrator</p>"
          },
          {
            "group": "Error 403",
            "type": "Object",
            "optional": false,
            "field": "DraftField",
            "description": "<p>Draft field in JSON body</p>"
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
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Challenge's start date must be greater of today's date (22-04-2021, 12:59)\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Challenge's end date must be greater of today's date (22-04-2021, 12:59)\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Challenge's start and end date must be greater of today's date (22-04-2021, 12:59)\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"This value (-2) is not valid for scalling.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"The field level must contain value 1, 2 or 3\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"The value (0.2) is not valid for step length.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to perform this action using the credentials that you supplied.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"The field draft is not used on challenge's creation.\"\n  }\n}",
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
            "type": "Number",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
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
            "field": "PublishedChallenge",
            "description": "<p>Modification of a published challenge</p>"
          },
          {
            "group": "Error 403",
            "type": "Object",
            "optional": false,
            "field": "UserNotAdmin",
            "description": "<p>User is not administrator</p>"
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
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"The file's type is not supported on this server.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to modify a published challenge.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to perform this action using the credentials that you supplied.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
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
    "type": "patch",
    "url": "/challenges/:id/publish",
    "title": "Publication of challenge",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Challenge's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.3.0",
    "name": "PublishChallenge",
    "group": "Challenge",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
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
            "field": "ChallengeStartDateAlreadyPassed",
            "description": "<p>Publication of a challenge whose start date has already passed.</p>"
          },
          {
            "group": "Error 403",
            "type": "Object",
            "optional": false,
            "field": "ChallengeEndDateAlreadyPassed",
            "description": "<p>Publication of a challenge whose end date has already passed.</p>"
          },
          {
            "group": "Error 403",
            "type": "Object",
            "optional": false,
            "field": "ChallengeHasNoDescription",
            "description": "<p>Publication of a challenge with no description.</p>"
          },
          {
            "group": "Error 403",
            "type": "Object",
            "optional": false,
            "field": "ChallengeAlreadyPublished",
            "description": "<p>Publication of a challenge that has already been challenged.</p>"
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
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to publish a challenge whose start date has already passed (10-05-2021, 19:04).\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to publish a challenge whose end date has already passed (10-05-2021, 19:04).\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to publish a challenge that has no description.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to publish the challenge that has already been published.\"\n  }\n}",
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
    "type": "put",
    "url": "/challenges/:id",
    "title": "Update a challenge",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
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
            "optional": true,
            "field": "description",
            "description": "<p>Challenge's description</p>"
          },
          {
            "group": "Body parameters",
            "type": "Date",
            "optional": true,
            "field": "start_date",
            "description": "<p>Challenge's start date in format &quot;YYYY-MM-DD&quot;</p>"
          },
          {
            "group": "Body parameters",
            "type": "Date",
            "optional": true,
            "field": "end_date",
            "description": "<p>Challenge's end date in format &quot;YYYY-MM-DD&quot;</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": true,
            "field": "level",
            "description": "<p>Challenge's difficulty</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": true,
            "field": "scalling",
            "description": "<p>Challenge's scale in meters</p>"
          },
          {
            "group": "Body parameters",
            "type": "Float",
            "optional": true,
            "field": "step_length",
            "description": "<p>Challenge's step length in meters</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": true,
            "field": "start_crossing_point_id",
            "description": "<p>ID of crossing point choosed as start of a challenge</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": true,
            "field": "end_crossing_point_id",
            "description": "<p>ID of end point choosed as end of a challenge</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body:",
          "content": "\n{\n  \"name\":\"A la recherche d'Aslan\",\n  \"description\":\"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous\",\n  \"start_date\":\"2021-12-18\",\n  \"end_date\":\"2022-10-18\",\n  \"level\":3,\n  \"scalling\":10000,\n  \"step_length\": 0.7\n}",
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
            "field": "UserNotAdmin",
            "description": "<p>User is not administrator</p>"
          },
          {
            "group": "Error 403",
            "type": "Object",
            "optional": false,
            "field": "PublishedChallenge",
            "description": "<p>Modification of a published challenge</p>"
          },
          {
            "group": "Error 403",
            "type": "Object",
            "optional": false,
            "field": "DraftField",
            "description": "<p>Draft field in JSON body</p>"
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
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Challenge's start date must be greater of today's date (22-04-2021, 12:59)\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Challenge's end date must be greater of today's date (22-04-2021, 12:59)\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Challenge's start and end date must be greater of today's date (22-04-2021, 12:59)\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"This value (-2) is not valid for scalling.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Start crossing point does not exist.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"End crossing point does not exist.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Nothing to update.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"The field level must contain value 1, 2 or 3\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"The value (0.2) is not valid for step length.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to perform this action using the credentials that you supplied.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to modify a published challenge.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"The field draft is not used on challenge's creation.\"\n  }\n}",
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
            "type": "Number",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
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
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to subscribe to a unfinished challenge.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to subscribe to a challenge you have created.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You are already subscribed to this challenge.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to a challenge that has already been terminated.\"\n  }\n}",
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
            "type": "Number",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
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
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to unsubscribe from a challenge that you are not subscribed to.\"\n  }\n}",
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
    "type": "patch",
    "url": "/challenges/:id/revoke",
    "title": "Revoke one challenge",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Challenge's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.3.0",
    "name": "UnpublishChallenge",
    "group": "Challenge",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
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
            "field": "ChallengeAlreadyUnpublished",
            "description": "<p>Unpublish a challenge that has already been unpublished.</p>"
          },
          {
            "group": "Error 403",
            "type": "Object",
            "optional": false,
            "field": "ChallengeAlreadyStarted",
            "description": "<p>Unpublish a challenge that has already subscribed users.</p>"
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
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to unpublish the challenge that has already been unpublished.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to unpublish challenge that has already subscribed users.\"\n  }\n}",
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
    "url": "/user/challenges",
    "title": "Request all challenges where user is subscribed or not subscribed to",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Challenge's unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Bool",
            "optional": true,
            "field": "subscribed",
            "defaultValue": "true",
            "description": "<p>Status of the challenge</p>"
          }
        ]
      }
    },
    "version": "0.3.0",
    "name": "UserChallenges",
    "group": "Challenge",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Array",
            "optional": false,
            "field": "Challenges",
            "description": "<p>All challenges where user is subscribed to</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"challenges\": [\n    {\n      \"id\": 1,\n      \"name\": \"A la recherche d'Aslan\",\n      \"description\": \"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous\",\n      \"start_date\": \"2021-05-27T10:12:52\",\n      \"end_date\": \"2021-03-18T12:00:00\",\n      \"level\": \"1\",\n      \"scalling\": 2,\n      \"step_length\": 0.7,\n      \"draft\": true,\n      \"start_crossing_point_id\": 1,\n      \"end_crossing_point_id\": 1,\n      \"nb_subscribers\": 12\n    },\n    {\n      \"id\": 2,\n      \"name\": \"Oops, on a perdu Han Solo\",\n      \"description\": \"Leia Organa, Lando Calrissian et le reste de l'équipe ont merdé et ont été capturé par Jabba le Hutt. Les services secrets de la résistance ont trouvé le lieu ou ils sont tenus captifs. Il te faut donc jeune padawan allait sauver tout ce beau monde, et fissa car la lutte n'attends pas\",\n      \"start_date\": \"2021-05-27T10:12:52\",\n      \"end_date\": \"2022-03-18T18:30:00\",\n      \"level\": \"2\",\n      \"scalling\": 4200,\n      \"step_length\": 0.8,\n      \"draft\": true,\n      \"start_crossing_point_id\": 4,\n      \"end_crossing_point_id\": 5,\n      \"nb_subscribers\": 12\n    }\n  ]\n}",
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
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Challenge's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.2.0",
    "name": "VerifyChallenge",
    "group": "Challenge",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 No Content",
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
            "description": "<p>Start crossing point is missing.</p>"
          }
        ],
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
            "field": "ModifyPublishedChallenge",
            "description": "<p>Verification of graph if challenge is already published</p>"
          },
          {
            "group": "Error 403",
            "type": "Object",
            "optional": false,
            "field": "PublishedChallenge",
            "description": "<p>Modification of a published challenge</p>"
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
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Start crossing point is missing.\",\n    \"details\": {\n      \"start_crossing_point_id\": null\n    }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"End crossing point is missing.\",\n    \"details\": {\n      \"end_crossing_point_id\": null\n    }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"Errors in challenge routing.\",\n    \"details\": {\n      \"loop\": [\n          [\n              {\n                  \"id\": 1,\n                  \"name\": \"L'armoire\",\n                  \"position_x\": 0.142,\n                  \"position_y\": 0.324511\n              },\n              {\n                  \"id\": 2,\n                  \"name\": \"La passe du faune\",\n                  \"position_x\": 0.524667,\n                  \"position_y\": 0.335221\n              },\n              {\n                  \"id\": 14,\n                  \"name\": \"Crossing point\",\n                  \"position_x\": 0.586207,\n                  \"position_y\": 0.0824353\n              }\n          ]\n      ],\n      \"deadend\": [\n          {\n              \"id\": 14,\n              \"name\": \"Crossing point\",\n              \"position_x\": 0.586207,\n              \"position_y\": 0.0824353\n          }\n      ],\n      \"orphans\": [\n          {\n              \"id\": 14,\n              \"name\": \"Crossing point\",\n              \"position_x\": 0.586207,\n              \"position_y\": 0.0824353\n          }\n      ]\n    }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to unsubscribe from a challenge that you are not subscribed to.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to modify a published challenge.\"\n  }\n}",
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
    "url": "/crossing-points/:id",
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
            "type": "Number",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
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
            "field": "UserNotAdmin",
            "description": "<p>User is not administrator</p>"
          }
        ],
        "Error 404": [
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
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to perform this action using the credentials that you supplied.\"\n  }\n}",
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
            "type": "Number",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
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
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n  }\n}",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
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
          "content": "HTTP/1.1 200 OK\n\n{\n  \"crossing_points\": [\n    {\n      \"id\": 1,\n      \"name\": \"L'armoire\",\n      \"position_x\": 0.1,\n      \"position_y\": 0.1\n    },\n    {\n      \"id\": 2,\n      \"name\": \"La passe du faune\",\n      \"position_x\": 0.1,\n      \"position_y\": 0.1\n    },\n    {\n      \"id\": 3,id\n    },\n    {\n      \"id\": 4,\n      \"name\": \"Le carrousel des ours\",\n      \"position_x\": 0.3,\n      \"position_y\": 0.4\n    },\n    {\n      \"id\": 5,\n      \"name\": \"Le pont des centaures\",\n      \"position_x\": 0.3,\n      \"position_y\": 0.5\n    },\n    {\n      \"id\": 6,\n      \"name\": \"Le pont de la sorcière\",\n      \"position_x\": 0.2,\n      \"position_y\": 0.5\n    },\n    {\n      \"id\": 7,\n      \"name\": \"Le nid des griffons\",\n      \"position_x\": 0.2,\n      \"position_y\": 0.5\n    },\n    {\n      \"id\": 8,\n      \"name\": \"La table de pierre\",\n      \"position_x\": 0.2,\n      \"position_y\": 0.5\n    },\n    {\n      \"id\": 9,\n      \"name\": \"Cair Paravel\",\n      \"position_x\": 0.2,\n      \"position_y\": 0.5\n    },\n    {\n      \"id\": 10,\n      \"name\": \"Test4\",\n      \"position_x\": 13.0099,\n      \"position_y\": 87.1313\n    }\n  ]\n}",
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
            "field": "PermissionDenied",
            "description": "<p>User is not challenge's admin or challenge's is not published yet</p>"
          }
        ],
        "Error 404": [
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
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to view this resource using the credentials that you supplied.\"\n  }\n}",
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
    "url": "/crossing-points/:id",
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
            "type": "Number",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
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
            "field": "UserNotAdmin",
            "description": "<p>User is not administrator</p>"
          }
        ],
        "Error 404": [
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
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to perform this action using the credentials that you supplied.\"\n  }\n}",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
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
            "field": "PublishedChallenge",
            "description": "<p>Modification of a published challenge</p>"
          },
          {
            "group": "Error 403",
            "type": "Object",
            "optional": false,
            "field": "UserNotAdmin",
            "description": "<p>User is not administrator</p>"
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
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to modify a published challenge.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to perform this action using the credentials that you supplied.\"\n  }\n}",
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
    "url": "/crossing-points/:id",
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
            "type": "Number",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
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
            "field": "UserNotAdmin",
            "description": "<p>User is not administrator</p>"
          }
        ],
        "Error 404": [
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
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to perform this action using the credentials that you supplied.\"\n  }\n}",
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
    "url": "/challenges/:challenge_id/events/distance",
    "title": "Request sum of distance events for challenge's id.",
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
    "version": "0.3.0",
    "name": "GetDistanceEventChallenge",
    "group": "Event",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "Distance",
            "description": "<p>Sum of distance events.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"distance\": 6162\n}",
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
            "description": "<p>No events were found.</p>"
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
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/EventView.py",
    "groupTitle": "Event"
  },
  {
    "type": "get",
    "url": "/segments/:challenge_id/events/distance",
    "title": "Request sum of distance events for segments's id.",
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
    "version": "0.3.0",
    "name": "GetDistanceEventSegment",
    "group": "Event",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "Distance",
            "description": "<p>Sum of distance events.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"distance\": 483\n}",
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
            "description": "<p>No events were found.</p>"
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
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/EventView.py",
    "groupTitle": "Event"
  },
  {
    "type": "get",
    "url": "/challenges/:challenge_id/events",
    "title": "Request events informations of challenge's id.",
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
    "version": "0.3.0",
    "name": "GetEvents",
    "group": "Event",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Array",
            "optional": false,
            "field": "Events",
            "description": "<p>All events created of challenge's id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"events\": [\n      {\n      \"id\": 1013,\n      \"segment_id\": 195,\n      \"duration\": 11864,\n      \"move_type\": 1,\n      \"event_type_id\": 3,\n      \"event_type_info\": {\n          \"id\": 3,\n          \"code\": \"MOVE\",\n          \"label\": \"Déplacement\"\n      },\n      \"event_date\": \"2021-06-18T18:58:11\",\n      \"distance\": 8,\n      \"footstep\": null,\n      \"obstacle_id\": null,\n      \"response\": null\n      },\n      {\n      \"id\": 1010,\n      \"segment_id\": 195,\n      \"duration\": 1234748,\n      \"move_type\": 1,\n      \"event_type_id\": 3,\n      \"event_type_info\": {\n          \"id\": 3,\n          \"code\": \"MOVE\",\n          \"label\": \"Déplacement\"\n      },\n      \"event_date\": \"2021-06-18T15:46:36\",\n      \"distance\": 6154,\n      \"footstep\": null,\n      \"obstacle_id\": null,\n      \"response\": null\n      },\n      {\n      \"id\": 981,\n      \"segment_id\": 195,\n      \"duration\": null,\n      \"move_type\": null,\n      \"event_type_id\": 1,\n      \"event_type_info\": {\n          \"id\": 1,\n          \"code\": \"START\",\n          \"label\": \"Départ du parcours\"\n      },\n      \"event_date\": \"2021-06-18T15:25:59\",\n      \"distance\": null,\n      \"footstep\": null,\n      \"obstacle_id\": null,\n      \"response\": null\n      }\n  ]\n}",
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
            "description": "<p>No events were found.</p>"
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
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/EventView.py",
    "groupTitle": "Event"
  },
  {
    "type": "get",
    "url": "/admin/verified-responses",
    "title": "All responses sent by users to be verified by user.",
    "version": "0.3.0",
    "name": "GetEvents",
    "group": "Event",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Array",
            "optional": false,
            "field": "Events",
            "description": "<p>All events to be verified.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"events\": [\n    {\n      \"id\": 44,\n      \"response\": null,\n      \"challenge\": {\n      \"id\": 13,\n      \"name\": \"Narnia\"\n    },\n    \"obstacle\": {\n      \"label\": \"Photo\",\n      \"description\": \"Une photo\"\n    }\n  ]\n}",
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
            "field": "UserNotAdmin",
            "description": "<p>User is not admin</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>No events were found.</p>"
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
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to view this resource using the credentials that you supplied.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/EventView.py",
    "groupTitle": "Event"
  },
  {
    "type": "get",
    "url": "/challenges/:challenge_id/events/last",
    "title": "Request last event that user cretaed of challenge's id.",
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
    "version": "0.3.0",
    "name": "GetLastEvent",
    "group": "Event",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Object",
            "optional": false,
            "field": "Event",
            "description": "<p>Last event created by user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"id\": 1013,\n  \"segment_id\": 195,\n  \"duration\": 11864,\n  \"move_type\": 1,\n  \"event_type_id\": 3,\n  \"event_type_info\": {\n      \"id\": 3,\n      \"code\": \"MOVE\",\n      \"label\": \"Déplacement\"\n  },\n  \"event_date\": \"2021-06-18T18:58:11\",\n  \"distance\": 8,\n  \"footstep\": null,\n  \"obstacle_id\": null,\n  \"response\": null\n }",
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
            "description": "<p>No events were found.</p>"
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
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/EventView.py",
    "groupTitle": "Event"
  },
  {
    "type": "post",
    "url": "/events/:id/manage-response",
    "title": "Manage response sent by user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Event's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.3.0",
    "name": "ManageResponse",
    "group": "Event",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "Bool",
            "optional": false,
            "field": "validate",
            "description": "<p>A true or false to validate the response sent by user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 204 No Content.",
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
            "description": "<p>No events were found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n      \"status\": \"BAD REQUEST\",\n      \"message\": \"Field 'validate' is a mandatory field.\"\n  }\n}",
          "type": "json"
        },
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
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/EventView.py",
    "groupTitle": "Event"
  },
  {
    "type": "post",
    "url": "/challenges/:challenge_id/segments/:segment_id/events",
    "title": "Create a new event for segment id.",
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
            "field": "segment_id",
            "description": "<p>Segment's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.3.0",
    "name": "PostEvents",
    "group": "Event",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Object",
            "optional": false,
            "field": "Created",
            "description": "<p>event.</p>"
          }
        ],
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": false,
            "field": "event_type_id",
            "description": "<p>Event type's id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 201 Created\n\n{\n  \"event_type_id\":4\n}",
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
            "description": "<p>No events were found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n      \"status\": \"BAD REQUEST\",\n      \"message\": \"{'event_type_id': ['Field must not be null.']}\"\n  }\n}",
          "type": "json"
        },
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
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/EventView.py",
    "groupTitle": "Event"
  },
  {
    "type": "get",
    "url": "/event-types/:id",
    "title": "Request all event types",
    "version": "0.3.0",
    "name": "GetEventType",
    "group": "EventTypes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Array",
            "optional": false,
            "field": "EventTypes",
            "description": "<p>All event types created.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "  HTTP/1.1 200 OK\n\n{\n  \"event-types\": [\n    {\n      \"id\": 1,\n      \"code\": \"START\",\n      \"label\": \"Départ du parcours\"\n    },\n    {\n      \"id\": 2,\n      \"code\": \"ARRIVAL\",\n      \"label\": \"Arrivée à la fin du parcours\"\n    },\n    {\n      \"id\": 3,\n      \"code\": \"MOVE\",\n      \"label\": \"Déplacement\"\n    },\n    {\n      \"id\": 4,\n      \"code\": \"OBSTACLE_ARR\",\n      \"label\": \"Arrivée sur un obstacle\"\n    },\n    {\n      \"id\": 5,\n      \"code\": \"OBSTACLE_REP\",\n      \"label\": \"Réponse à un obstacle\"\n    },\n    {\n      \"id\": 6,\n      \"code\": \"OBSTACLE_REP_OK\",\n      \"label\": \"Réponse validée\"\n    },\n    {\n      \"id\": 7,\n      \"code\": \"OBSTACLE_REP_KO\",\n      \"label\": \"Refus de la réponse par un administrateur ou par le système\"\n    },\n    {\n      \"id\": 8,\n      \"code\": \"CROSS_PT_ARRIVAL\",\n      \"label\": \"Arrivée à un point de passage\"\n    },\n    {\n      \"id\": 9,\n      \"code\": \"CHOOSE_SEGMENT\",\n      \"label\": \"Choix d'un segment\"\n    }\n  ]\n}",
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
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/EventTypeView.py",
    "groupTitle": "EventTypes"
  },
  {
    "type": "get",
    "url": "/event-types",
    "title": "Request all event types",
    "version": "0.3.0",
    "name": "GetEventTypes",
    "group": "EventTypes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Array",
            "optional": false,
            "field": "EventTypes",
            "description": "<p>All event types created.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "  HTTP/1.1 200 OK\n\n{\n  \"event-types\": [\n    {\n      \"id\": 1,\n      \"code\": \"START\",\n      \"label\": \"Départ du parcours\"\n    },\n    {\n      \"id\": 2,\n      \"code\": \"ARRIVAL\",\n      \"label\": \"Arrivée à la fin du parcours\"\n    },\n    {\n      \"id\": 3,\n      \"code\": \"MOVE\",\n      \"label\": \"Déplacement\"\n    },\n    {\n      \"id\": 4,\n      \"code\": \"OBSTACLE_ARR\",\n      \"label\": \"Arrivée sur un obstacle\"\n    },\n    {\n      \"id\": 5,\n      \"code\": \"OBSTACLE_REP\",\n      \"label\": \"Réponse à un obstacle\"\n    },\n    {\n      \"id\": 6,\n      \"code\": \"OBSTACLE_REP_OK\",\n      \"label\": \"Réponse validée\"\n    },\n    {\n      \"id\": 7,\n      \"code\": \"OBSTACLE_REP_KO\",\n      \"label\": \"Refus de la réponse par un administrateur ou par le système\"\n    },\n    {\n      \"id\": 8,\n      \"code\": \"CROSS_PT_ARRIVAL\",\n      \"label\": \"Arrivée à un point de passage\"\n    },\n    {\n      \"id\": 9,\n      \"code\": \"CHOOSE_SEGMENT\",\n      \"label\": \"Choix d'un segment\"\n    }\n  ]\n}",
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
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/EventTypeView.py",
    "groupTitle": "EventTypes"
  },
  {
    "type": "post",
    "url": "/event-types",
    "title": "Create a new event type",
    "version": "0.3.0",
    "name": "PostEventTypes",
    "group": "EventTypes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Event type's code</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "label",
            "description": "<p>Event type's label</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body:",
          "content": "\n{\n  \"code\": \"ARRIVAL\",\n  \"label\": \"Arrivée à la fin du parcours\"\n}",
          "type": "json"
        },
        {
          "title": "Success response:",
          "content": "HTTP/1.1 201 Created\n\n{\n  \"id\": 1,\n  \"code\": \"ARRIVAL\",\n  \"label\": \"Arrivée à la fin du parcours\"\n}",
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
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'code': ['Field must not be null.']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'code': ['Invalid value']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'label': ['Field must not be null.']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"error\": {\n    \"status\": \"BAD REQUEST\",\n    \"message\": \"{'label': ['Invalid value']}\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/EventTypeView.py",
    "groupTitle": "EventTypes"
  },
  {
    "type": "post",
    "url": "/obstacles/:id/answer",
    "title": "Answer to a question or send photo for obstacle id",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Obstacle's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.3.0",
    "name": "AnswerObstacle",
    "group": "Obstacle",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
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
            "field": "UserNotAdmin",
            "description": "<p>User is not administrator</p>"
          }
        ],
        "Error 404": [
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
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to perform this action using the credentials that you supplied.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/ObstacleView.py",
    "groupTitle": "Obstacle"
  },
  {
    "type": "delete",
    "url": "/obstacles/:id",
    "title": "Delete an obstacle",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Obstacle's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.2.0",
    "name": "DeleteObstacle",
    "group": "Obstacle",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
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
            "field": "UserNotAdmin",
            "description": "<p>User is not administrator</p>"
          }
        ],
        "Error 404": [
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
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to perform this action using the credentials that you supplied.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/ObstacleView.py",
    "groupTitle": "Obstacle"
  },
  {
    "type": "get",
    "url": "/obstacles/:id",
    "title": "Request a obstacle informations of obstacle's id",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Obstacle's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.2.0",
    "name": "GetObstacle",
    "group": "Obstacle",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Obstacle's ID</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "label",
            "description": "<p>Obstacle's label</p>"
          },
          {
            "group": "OK 200",
            "type": "Float",
            "optional": false,
            "field": "progress",
            "description": "<p>Obstacle's progress on segment's line</p>"
          },
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "question_type",
            "description": "<p>Obstacle's question type</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Obstacle's result</p>"
          },
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "segment_id",
            "description": "<p>Obstacle's segment's id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n    \"id\": 1,\n    \"label\": \"Quelle est le vrai nom de la sorcière blanche ?\",\n    \"progress\": 50.0,\n    \"description\": null,\n    \"question_type\": 0,\n    \"nb_points\": 25,\n    \"result\": \"Jadis\",\n    \"segment_id\": 1\n}",
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
            "field": "UserNotAdmin",
            "description": "<p>User is not super administrator</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>No obstacles were found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n    \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n    \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to view this resource using the credentials that you supplied.\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n    \"error\": {\n        \"status\": \"NOT FOUND\",\n        \"message\": \"Requested resource is not found.\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/ObstacleView.py",
    "groupTitle": "Obstacle"
  },
  {
    "type": "get",
    "url": "/challenges/:challenge_id/obstacles",
    "title": "Request all obstacles informations of challenge's id.",
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
    "version": "0.2.0",
    "name": "GetObstaclesByChallenge",
    "group": "Obstacle",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Array",
            "optional": false,
            "field": "Obstacles",
            "description": "<p>All obstacles created of challenge's id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n\"obstacles\": [\n    {\n        \"id\": 1,\n        \"label\": \"Quelle est le vrai nom de la sorcière blanche ?\",\n        \"progress\": 50.0,\n        \"description\": null,\n        \"question_type\": 0,\n        \"result\": \"Jadis\",\n        \"segment_id\": 1\n    },\n    {\n        \"id\": 2,\n        \"label\": \"Qui est le père d'Aslan ?\",\n        \"progress\": 50.0,\n        \"description\": null,\n        \"question_type\": 0,\n        \"result\": \"L'empereur d'au-delà des Mers\",\n        \"segment_id\": 2\n    },\n    {\n        \"id\": 3,\n        \"label\": \"Télécharger une photo\",\n        \"progress\": 50.0,\n        \"description\": null,\n        \"question_type\": 1,\n        \"result\": null,\n        \"segment_id\": 3\n    }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Success response:",
          "content": "HTTP/1.1 204 No Content.",
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
            "field": "UserNotAdmin",
            "description": "<p>User is not admin</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>No events were found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n    \"error\": {\n        \"status\": \"UNAUTHORIZED\",\n        \"message\": \"Bad credentials.\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n    \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to view this resource using the credentials that you supplied.\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n    \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/ObstacleView.py",
    "groupTitle": "Obstacle"
  },
  {
    "type": "get",
    "url": "/segments/:segment_id/obstacles",
    "title": "Request all obstacles informations of segment's id.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "segment_id",
            "description": "<p>Segment's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.2.0",
    "name": "GetObstaclesBySegment",
    "group": "Obstacle",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Array",
            "optional": false,
            "field": "Obstacles",
            "description": "<p>All obstacles created of segment's id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n\"obstacles\": [\n    {\n    \"id\": 1,\n    \"label\": \"Quelle est le vrai nom de la sorcière blanche ?\",\n    \"progress\": 50.0,\n    \"description\": null,\n    \"question_type\": 0,\n    \"result\": \"Jadis\",\n    \"segment_id\": 1\n    }\n]\n}",
          "type": "json"
        },
        {
          "title": "Success response:",
          "content": "HTTP/1.1 204 No Content.",
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
            "field": "UserNotAdmin",
            "description": "<p>User is not admin</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>No events were found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n    \"error\": {\n        \"status\": \"UNAUTHORIZED\",\n        \"message\": \"Bad credentials.\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n    \"error\": {\n        \"status\": \"FORBIDDEN\",\n        \"message\": \"You do not have permission to view this resource using the credentials that you supplied.\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n    \"error\": {\n        \"status\": \"NOT FOUND\",\n        \"message\": \"Requested resource is not found.\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/ObstacleView.py",
    "groupTitle": "Obstacle"
  },
  {
    "type": "patch",
    "url": "/obstacles/:id",
    "title": "Partially modify an obstacle",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Obstacle's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.2.0",
    "name": "PatchObstacle",
    "group": "Obstacle",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Obstacle's ID</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "label",
            "description": "<p>Obstacle's label</p>"
          },
          {
            "group": "Body parameters",
            "type": "Float",
            "optional": false,
            "field": "progress",
            "description": "<p>Obstacle's progress on segment's line</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": false,
            "field": "question_type",
            "description": "<p>Obstacle's question type</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Obstacle's result</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": false,
            "field": "segment_id",
            "description": "<p>Obstacle's segment's id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body:",
          "content": "\n{\n    \"result\": \"Jadis\"\n}",
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
            "field": "UserNotAdmin",
            "description": "<p>User is not administrator</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>No obstacles were found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n    \"error\": {\n        \"status\": \"BAD REQUEST\",\n        \"message\": \"{'label': ['Field must not be null.']}\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n    \"error\": {\n        \"status\": \"BAD REQUEST\",\n        \"message\": \"{'progress': ['Field must not be null.']}\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n    \"error\": {\n        \"status\": \"BAD REQUEST\",\n        \"message\": \"{'question_type': ['Field must not be null.']}\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n    \"error\": {\n        \"status\": \"UNAUTHORIZED\",\n        \"message\": \"Bad credentials.\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n    \"error\": {\n        \"status\": \"FORBIDDEN\",\n        \"message\": \"You do not have permission to perform this action using the credentials that you supplied.\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n    \"error\": {\n        \"status\": \"NOT FOUND\",\n        \"message\": \"Requested resource is not found.\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/ObstacleView.py",
    "groupTitle": "Obstacle"
  },
  {
    "type": "post",
    "url": "/segments/:segment_id/obstacles",
    "title": "Create a new obstacle of segment's id.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "segment_id",
            "description": "<p>Segment's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.2.0",
    "name": "PostObstacle",
    "group": "Obstacle",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "Float",
            "optional": false,
            "field": "progress",
            "description": "<p>Obstacle's progress on segment's line</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body:",
          "content": "\n{\n    \"progress\":14.6\n}",
          "type": "json"
        },
        {
          "title": "Success response:",
          "content": "HTTP/1.1 201 Created\n\n{\n    \"id\": 4,\n    \"label\": null,\n    \"progress\": 14.6,\n    \"description\": null,\n    \"question_type\": null,\n    \"result\": null,\n    \"segment_id\": 5\n}",
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
            "field": "PublishedChallenge",
            "description": "<p>Modification of a published challenge</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>No events were found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n    \"error\": {\n        \"status\": \"BAD REQUEST\",\n        \"message\": \"{'progress': ['This field is mandatory.']}\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n    \"error\": {\n        \"status\": \"BAD REQUEST\",\n        \"message\": \"{'progress': ['Field must not be null.']}\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n    \"error\": {\n        \"status\": \"UNAUTHORIZED\",\n        \"message\": \"Bad credentials.\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n    \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to modify a published challenge.\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n    \"error\": {\n        \"status\": \"NOT FOUND\",\n        \"message\": \"Requested resource is not found.\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/ObstacleView.py",
    "groupTitle": "Obstacle"
  },
  {
    "type": "put",
    "url": "/obstacles/:id",
    "title": "Update an obstacle",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Obstacle's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.2.0",
    "name": "PutObstacle",
    "group": "Obstacle",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Obstacle's ID</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "label",
            "description": "<p>Obstacle's label</p>"
          },
          {
            "group": "Body parameters",
            "type": "Float",
            "optional": false,
            "field": "progress",
            "description": "<p>Obstacle's progress on segment's line</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": false,
            "field": "question_type",
            "description": "<p>Obstacle's question type</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Obstacle's result</p>"
          },
          {
            "group": "Body parameters",
            "type": "Number",
            "optional": false,
            "field": "segment_id",
            "description": "<p>Obstacle's segment's id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body:",
          "content": "\n{\n    \"label\": \"Qui offre des armes aux enfants Pevensie ?\",\n    \"progress\": 70,\n    \"description\": \"\",\n    \"question_type\": 0,\n    \"result\": \"Le père Noel\"\n}",
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
            "field": "UserNotAdmin",
            "description": "<p>User is not administrator</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>No obstacles were found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n    \"error\": {\n        \"status\": \"BAD REQUEST\",\n        \"message\": \"{'label': ['Field must not be null.']}\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n    \"error\": {\n        \"status\": \"BAD REQUEST\",\n        \"message\": \"{'progress': ['Field must not be null.']}\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 400 response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n    \"error\": {\n        \"status\": \"BAD REQUEST\",\n        \"message\": \"{'question_type': ['Field must not be null.']}\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n    \"error\": {\n        \"status\": \"UNAUTHORIZED\",\n        \"message\": \"Bad credentials.\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n    \"error\": {\n        \"status\": \"FORBIDDEN\",\n        \"message\": \"You do not have permission to perform this action using the credentials that you supplied.\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n    \"error\": {\n        \"status\": \"NOT FOUND\",\n        \"message\": \"Requested resource is not found.\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/ObstacleView.py",
    "groupTitle": "Obstacle"
  },
  {
    "type": "delete",
    "url": "/segments/:id",
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
            "type": "Number",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
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
    "url": "/segments/:id",
    "title": "Request a segment informations of segment's id",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
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
            "field": "UserNotAdmin",
            "description": "<p>User is not admin</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>No events were found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n    \"error\": {\n        \"status\": \"UNAUTHORIZED\",\n        \"message\": \"Bad credentials.\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n    \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to view this resource using the credentials that you supplied.\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n    \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/SegmentView.py",
    "groupTitle": "Segment"
  },
  {
    "type": "get",
    "url": "/crossing-points/:crossing-point_id/segments",
    "title": "Request all segments informations of start crossing point's id.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "crossing-point_id",
            "description": "<p>Crossing point's unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.3.0",
    "name": "GetSegmentsByStartCrossingPoint",
    "group": "Segment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Array",
            "optional": false,
            "field": "Segments",
            "description": "<p>All segments created for start crossing point.</p>"
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
            "field": "UserNotAdmin",
            "description": "<p>User is not admin</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "RessourceNotFound",
            "description": "<p>No events were found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n    \"error\": {\n        \"status\": \"UNAUTHORIZED\",\n        \"message\": \"Bad credentials.\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n    \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to view this resource using the credentials that you supplied.\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n    \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/SegmentView.py",
    "groupTitle": "Segment"
  },
  {
    "type": "patch",
    "url": "/segments/:id",
    "title": "Partially modify a segment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
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
          "content": "\n{\n  \"name\": \"A travers le bois d'entre les mondes\",\n  \"start_crossing_point_id\":5,\n  \"end_crossing_point_id\":6,\n  \"coordinates\":[\n    {\n      \"position_x\": 355,\n      \"position_y\": 365.125\n    },\n    {\n      \"position_x\": 300,\n      \"position_y\": 347.125\n    }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Success response:",
          "content": "HTTP/1.1 201 Created\n\n{\n    \"id\": 1,\n    \"name\": \"A travers le bois d'entre les mondes\",\n    \"start_crossing_point\": {\n      \"id\": 1,\n      \"name\": \"L'armoire\",\n      \"position_x\": 0.1,\n      \"position_y\": 0.1\n    },\n    \"end_crossing_point\": {\n      \"id\": 2,\n      \"name\": \"La passe du faune\",\n      \"position_x\": 0.1,\n      \"position_y\": 0.1\n    },\n    \"coordinates\": [\n      {\n        \"position_x\": 355,\n        \"position_y\": 365.125\n      },\n      {\n        \"position_x\": 300,\n        \"position_y\": 347.125\n      }\n    ],\n    \"challenge\": {\n        \"id\": 1,\n        \"name\": \"A la recherche d'Aslan\",\n        \"description\": \"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous\",\n        \"end_date\": \"2020-03-18T00:00:00\",\n        \"alone_only\": null,\n        \"level\": \"1\",\n        \"scalling\": 4,\n        \"draft\": false,\n        \"start_crossing_point\": {\n            \"id\": 10,\n            \"name\": \"cr 1\",\n            \"position_x\": 0.417391,\n            \"position_y\": 0.207442\n        },\n        \"end_crossing_point\": {\n            \"id\": 12,\n            \"name\": \"cr 3\",\n            \"position_x\": 0.573043,\n            \"position_y\": 0.492283\n        },\n        \"admin\": {\n            \"id\": 1,\n            \"first_name\": \"Missy\",\n            \"last_name\": \"Of Gallifrey\",\n            \"pseudo\": \"Le maitre\",\n            \"email\": \"lemaitre@gmail.com\"\n        }\n    }\n}",
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
    "url": "/segments/:id",
    "title": "Update a segment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
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
          "content": "\n{\n  \"name\": \"A travers le bois d'entre les mondes\",\n  \"start_crossing_point_id\":5,\n  \"end_crossing_point_id\":6,\n  \"coordinates\":[\n    {\n      \"position_x\": 355,\n      \"position_y\": 365.125\n    },\n    {\n      \"position_x\": 300,\n      \"position_y\": 347.125\n    }\n  ]\n}",
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
    "type": "get",
    "url": "/user/challenges/:id/statistics",
    "title": "Request statistics for challenge id where user is subsribed to.",
    "version": "0.3.0",
    "name": "StatisticsChallengeId",
    "group": "Statistic",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Bool",
            "optional": true,
            "field": "date",
            "description": "<p>Date</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Object",
            "optional": false,
            "field": "Statistic",
            "description": "<p>Challenge's statistics</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"statistics\": {\n    \"distance\": 6162,\n    \"time\": 371582.691999,\n    \"average_move_type\": 1,\n    \"results\": {\n      \"1\": {\n        \"distance\": 6162,\n        \"time\": 1246612\n      }\n    },\n    \"subscribe_date\": \"18/06/2021\",\n    \"date_finished_challenge\": null\n  }\n}",
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
            "field": "PermissionDenied",
            "description": "<p>User is not challenge's admin</p>"
          }
        ],
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
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to view this resource using the credentials that you supplied.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/UserView.py",
    "groupTitle": "Statistic"
  },
  {
    "type": "get",
    "url": "/user/challenges/statistics",
    "title": "Request statistics for all challenges where user is subsribed to.",
    "version": "0.3.0",
    "name": "StatisticsChallenges",
    "group": "Statistic",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Bool",
            "optional": true,
            "field": "date",
            "description": "<p>Date</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Object",
            "optional": false,
            "field": "Statistic",
            "description": "<p>All Challenge's statistics</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"statistics\": {\n    \"distance\": 7211,\n    \"time\": 1119480.90958,\n    \"average_move_type\": 1\n  }\n}",
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
            "field": "PermissionDenied",
            "description": "<p>User is not challenge's admin</p>"
          }
        ],
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
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to view this resource using the credentials that you supplied.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/UserView.py",
    "groupTitle": "Statistic"
  },
  {
    "type": "get",
    "url": "/challenges/:id/admin",
    "title": "Request admin informations for a challenge_id",
    "version": "0.3.0",
    "name": "GetChallengeAdmin",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>Challenge's admin</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n    {\n        \"first_name\": \"Bilbo\",\n        \"last_name\": \"Baggins\",\n        \"pseudo\": \"ring_bearer\",\n        \"email\": \"littlehobbit@yahoo.com\",\n        \"is_admin\": false\n    }",
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
            "field": "PermissionDenied",
            "description": "<p>User is not challenge's admin</p>"
          }
        ],
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
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to view this resource using the credentials that you supplied.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/UserView.py",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/challenges/:id/subscribers",
    "title": "Request all subscribers of a challenge",
    "version": "0.3.0",
    "name": "GetSubscribers",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer-Token",
            "description": "<p>User's login token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Array",
            "optional": false,
            "field": "Subscribers",
            "description": "<p>All users subscribed</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"subscribers\": [\n    {\n      \"first_name\": \"Bilbo\",\n      \"last_name\": \"Baggins\",\n      \"pseudo\": \"ring_bearer\",\n      \"email\": \"littlehobbit@yahoo.com\",\n      \"is_admin\": false\n    },\n    {\n      \"first_name\": \"Daenerys\",\n      \"last_name\": \"Targaryen\",\n      \"pseudo\": \"motherOfDragons\",\n      \"email\": \"d.targaryen@gmail.com\",\n      \"is_admin\": true\n    }\n  ]\n}",
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
            "field": "PermissionDenied",
            "description": "<p>User is not challenge's admin</p>"
          }
        ],
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
          "title": "Error 401 response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"error\": {\n    \"status\": \"UNAUTHORIZED\",\n    \"message\": \"Bad credentials.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 403 response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"error\": {\n    \"status\": \"FORBIDDEN\",\n    \"message\": \"You do not have permission to view this resource using the credentials that you supplied.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404 response:",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"error\": {\n    \"status\": \"NOT FOUND\",\n    \"message\": \"Requested resource is not found.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/alabicn/Projects/lord-of-the-trips/dev/backend/server/loftes/views/UserView.py",
    "groupTitle": "User"
  }
] });
