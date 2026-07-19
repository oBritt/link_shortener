

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


async def get_by_shortened(shortened: str, session: AsyncSession) -> Optional[LinksOrm]:
    query = select(LinksOrm).where(LinksOrm.shortened==shortened)
    result = await session.execute(query)
    link = result.scalar_one_or_none()
    return link
