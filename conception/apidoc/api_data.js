define({ "api": [
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
            "type": "Object",
            "optional": false,
            "field": "Challenge",
            "description": "<p>Challenge of id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"id\": 1,\n  \"name\": \"A la recherche d'Aslan\",\n  \"description\": \"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous\",\n  \"end_date\": \"2021-12-15T03:16:00\",\n  \"alone_only\": 0,\n  \"level\": \"3\",\n  \"scalling\": 3,\n  \"draft\": false,\n  \"start_crossing_point\": {\n    \"id\": 2,\n    \"name\": \"La passe du faune\",\n    \"position_x\": 0.1,\n    \"position_y\": 0.1\n  },\n  \"end_crossing_point\": {\n    \"id\": 3,\n    \"name\": \"La passe du magicien\",\n    \"position_x\": 0.2,\n    \"position_y\": 0.4\n  },\n  \"segments\": [\n    {\n      \"id\": 2,\n      \"name\": \"La route d'Ettinsmoor\",\n      \"start_crossing_point\": {\n        \"id\": 2,\n        \"name\": \"La passe du faune\",\n        \"position_x\": 0.1,\n        \"position_y\": 0.1\n      },\n      \"end_crossing_point\": {\n        \"id\": 3,\n        \"name\": \"La passe du magicien\",\n        \"position_x\": 0.2,\n        \"position_y\": 0.4\n      },\n      \"coordinates\": []\n    },\n    {\n      \"id\": 3,\n      \"name\": \"La traversée du grand désert\",\n      \"start_crossing_point\": {\n        \"id\": 2,\n        \"name\": \"La passe du faune\",\n        \"position_x\": 0.1,\n        \"position_y\": 0.1\n      },\n      \"end_crossing_point\": {\n        \"id\": 3,\n        \"name\": \"La passe du magicien\",\n        \"position_x\": 0.2,\n        \"position_y\": 0.4\n      },\n      \"coordinates\": []\n    },\n    {\n      \"id\": 4,\n      \"name\": \"La traversée du Grand Océan Oriental\",\n      \"start_crossing_point\": {\n        \"id\": 5,\n        \"name\": \"Le pont des centaures\",\n        \"position_x\": 0.3,\n        \"position_y\": 0.5\n      },\n      \"end_crossing_point\": {\n        \"id\": 8,\n        \"name\": \"La table de pierre\",\n        \"position_x\": 0.2,\n        \"position_y\": 0.5\n      },\n      \"coordinates\": []\n    }\n  ],\n  \"admin\": {\n    \"id\": 1,\n    \"first_name\": \"Missy\",\n    \"last_name\": \"Of Gallifrey\",\n    \"pseudo\": \"Le maitre\",\n    \"mail\": \"lemaitre@gmail.com\"\n  }\n}",
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
          "content": "HTTP/1.1 200 OK\n\n{\n  \"challenges\": [\n    {\n      \"id\": 1,\n      \"name\": \"A la recherche d'Aslan\",\n      \"description\": \"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous\",\n      \"end_date\": \"2020-03-18T00:00:00\",\n      \"alone_only\": null,\n      \"level\": \"1\",\n      \"scalling\": 4,\n      \"draft\": false,\n      \"start_crossing_point\": null,\n      \"end_crossing_point\": null,\n      \"segments\": [\n        {\n          \"id\": 1,\n          \"name\": \"A travers le bois d'entre les mondes\",\n          \"start_crossing_point\": {\n            \"id\": 1,\n            \"name\": \"L'armoire\",\n            \"position_x\": 0.1,\n            \"position_y\": 0.1\n          },\n          \"end_crossing_point\": {\n            \"id\": 2,\n            \"name\": \"La passe du faune\",\n            \"position_x\": 0.1,\n            \"position_y\": 0.1\n          },\n          \"coordinates\": []\n        },\n        {\n          \"id\": 2,\n          \"name\": \"La route d'Ettinsmoor\",\n          \"start_crossing_point\": {\n            \"id\": 2,\n            \"name\": \"La passe du faune\",\n            \"position_x\": 0.1,\n            \"position_y\": 0.1\n          },\n          \"end_crossing_point\": {\n            \"id\": 3,\n            \"name\": \"La passe du magicien\",\n            \"position_x\": 0.2,\n            \"position_y\": 0.4\n          },\n          \"coordinates\": null\n        },\n        {\n          \"id\": 3,\n          \"name\": \"La traversée du grand désert\",\n          \"start_crossing_point\": {\n            \"id\": 2,\n            \"name\": \"La passe du faune\",\n            \"position_x\": 0.1,\n            \"position_y\": 0.1\n          },\n          \"end_crossing_point\": {\n            \"id\": 3,\n            \"name\": \"La passe du magicien\",\n            \"position_x\": 0.2,\n            \"position_y\": 0.4\n          },\n          \"coordinates\": []\n        },\n        {\n          \"id\": 4,\n          \"name\": \"La traversée du Grand Océan Oriental\",\n          \"start_crossing_point\": {\n            \"id\": 5,\n            \"name\": \"Le pont des centaures\",\n            \"position_x\": 0.3,\n            \"position_y\": 0.5\n          },\n          \"end_crossing_point\": {\n            \"id\": 8,\n            \"name\": \"La table de pierre\",\n            \"position_x\": 0.2,\n            \"position_y\": 0.5\n          },\n          \"coordinates\": null\n        }\n      ],\n      \"admin\": {\n        \"id\": 1,\n        \"first_name\": \"Missy\",\n        \"last_name\": \"Of Gallifrey\",\n        \"pseudo\": \"Le maitre\",\n        \"mail\": \"lemaitre@gmail.com\"\n      }\n    },\n    {\n      \"id\": 2,\n      \"name\": \"Oops, on a perdu Han Solo\",\n      \"description\": \"Leia Organa, Lando Calrissian et le reste de l'équipe ont merdé et ont été capturé par Jabba le Hutt. Les services secrets de la résistance ont trouvé le lieu ou ils sont tenus captifs. Il te faut donc jeune padawan allait sauver tout ce beau monde, et fissa car la lutte n'attends pas\",\n      \"end_date\": \"2020-03-18T00:00:00\",\n      \"alone_only\": null,\n      \"level\": \"2\",\n      \"scalling\": 4,\n      \"draft\": false,\n      \"start_crossing_point\": null,\n      \"end_crossing_point\": null,\n      \"segments\": [],\n      \"admin\": {\n        \"id\": 1,\n        \"first_name\": \"Missy\",\n        \"last_name\": \"Of Gallifrey\",\n        \"pseudo\": \"Le maitre\",\n        \"mail\": \"lemaitre@gmail.com\"\n      }\n    }\n  ]\n}",
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
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Object",
            "optional": false,
            "field": "Challenge",
            "description": "<p>Created challenge.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 201 Created\n\n\n{\n  \"id\": 1,\n  \"name\": \"A la recherche d'Aslan\",\n  \"description\": \"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous\",\n  \"end_date\": \"2021-12-15T03:16:00\",\n  \"alone_only\": 0,\n  \"level\": \"3\",\n  \"scalling\": 3,\n  \"draft\": false,\n  \"start_crossing_point\": {\n    \"id\": 2,\n    \"name\": \"La passe du faune\",\n    \"position_x\": 0.1,\n    \"position_y\": 0.1\n  },\n  \"end_crossing_point\": {\n    \"id\": 3,\n    \"name\": \"La passe du magicien\",\n    \"position_x\": 0.2,\n    \"position_y\": 0.4\n  },\n  \"segments\": [],\n  \"admin\": {\n    \"id\": 1,\n    \"first_name\": \"Missy\",\n    \"last_name\": \"Of Gallifrey\",\n    \"pseudo\": \"Le maitre\",\n    \"mail\": \"lemaitre@gmail.com\"\n  }\n}",
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
            "type": "Object",
            "optional": false,
            "field": "CrossingPoint",
            "description": "<p>CrossingPoint of id</p>"
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
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "ChallengeNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          },
          {
            "group": "Error 4xx",
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
        "OK 201": [
          {
            "group": "OK 201",
            "type": "Object",
            "optional": false,
            "field": "CrossingPoint",
            "description": "<p>Created Crossing point.</p>"
          }
        ]
      },
      "examples": [
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
            "type": "Array",
            "optional": false,
            "field": "Segments",
            "description": "<p>Segment of id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n{\n    \"id\": 1,\n    \"name\": \"A travers le bois d'entre les mondes\",\n    \"start_crossing_point\": {\n    \"id\": 1,\n    \"name\": \"L'armoire\",\n    \"position_x\": 0.1,\n    \"position_y\": 0.1\n    },\n    \"end_crossing_point\": {\n    \"id\": 2,\n    \"name\": \"La passe du faune\",\n    \"position_x\": 0.1,\n    \"position_y\": 0.1\n    },\n    \"coordinates\": [],\n    \"challenge\": {\n        \"id\": 1,\n        \"name\": \"A la recherche d'Aslan\",\n        \"description\": \"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous\",\n        \"end_date\": \"2020-03-18T00:00:00\",\n        \"alone_only\": null,\n        \"level\": \"1\",\n        \"scalling\": 4,\n        \"draft\": false,\n        \"start_crossing_point\": {\n            \"id\": 10,\n            \"name\": \"cr 1\",\n            \"position_x\": 0.417391,\n            \"position_y\": 0.207442\n        },\n        \"end_crossing_point\": {\n            \"id\": 12,\n            \"name\": \"cr 3\",\n            \"position_x\": 0.573043,\n            \"position_y\": 0.492283\n        },\n        \"admin\": {\n            \"id\": 1,\n            \"first_name\": \"Missy\",\n            \"last_name\": \"Of Gallifrey\",\n            \"pseudo\": \"Le maitre\",\n            \"mail\": \"lemaitre@gmail.com\"\n        }\n    }\n}",
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
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "ChallengeNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          },
          {
            "group": "Error 4xx",
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
          "content": "HTTP/1.1 200 OK\n\n{\n  \"segments\": [\n    {\n      \"id\": 1,\n      \"name\": \"A travers le bois d'entre les mondes\",\n      \"start_crossing_point\": {\n        \"id\": 1,\n        \"name\": \"L'armoire\",\n        \"position_x\": 0.1,\n        \"position_y\": 0.1\n      },\n      \"end_crossing_point\": {\n        \"id\": 2,\n        \"name\": \"La passe du faune\",\n        \"position_x\": 0.1,\n        \"position_y\": 0.1\n      },\n      \"coordinates\": [],\n      \"challenge\": {\n        \"id\": 1,\n        \"name\": \"A la recherche d'Aslan\",\n        \"description\": \"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous\",\n        \"end_date\": \"2020-03-18T00:00:00\",\n        \"alone_only\": null,\n        \"level\": \"1\",\n        \"scalling\": 4,\n        \"draft\": false,\n        \"start_crossing_point\": {\n          \"id\": 10,\n          \"name\": \"cr 1\",\n          \"position_x\": 0.417391,\n          \"position_y\": 0.207442\n        },\n        \"end_crossing_point\": {\n          \"id\": 12,\n          \"name\": \"cr 3\",\n          \"position_x\": 0.573043,\n          \"position_y\": 0.492283\n        },\n        \"admin\": {\n          \"id\": 1,\n          \"first_name\": \"Missy\",\n          \"last_name\": \"Of Gallifrey\",\n          \"pseudo\": \"Le maitre\",\n          \"mail\": \"lemaitre@gmail.com\"\n        }\n      }\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "ChallengeNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          },
          {
            "group": "Error 4xx",
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
        "OK 201": [
          {
            "group": "OK 201",
            "type": "Array",
            "optional": false,
            "field": "Segments",
            "description": "<p>Created segment.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n\n\n{\n    \"id\": 1,\n    \"name\": \"A travers le bois d'entre les mondes\",\n    \"start_crossing_point\": {\n    \"id\": 1,\n    \"name\": \"L'armoire\",\n    \"position_x\": 0.1,\n    \"position_y\": 0.1\n    },\n    \"end_crossing_point\": {\n    \"id\": 2,\n    \"name\": \"La passe du faune\",\n    \"position_x\": 0.1,\n    \"position_y\": 0.1\n    },\n    \"coordinates\": [],\n    \"challenge\": {\n        \"id\": 1,\n        \"name\": \"A la recherche d'Aslan\",\n        \"description\": \"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous\",\n        \"end_date\": \"2020-03-18T00:00:00\",\n        \"alone_only\": null,\n        \"level\": \"1\",\n        \"scalling\": 4,\n        \"draft\": false,\n        \"start_crossing_point\": {\n            \"id\": 10,\n            \"name\": \"cr 1\",\n            \"position_x\": 0.417391,\n            \"position_y\": 0.207442\n        },\n        \"end_crossing_point\": {\n            \"id\": 12,\n            \"name\": \"cr 3\",\n            \"position_x\": 0.573043,\n            \"position_y\": 0.492283\n        },\n        \"admin\": {\n            \"id\": 1,\n            \"first_name\": \"Missy\",\n            \"last_name\": \"Of Gallifrey\",\n            \"pseudo\": \"Le maitre\",\n            \"mail\": \"lemaitre@gmail.com\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "ChallengeNotFound",
            "description": "<p>The id of the Challenge was not found.</p>"
          },
          {
            "group": "Error 4xx",
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
