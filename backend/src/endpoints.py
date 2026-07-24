

from fastapi import Request, APIRouter, HTTPException, Depends
from fastapi.responses import RedirectResponse
from slowapi import Limiter
from slowapi.util import get_remote_address
from typing import Optional
from src.model import (
    ShortenerRequest,
    ShortenerResponse,
    LinkRequest,
    LinkResponse,
    StatsResponse,
    StatsRequest,
    AppStatsRequest,
    AppStatsResponse
)
from pydantic import HttpUrl

from src.database.Repository import Repository

router = APIRouter()

limiter = Limiter(key_func=get_remote_address)

@router.get("/")
async def root():
    return {"Hello": "World!"}

@router.post("/shorten")
@limiter.limit("10/minute")
async def shorten_url(request: Request, shortener_request: ShortenerRequest) -> ShortenerResponse:

    password = shortener_request.password.get_secret_value() if shortener_request.password else None
    shortened_url = await Repository.shorten_url(str(shortener_request.url), password)

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

@router.get("/stats")
@limiter.limit("10/minute")
async def get_stats(request: Request, stats_request: StatsRequest = Depends()) -> StatsResponse:
    try:
        stats = await Repository.get_stats(stats_request.ending)
        print(stats)
        return StatsResponse(ip=stats["ip"], 
                             clicks=stats["clicks"], 
                             link_created_at=stats["link_created_at"], 
                             clicked_at=stats["clicked_at"])
    
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )

@router.get("/appstats")
async def get_app_stats(request: AppStatsRequest = Depends()) -> AppStatsResponse:
    try:
        stats = await Repository.get_app_stats(request.secret)
        print(stats)
        return AppStatsResponse(total_links=stats["total_links"], 
                                total_clicks=stats["total_clicks"], 
                                total_password_protected_links=stats["total_password_protected_links"], 
                                total_unique_users=stats["total_unique_users"], 
                                total_monthly_users=stats["total_monthly_users"])
        
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )
