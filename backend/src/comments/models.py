from sqlalchemy import ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.db.base import BaseModel, TimestampMixin

from companies.models import Company

from users.models import User

from typing import TYPE_CHECKING


class Comment(BaseModel, TimestampMixin):
    """ User comments on company fields """

    __tablename__ = 'comments'

    if TYPE_CHECKING:
        user: User
        company: Company
        column: str
        field: str
        text: str
    else:
        user_id: Mapped[int] = mapped_column(ForeignKey(f'{User.__tablename__}.id', ondelete='CASCADE'))
        user: Mapped[User] = relationship(backref='comments')
        # The user who created these comments

        company_id: Mapped[int] = mapped_column(ForeignKey(f'{Company.__tablename__}.id', ondelete='CASCADE'))
        company: Mapped[Company] = relationship(backref='comments')
        # Information about the company to which the data is linked

        column: Mapped[str] = mapped_column(Text, default=None, nullable=True)
        # The column to which this comment refers

        field: Mapped[str] = mapped_column()
        # The name of the field to which the comment is linked

        title: Mapped[str] = mapped_column(default=None, nullable=True)
        # Comment title

        text: Mapped[str] = mapped_column()
        # Comment text


__all__ = (
    'Comment',
)
