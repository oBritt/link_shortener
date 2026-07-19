

from fastapi import APIRouter
from model import (
    ShortenerRequest,
    ShortenerResponse,
    StatsResponse
)

router = APIRouter()

@router.get("/")
async def root():
    return {"Hello": "World!"}

@router.post("/shorten")
async def shorten_url(request: ShortenerRequest) -> ShortenerResponse:
    return ShortenerResponse(ending="12345678")

@router.get("/{ending}")
async def get_url(ending: str):
    return {"url": "https://example.com/}"}

@router.get("/stats/{ending}")
async def get_stats(ending: str) -> StatsResponse:
    return StatsResponse(clicks=0)
