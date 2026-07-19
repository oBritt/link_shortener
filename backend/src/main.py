

from fastapi import FastAPI
from src.endpoints import router
import uvicorn
from src.database.orm import create_tables

app = FastAPI()

app.include_router(router)

if __name__ == "__main__":
    create_tables()
    uvicorn.run(
        "src.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )