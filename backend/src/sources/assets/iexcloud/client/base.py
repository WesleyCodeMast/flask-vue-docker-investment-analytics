from .session import AiohttpSession

from ..methods import IEXMethod


class IEXCloudBase:
    session: AiohttpSession | None

    async def __call__(self, method: IEXMethod):
        pass
