from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

# SQLite sync database
sync_engine = create_engine(
    "sqlite:///./database.db",
    echo=False,
    connect_args={"check_same_thread": False}
)

session_factory = sessionmaker(
    bind=sync_engine,
    autoflush=False,
    autocommit=False
)

# SQLite async database
async_engine = create_async_engine(
    "sqlite+aiosqlite:///./database.db",
    echo=False
)

async_session_factory = async_sessionmaker(
    bind=async_engine,
    autoflush=False,
    autocommit=False
)


class Base(DeclarativeBase):

    repr_first_cols: int = 3
    repr_cols: tuple[str] = tuple()

    def __repr__(self):
        """Readable representation for debugging"""
        cols = []
        for idx, col in enumerate(self.__table__.columns.keys()):
            if col in self.repr_cols or idx < self.repr_first_cols:
                cols.append(f"{col}={getattr(self, col)}")
        return f"<{self.__class__.__name__} {', '.join(cols)}>"