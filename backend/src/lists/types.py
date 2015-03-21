from enum import Enum


class CompanyListPeriod(str, Enum):
    TEN_YEARS = '10Y'
    FIVE_YEARS = '5Y'
    YEAR = '1Y'


__all__ = (
    'CompanyListPeriod',
)