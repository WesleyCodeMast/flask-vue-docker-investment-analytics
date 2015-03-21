from .methods import IEXMethod, IEXType


class IEXError(Exception):
    url: str | None = None

    def __init__(self, message: str) -> None:
        self.message = message

    def __str__(self) -> str:
        message = self.message
        if self.url:
            message += f" | Endpoint: {self.url}"
        return message

    def __repr__(self) -> str:
        return f"{type(self).__name__}('{self}')"


class IEXRestError(IEXError):
    def __init__(self, method: IEXMethod[IEXType], message: str) -> None:
        super().__init__(message=message)
        self.method = method


class IEXNetworkError(IEXRestError):
    pass


class IEXDecodeError(IEXRestError):
    pass


class APIAddressValidationError(Exception):
    pass
