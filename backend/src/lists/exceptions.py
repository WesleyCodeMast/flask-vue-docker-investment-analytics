from core.exceptions import APIError

from starlette.status import HTTP_404_NOT_FOUND


class ListNotFound(APIError):
    status_code = HTTP_404_NOT_FOUND
    detail = 'List not found'
