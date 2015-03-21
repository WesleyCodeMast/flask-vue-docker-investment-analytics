from fastapi import Depends

from companies.dependencies import valid_company_symbol

from users.dependencies import current_user

from .models import Comment
from .repository import CommentRepository
from .exceptions import CommentNotFound

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from companies.models import Company
    from users.models import User


def use_comment_repository() -> CommentRepository:
    return CommentRepository()


async def valid_comment_id(
    comment_id: int,
    user: 'User' = Depends(current_user),
    repository: CommentRepository = Depends(use_comment_repository),
) -> Comment:
    comment = await repository.find_one(id=comment_id, user=user)

    if not comment:
        raise CommentNotFound(field='comment_id')

    return comment


async def get_comments_by_company(
    company: 'Company' = Depends(valid_company_symbol),
    user: 'User' = Depends(current_user),
    repository: CommentRepository = Depends(use_comment_repository),
) -> list[Comment]:
    return await repository.find_all(user=user, company=company)
