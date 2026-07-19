

from fastapi import APIRouter, HTTPException, Depends
from typing import Optional
from src.model import (
    ShortenerRequest,
    ShortenerResponse,
    LinkRequest,
    LinkResponse,
    StatsResponse
)
from pydantic import HttpUrl

from src.database.Repository import Repository

router = APIRouter()

@router.get("/")
async def root():
    return {"Hello": "World!"}

@router.post("/shorten")
async def shorten_url(request: ShortenerRequest) -> ShortenerResponse:

    password = request.password.get_secret_value() if request.password else None
    shortened_url = await Repository.shorten_url(str(request.url), password)

    return ShortenerResponse(ending=shortened_url)


@router.get("/get_link")
async def get_link(request: LinkRequest = Depends()) -> LinkResponse:
    try:
        password = request.password.get_secret_value() if request.password else None
        url = await Repository.get_url(request.ending, password)
        return LinkResponse(url=HttpUrl(url))

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )

@router.get("/stats/{ending}")
async def get_stats(ending: str) -> StatsResponse:
    return StatsResponse(ip=None, clicks=0)
