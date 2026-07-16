

from fastapi import APIRouter
from model import (
    ShortenerRequest,
    ShortenerResponse
)

router = APIRouter()

@router.get("/")
async def root():
    return {"Hello": "World!"}

@router.post("/shorten")
async def shorten_url(request: ShortenerRequest) -> ShortenerResponse:
    return ShortenerResponse(ending="12345678")

@router.get("/{ending}")
def get_user(ending: str):
    return {"ending": ending}