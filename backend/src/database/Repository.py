

from typing import Optional
from src.database.database import async_session_factory
from src.database.queries import shorten_url, get_by_shortened
from src.database.utils import check_password

class Repository:

    @classmethod
    async def shorten_url(cls, link:str, password:Optional[str]) -> str:
        async with async_session_factory() as session:
            shortened_url = await shorten_url(link, password, session)
        return shortened_url


    @classmethod
    async def get_url(cls, shortened: str, password: Optional[str], ip: Optional[str]) -> str:
        async with async_session_factory() as session:
            orm = await get_by_shortened(shortened, session, True, ip)

        if orm is None:
            raise ValueError("Link not found")

        if password is None and orm.password is not None:
            raise ValueError("Password required")

        if (
            orm.password is not None
            and password is not None
            and not check_password(orm.password, password)
        ):
            raise ValueError("Incorrect password")

        return orm.link
    
    @classmethod
    async def get_stats(cls, shortened: str) -> dict:
        async with async_session_factory() as session:
            orm = await get_by_shortened(shortened, session, False, None)

        if orm is None:
            raise ValueError("Link not found")

        return {
            "clicks": orm.clicks,
            "ip": orm.ip
        }