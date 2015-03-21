from core.exceptions import APIError

from starlette.status import HTTP_404_NOT_FOUND


class CommentNotFound(APIError):
    status_code = HTTP_404_NOT_FOUND
    detail = 'Comment not found'
