

from database import Base, sync_engine, session_factory
from sqlalchemy import inspect
import logging


def tables_exist(engine) -> bool:
    """Check if 'users' table exists in the given engine."""
    inspector = inspect(engine)
    return inspector.has_table("links")


def create_tables(engine=sync_engine):
    engine.echo = False

    if tables_exist(engine):
        logging.info("Tables already exist. Skipping creation.")
        engine.echo = True
        return

    logging.info("Creating tables...")
    Base.metadata.create_all(engine)


    engine.echo = True
