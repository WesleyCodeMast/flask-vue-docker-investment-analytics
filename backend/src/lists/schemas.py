from core.schemas.base import BaseSchema

from companies.schemas.financial import FinancialSchema

from companies.schemas.company import CompanySchema
from companies.schemas.valuation_and_earnings import ValuationEarningsSchema


class ListSchema(BaseSchema):
    id: int
    name: str
    is_added: bool = False


class ListCompanyDataSchema(BaseSchema):
    company: CompanySchema | None = None
    valuation_and_earnings: ValuationEarningsSchema | None = None
    financials: list[FinancialSchema] | None = None


class ListFullSchema(BaseSchema):
    id: int
    name: str
    companies: list[ListCompanyDataSchema]


class ListCreateSchema(BaseSchema):
    name: str


__all__ = (
    'ListSchema',
    'ListFullSchema',
    'ListCompanyDataSchema',
    'ListCreateSchema',
)
