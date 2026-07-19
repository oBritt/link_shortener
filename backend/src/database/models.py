

from database import Base
from sqlalchemy.orm import mapped_column, Mapped
from sqlalchemy import Integer, String
from typing import Optional

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

    shortened: Mapped[str] = mapped_column(
        String,
        nullable=False
    )

    clicks: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0
    )