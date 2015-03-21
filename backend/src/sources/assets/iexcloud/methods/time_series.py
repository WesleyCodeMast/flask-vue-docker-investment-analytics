from .base import IEXMethod


class TimeSeries(IEXMethod[list]):
    __endpoint__ = 'time-series/{id}/{key}/{subkey}{query}'

    def __init__(self, id: str, symbol: str, subkey: str = None, **query) -> None:
        self.id = id
        self.symbol = symbol
        self.subkey = subkey or ''
        self.query = query

    @property
    def endpoint(self):
        return self.__endpoint__.format(
            id=self.id,
            key=self.symbol,
            subkey=self.subkey,
            query=self._build_http_params(**self.query),
        )
