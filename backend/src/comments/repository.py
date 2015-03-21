from core.db.repository import SQLAlchemyRepository

from .models import Comment


class CommentRepository(SQLAlchemyRepository[Comment]):
    model = Comment
