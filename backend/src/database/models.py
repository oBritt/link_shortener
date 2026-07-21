

from src.database.database import Base
from sqlalchemy.orm import mapped_column, Mapped
from sqlalchemy import Integer, String, ForeignKey, DateTime, func
from typing import Optional
from datetime import datetime

class LinksOrm(Base):
    __tablename__ = "links"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    link: Mapped[str] = mapped_column(
        String,
        nullable=False
    )

    password: Mapped[Optional[str]] = mapped_column(
        String,
        nullable=True,
        default=None
    )

    shortened: Mapped[Optional[str]] = mapped_column(
        String,
        nullable=True,
        default=None
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )


class ClicksOrm(Base):
    __tablename__ = "clicks"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    link_id: Mapped[int] = mapped_column(
        ForeignKey(LinksOrm.id),
        nullable=False
    )

    ip: Mapped[Optional[str]] = mapped_column(
        String,
        nullable=True,
        default=None
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )
