

from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from src.database.models import LinksOrm, ClicksOrm
from src.database.utils import id_to_link, hash_password
from sqlalchemy import select

async def shorten_url(link: str, password: Optional[str], session: AsyncSession) -> str:
    l = LinksOrm(
        link=link,
        password=hash_password(password) if password is not None else None,
    )
    session.add(l)
    await session.commit()
    await session.refresh(l)

    new_id = l.id
    shortened = id_to_link(new_id)
    l.shortened = shortened
    await session.commit()
    return shortened


async def get_by_shortened(shortened: str, session: AsyncSession) -> Optional[LinksOrm]:
    query = select(LinksOrm).where(LinksOrm.shortened==shortened)
    result = await session.execute(query)
    link = result.scalar_one_or_none()
    return link


async def add_click(link_id: int, ip: Optional[str], session: AsyncSession) -> None:
    orm = ClicksOrm(
        link_id=link_id,
        ip=ip
    )
    session.add(orm)
    await session.commit()


async def get_clicks_by_link_id(link_id: int, session: AsyncSession) -> list[ClicksOrm]:
    query = (
        select(ClicksOrm)
        .where(ClicksOrm.link_id==link_id)
    )
    result = await session.execute(query)
    clicks = list(result.scalars().all())
    return clicks

async def get_all_links(session: AsyncSession) -> list[LinksOrm]:
    query = select(LinksOrm)
    result = await session.execute(query)
    links = list(result.scalars().all())
    return links