from aiohttp import ClientSession, TCPConnector, ClientError

from .api import IEXCloudAPIServer

from typing import Type, assert_never
from ..methods import IEXType, IEXMethod
from ..exceptions import IEXNetworkError, IEXDecodeError

import ssl, certifi, asyncio, json


DEFAULT_TIMEOUT: float = 60


class AiohttpSession:
    def __init__(self) -> None:
        self._session: ClientSession | None = None
        self._must_close_session = True

        self._connector_type: Type[TCPConnector] = TCPConnector
        self._connector_init: dict[str, any] = {
            "ssl": ssl.create_default_context(cafile=certifi.where())
        }

    async def create_session(self) -> ClientSession:
        if self._must_close_session:
            await self.close()

        if not self._session or self._session.closed:
            self._session = ClientSession(connector=self._connector_type(**self._connector_init))

        return self._session

    async def close(self) -> None:
        if self._session and not self._session.closed:
            await self._session.close()

    async def make_request(self, api: IEXCloudAPIServer, method: IEXMethod[IEXType], token: str) -> IEXType:
        session = ClientSession(connector=self._connector_type(**self._connector_init))

        url = api.api_url(payload=method.endpoint)

        if '?' in url:
            url += f'&token={token}'
        else:
            url += f'?token={token}'

        try:
            request_method = None
            payload = {
                'timeout': DEFAULT_TIMEOUT,
            }

            match method.request_type:
                case 'GET':
                    request_method = session.get
                case 'POST':
                    request_method = session.post
                case _ as unreachable:
                    assert_never(unreachable)

            async with request_method(url, **payload) as response:
                raw_result = await response.text()
        except asyncio.TimeoutError:
            raise IEXNetworkError(method=method, message="Request timeout error")
        except ClientError as e:
            raise IEXNetworkError(method=method, message=f"{type(e).__name__}: {e}")
        finally:
            await session.close()

        try:
            response = json.loads(raw_result)
        except Exception:
            raise IEXDecodeError(method=method, message=f"Failed to decode the object:\n{raw_result}")

        return response
