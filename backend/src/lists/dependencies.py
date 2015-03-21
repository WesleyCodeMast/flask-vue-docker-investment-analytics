from fastapi import Depends

from users.dependencies import current_user

from companies.dependencies import valid_company_symbol
from companies.dependencies.repository import use_company_repository

from .models import List
from .exceptions import ListNotFound
from .repository import ListRepository, ListCompanyRepository
from .schemas import ListSchema

from typing import TYPE_CHECKING, Optional

if TYPE_CHECKING:
    from users.models import User
    from companies.models import Company


def use_list_repository() -> ListRepository:
    return ListRepository()


def use_list_company_repository() -> ListCompanyRepository:
    return ListCompanyRepository()


async def prevalid_company_symbol(symbol: str = None) -> Optional['Company']:
    if symbol is None:
        return

    company_repository = use_company_repository()

    company = await valid_company_symbol(symbol=symbol, repository=company_repository)

    return company


async def get_user_lists(
    company: 'Company' = Depends(prevalid_company_symbol),
    user: 'User' = Depends(current_user),
    repository: 'ListRepository' = Depends(use_list_repository),
    list_repository: 'ListCompanyRepository' = Depends(use_list_company_repository),
) -> list[ListSchema]:
    """
    Retrieves all User's Lists

    :param company: Company model object
    :param user: Current authorized user
    :param repository: Lists database repository
    :param list_repository: Companies of the list database repository
    """

    lists_instances = await repository.find_all(
        user=user,
    )

    lists = []

    for list_instance in lists_instances:
        is_added = False

        if company is not None:
            is_added = await list_repository.exists(company_id=company.id, list_id=list_instance.id)

        lists.append(ListSchema(
            id=list_instance.id,
            name=list_instance.name,
            is_added=is_added,
        ))

    return lists


async def valid_list_id(
    list_id: int,
    user: 'User' = Depends(current_user),
    repository: ListRepository = Depends(use_list_repository),
) -> List:
    list = await repository.find_one(id=list_id, user=user)

    if not list:
        raise ListNotFound(field='list_id')

    return list
