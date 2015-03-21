from .dependencies import use_comment_repository

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from users.models import User
    from companies.models import Company
    from .models import Comment


async def create_comment(user: 'User', company: 'Company', **kwargs) -> 'Comment':
    """
    Creates a custom comment

    :param user: The user to whom the comment will belong
    :param company: Company model object
    :param kwargs: Comment Parameters
    :return: Comment model object
    """

    repository = use_comment_repository()
    return await repository.create(user_id=user.id, company_id=company.id, **kwargs)


async def update_comment(comment: 'Comment', title: str = None, text: str = None) -> 'Comment':
    """
    Updates the comment and saves the changes

    :param comment: Comment model object
    :param title: The new title of the comment
    :param text: The new text of the comment
    :return: Edited Comment model object
    """

    if title is not None:
        comment.title = title

    if text is not None:
        comment.text = text

    repository = use_comment_repository()
    await repository.save(comment)

    return comment


async def delete_comment(comment: 'Comment') -> None:
    """
    Deletes a comment from the database

    :param comment: Comment model object
    :return:
    """

    repository = use_comment_repository()
    await repository.delete(comment)
