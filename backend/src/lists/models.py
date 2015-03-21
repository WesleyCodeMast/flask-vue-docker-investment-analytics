from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey

from core.db.base import BaseModel

from typing import TYPE_CHECKING

from users.models import User

from companies.models import Company


class List(BaseModel):
    """ The model describing a List """

    __tablename__ = 'lists'

    if TYPE_CHECKING:
        name: str
        user: User
        user_id: int
    else:
        name: Mapped[str] = mapped_column(String(length=48))
        # Full name of the list

        user_id: Mapped[int] = mapped_column(ForeignKey(f'{User.__tablename__}.id', ondelete='CASCADE'))
        user: Mapped[User] = relationship(backref='list')


class ListCompany(BaseModel):
    """ The model describing a ListCompany """

    __tablename__ = 'list_company'

    if TYPE_CHECKING:
        list: List
        list_id: int
        company: User
        company_id: int
    else:
        list_id: Mapped[int] = mapped_column(ForeignKey(f'{List.__tablename__}.id', ondelete='CASCADE'))
        list: Mapped[List] = relationship(backref='companies')

        company_id: Mapped[int] = mapped_column(ForeignKey(f'{Company.__tablename__}.id', ondelete='CASCADE'))
        company: Mapped[Company] = relationship(backref='lists')


__all__ = (
    'List',
    'ListCompany',
)
