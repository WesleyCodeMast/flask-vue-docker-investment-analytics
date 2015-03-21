from core.schemas import BaseSchema


class CommentUpdateSchema(BaseSchema):
    title: str = None
    text: str


__all__ = (
    'CommentUpdateSchema',
)
