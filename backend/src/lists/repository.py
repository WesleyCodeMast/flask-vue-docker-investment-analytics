from core.db.repository import SQLAlchemyRepository

from .models import List, ListCompany


class ListRepository(SQLAlchemyRepository[List]):
    model = List


class ListCompanyRepository(SQLAlchemyRepository[ListCompany]):
    model = ListCompany
