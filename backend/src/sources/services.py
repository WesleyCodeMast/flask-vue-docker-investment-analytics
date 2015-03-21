from core.settings import get_application_settings

from companies.types import FinancialSource

from .iexcloud import IEXCloudAPI

from typing import assert_never, TYPE_CHECKING

if TYPE_CHECKING:
    from companies.models import Company

    from .base import FinancialAPI


def get_financial_source(
    company: 'Company',
) -> 'FinancialAPI':
    """
    Retrieves the financial source inner API by company

    :param company: Company model object
    :return: FinancialAPI instance
    """

    settings = get_application_settings()

    inner_api_instance = None

    match company.data_source:
        case FinancialSource.IEXCLOUD:
            inner_api_instance = IEXCloudAPI(api_token=settings.IEXCLOUD_API_TOKEN)
        case FinancialSource.POLYGONIO:
            raise NotImplementedError
        case _ as unreachable:
            assert_never(unreachable)

    return inner_api_instance


__all__ = (
    'get_financial_source',
)
