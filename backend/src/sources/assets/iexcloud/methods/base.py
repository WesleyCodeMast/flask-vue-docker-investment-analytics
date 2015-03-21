from typing import Generic, TypeVar

from abc import ABC, abstractmethod


IEXType = TypeVar('IEXType', bound=any)


class IEXMethod(ABC, Generic[IEXType]):
    __endpoint__: str
    __type__: str = 'GET'

    @property
    @abstractmethod
    def endpoint(self) -> str:
        pass

    @property
    def request_type(self) -> str:
        return self.__type__

    @staticmethod
    def _build_http_params(**query) -> str:
        query = '&'.join([f'{k}={v}' for k, v in query.items()])
        if query:
            query = f'?{query}'
        return query
