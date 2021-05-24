from pyramid.response import Response
import unicodedata


class ServiceInformations:
    def build_response(self, http_exception, data=None, message=None):

        code = http_exception.code
        content = data

        if code >= 400 and code < 600:
            # errors (400 -> client, 500 -> server)
            content = {
                "error": {
                    "status": http_exception.title.upper(),
                    "message": self.get_error_message_by_code(code)
                    if message == None
                    else message,
                }
            }

        response = Response(content_type="application/json")
        response.status_code = code

        if content != None:
            response.json_body = content

        return response

    def get_error_message_by_code(self, code):

        switcher = {
            400: "Bad Request`.",
            401: "Bad credentials.",
            403: "You do not have permission to perform this action using the credentials that you supplied.",
            404: "Requested resource is not found.",
            415: "Unsupported media type.",
            500: "The server encountred an internal error and was unable to complete your request.",
        }

        return switcher.get(code, "ERROR")

    def replace_accents(self, text):

        text = unicodedata.normalize('NFD', text)\
            .encode('ascii', 'ignore')\
            .decode("utf-8")

        return str(text)

    def replace_specials(self, text):

        return text.translate ({ord(c): "" for c in "!'@#$%^&*()[]{};:,./<>?\|`~-=_+ "})
