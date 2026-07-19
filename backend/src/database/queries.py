

from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from src.database.models import LinksOrm
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


async def get_by_shortened(shortened: str, session: AsyncSession, need_to_upade: bool, ip: Optional[str]) -> Optional[LinksOrm]:
    query = select(LinksOrm).where(LinksOrm.shortened==shortened)
    result = await session.execute(query)
    link = result.scalar_one_or_none()

    if link and need_to_upade:
        link.clicks += 1
        if ip:
            link.ip = link.ip or []
            link.ip.append(ip)
        await session.commit()
        await session.refresh(link)

    return link
