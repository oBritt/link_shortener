

from typing import Optional
from src.database.database import async_session_factory
from src.database.queries import shorten_url, get_by_shortened, add_click, get_clicks_by_link_id
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
            orm = await get_by_shortened(shortened, session)

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

            url = orm.link
            await add_click(orm.id, ip, session)

        return str(url)

    
    @classmethod
    async def get_stats(cls, shortened: str) -> dict:
        async with async_session_factory() as session:
            orm = await get_by_shortened(shortened, session)
            created_at = orm.created_at

            if orm is None:
                raise ValueError("Link not found")

            clicks = await get_clicks_by_link_id(orm.id, session)

        return {
            "clicks": len(clicks),
            "link_created_at": created_at,
            "ip": [click.ip for click in clicks],
            "clicked_at": [click.created_at for click in clicks]
        }