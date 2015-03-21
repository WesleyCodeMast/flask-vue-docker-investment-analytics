from core.schemas import BaseSchema


class CommentCreateSchema(BaseSchema):
    column: str = None
    field: str = None
    title: str
    text: str


__all__ = (
    'CommentCreateSchema',
)
