from fastapi import APIRouter, Depends

from users.dependencies import current_user

from companies.models.company import Company
from companies.dependencies.company import valid_company_symbol

import lists.services as lists_service
from .schemas import ListSchema, ListFullSchema, ListCreateSchema
from .dependencies import get_user_lists, valid_list_id
from .models import List

from lists.types import CompanyListPeriod


router = APIRouter()


@router.post('/create', name='lists:create', response_model=ListSchema)
async def list_create(list_to_create: ListCreateSchema, user: 'User' = Depends(current_user)) -> ListSchema:
    return await lists_service.create(name=list_to_create.name, user=user)


@router.post('/{list_id}/delete')
async def list_delete(list: List = Depends(valid_list_id)) -> str:
    await lists_service.delete(list=list)
    return ''


@router.post('/{list_id}/edit', response_model=ListSchema)
async def list_edit(edit: ListCreateSchema, list: List = Depends(valid_list_id)) -> ListSchema:
    return await lists_service.edit(list=list, name=edit.name)


@router.get('/', response_model=list[ListSchema])
async def get_lists(user_lists: list[ListSchema] = Depends(get_user_lists)) -> list[ListSchema]:
    return user_lists


@router.post('/{list_id}/company/add/{symbol}')
async def lists_add_company(list: List = Depends(valid_list_id), company: Company = Depends(valid_company_symbol)):
    return await lists_service.add_company(list=list, company=company)


@router.post('/{list_id}/company/delete/{symbol}')
async def lists_delete_company(list: List = Depends(valid_list_id), company: Company = Depends(valid_company_symbol)):
    return await lists_service.delete_company(list=list, company=company)


@router.get('/{list_id}', response_model=ListFullSchema)
async def retrieve_list(list: List = Depends(valid_list_id), period: CompanyListPeriod = CompanyListPeriod.YEAR):
    companies_data = await lists_service.get_companies_data(list=list, period=period)
    return {
        'id': list.id,
        'name': list.name,
        'companies': companies_data,
    }
