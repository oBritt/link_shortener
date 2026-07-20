

from fastapi import Request, APIRouter, HTTPException, Depends
from fastapi.responses import RedirectResponse
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
async def get_link(link_request: LinkRequest = Depends(), http_request: Request = None) -> LinkResponse:
    try:
        ip = http_request.client.host if http_request.client else None
        password = link_request.password.get_secret_value() if link_request.password else None
        url = await Repository.get_url(link_request.ending, password, ip)
        return LinkResponse(url=HttpUrl(url))
        #return RedirectResponse(url=url)

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )

@router.get("/stats/{ending}")
async def get_stats(ending: str) -> StatsResponse:
    try:
        stats = await Repository.get_stats(ending)
        return StatsResponse(ip=stats["ip"], clicks=stats["clicks"])
    
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )    
    
    
