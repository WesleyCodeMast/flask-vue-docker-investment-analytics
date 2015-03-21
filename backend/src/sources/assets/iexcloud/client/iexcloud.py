from .session import AiohttpSession
from .api import IEXCloudAPIServer
from .stock import IEXCloudStock

from ..methods import IEXMethod


class IEXCloud(IEXCloudStock):
    def __init__(self, token: str, session: AiohttpSession = None) -> None:
        """
        IEXCloud class

        :param token: IEXCloud API token
        :param session: HTTP Client session
        """

        if not session:
            session = AiohttpSession()

        self.session = session
        self.api = IEXCloudAPIServer(base_url='https://cloud.iexapis.com/stable/')
        self.__token = token

    async def __call__(self, method: IEXMethod):
        """
        Call API method

        :param method:
        :return:
        """
        return await self.session.make_request(self.api, method, self.__token)
