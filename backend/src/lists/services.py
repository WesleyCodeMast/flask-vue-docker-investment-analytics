from datetime import datetime, timezone
from typing import TYPE_CHECKING

from sqlalchemy import delete as sqlalchemy_delete, text, and_
from sqlalchemy.orm import selectinload

from core.db import get_async_session_maker

from users.models import User

from .dependencies import use_list_repository, use_list_company_repository
from .models import List, ListCompany
from .schemas import ListCompanyDataSchema

from lists.types import CompanyListPeriod

from companies.dependencies.repository import use_financial_repository
from companies.schemas.financial import FinancialSchema
from companies.models import Financial
from companies.dependencies import get_company_with_market_data, get_valuation_and_earnings

if TYPE_CHECKING:
    from companies.repository import FinancialRepository
    from companies.models import Company


async def create(*, name: str, user: 'User') -> List:
    """
    Creates a new list of companies

    :param name: Name of the created list
    :param user:
    :return: New companies list
    """

    repository = use_list_repository()

    return await repository.create(name=name, user_id=user.id)


async def edit(list: 'List', name: str) -> List:
    """
    Edit passed list

    :param list: List model object to edit
    :param name: New name of the list
    :return: Updated list instance
    """

    repository = use_list_repository()

    list.name = name

    await repository.save(list)

    return list


async def delete(*, list: 'List') -> None:
    """
    Delete the list of companies

    :param list: List model object
    :return:
    """

    repository = use_list_repository()

    async with get_async_session_maker() as session:
        statement = sqlalchemy_delete(ListCompany).where(ListCompany.list_id == list.id)

        await session.execute(statement)
        await session.commit()

    await repository.delete(list)


async def add_company(*, list: 'List', company: 'Company') -> bool:
    """
    Delete the list of companies

    :param list: List
    :param company: Company in the list
    :return: ListCompany
    """

    repository = use_list_company_repository()

    existing_list_company = await repository.find_one(
        list_id=list.id,
        company_id=company.id
    )

    if existing_list_company:
        return existing_list_company

    list_repository = use_list_repository()

    list_exists = await list_repository.find_one(id=list.id)

    if not list_exists:
        return None

    await repository.create(list_id=list.id, company_id=company.id)

    return True


async def delete_company(*, list: 'List', company: 'Company'):
    """
    Delete the list of companies

    :param list: List
    :param company: deleting Company in list
    :return: Bool
    """

    repository = use_list_company_repository()

    deleting_list_company = await repository.find_one(list_id=list.id, company_id=company.id)

    if deleting_list_company:
        return await repository.delete(deleting_list_company)

    return None


async def get_company_list_financials_data(
    repository: 'FinancialRepository',
    company: 'Company',
    period: CompanyListPeriod,
) -> list[FinancialSchema]:
    current_timestamp = datetime.now(timezone.utc)
    current_quarter = (current_timestamp.month - 1) // 3 + 1

    query_args = [Financial.company == company]
    query_kwargs = {}

    if period in (CompanyListPeriod.TEN_YEARS, CompanyListPeriod.FIVE_YEARS):
        query_kwargs['order'] = text('year ASC')
        query_args += [
            Financial.year >= current_timestamp.year - 11,
            Financial.year != current_timestamp.year,
            Financial.quarter == None,
        ]
    elif period in (CompanyListPeriod.YEAR):
        query_kwargs['limit'] = 4 if period == CompanyListPeriod.YEAR else 2
        query_kwargs['order'] = text('year DESC, quarter DESC')
        query_args += [
            Financial.quarter != None,
            ~and_(
                Financial.year == current_timestamp.year,
                Financial.quarter == current_quarter,
            ),
        ]
    else:
        return []

    financials = await repository.find_all(options=selectinload(Financial.previous), *query_args, **query_kwargs)

    schemas = []

    for financial in financials:
        schemas.append(financial)

    return schemas


async def get_company_financials_schema(
    *,
    list_company_id: int,
    company: 'Company',
    period: CompanyListPeriod,
) -> ListCompanyDataSchema:
    repository = use_financial_repository()

    financials_data = await get_company_list_financials_data(repository=repository, company=company, period=period)

    company_schema = await get_company_with_market_data(company=company)
    valuation_and_earnings = await get_valuation_and_earnings(company=company, repository=repository)

    list_company_years_data = ListCompanyDataSchema(
        list_company_id=list_company_id,
        financials=financials_data,
        company=company_schema,
        valuation_and_earnings=valuation_and_earnings,
    )

    return list_company_years_data


async def get_companies_data(*, list: 'List', period: CompanyListPeriod) -> list[ListCompanyDataSchema]:
    companies_data = []

    repository = use_list_company_repository()

    list_companies = await repository.find_all(list_id=list.id, options=selectinload(ListCompany.company))

    for list_company in list_companies:
        company_data = await get_company_financials_schema(
            list_company_id=list_company.id,
            company=list_company.company,
            period=period,
        )
        companies_data.append(company_data)

    return companies_data


