from core.schemas import BaseSchema

from datetime import datetime


class CommentSchema(BaseSchema):
    id: int
    column: str | None = None
    field: str
    title: str | None = None
    text: str
    created_at: datetime


__all__ = (
    'CommentSchema',
)
