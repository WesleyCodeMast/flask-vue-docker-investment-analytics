from ..exceptions import APIAddressValidationError


class IEXCloudAPIServer:
    """
    Base config for API Endpoints
    """

    def __init__(self, base_url: str) -> None:
        self.base_url = self.__validate_url(base_url)
        self.base_url += "{payload}"

    def api_url(self, payload: str) -> str:
        return self.base_url.format(payload=payload)

    @staticmethod
    def __validate_url(base_url: str) -> str:
        if not isinstance(base_url, str):
            raise APIAddressValidationError(
                f"Invalid API address. It must be 'str' instance instead of {type(base_url)}"
            )

        if not base_url.endswith('/'):
            base_url += '/'

        return base_url
