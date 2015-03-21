from .base import IEXMethod


class Company(IEXMethod[dict]):
    __endpoint__ = 'stock/{symbol}/company'

    def __init__(self, symbol: str) -> None:
        self.symbol = symbol

    @property
    def endpoint(self):
        return self.__endpoint__.format(symbol=self.symbol)
