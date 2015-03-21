from fastapi import APIRouter, Depends

from users.dependencies import current_user

from companies.dependencies import valid_company_symbol

from . import services
from .models import Comment
from .schemas import CommentSchema, CommentCreateSchema, CommentUpdateSchema
from .dependencies import valid_comment_id, get_comments_by_company

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from companies.models import Company
    from users.models import User


router = APIRouter()


@router.get('/company/{symbol}', response_model=list[CommentSchema])
async def retrieve_comments_by_company(
    comments: list[Comment] = Depends(get_comments_by_company),
) -> list[Comment]:
    return comments


@router.post('/company/{symbol}/create', response_model=CommentSchema)
async def create_comment(
    comment: CommentCreateSchema,
    company: 'Company' = Depends(valid_company_symbol),
    user: 'User' = Depends(current_user),
) -> CommentSchema:
    return await services.create_comment(user=user, company=company, **comment.model_dump())


@router.post('/{comment_id}/update', response_model=CommentSchema)
async def update_comment(
    updated: CommentUpdateSchema,
    comment: Comment = Depends(valid_comment_id),
) -> CommentSchema:
    return await services.update_comment(comment=comment, **updated.model_dump())


@router.post('/{comment_id}/delete')
async def delete_comment(comment: Comment = Depends(valid_comment_id)) -> None:
    await services.delete_comment(comment=comment)
