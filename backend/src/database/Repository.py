


import os
from typing import Optional
from datetime import timedelta, datetime
from src.database.database import async_session_factory
from src.database.queries import get_all_links, shorten_url, get_by_shortened, add_click, get_clicks_by_link_id
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

    @classmethod
    async def get_app_stats(cls, secret: str) -> dict:
        predefined_secret = os.getenv("SECRET_KEY", "denis")
        if secret != predefined_secret:
            raise ValueError("Invalid secret")
        
        async with async_session_factory() as session:
            orms = await get_all_links(session)

            if orms is None:
                raise ValueError("No data found")

            clicks = []
            for orm in orms:
                link_clicks = await get_clicks_by_link_id(orm.id, session)
                clicks.extend(link_clicks)

            total_links = len(orms)
            total_clicks = len(clicks)
            total_password_protected_links = sum(1 for orm in orms if orm.password is not None)
            total_unique_users = len(set(click.ip for click in clicks if click.ip is not None))  
            total_monthly_users = len(set(click.ip for click in clicks if click.ip is not None and click.created_at >= (datetime.now() - timedelta(days=30))))  
        

        return {
            "total_links": total_links,
            "total_clicks": total_clicks,
            "total_password_protected_links": total_password_protected_links,
            "total_unique_users": total_unique_users,
            "total_monthly_users": total_monthly_users
        }