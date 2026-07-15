from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"Hello": "World!"}

@app.get("/shorten")
async def shorten_url(url: str):
    ### TO DO
    return {"message": "URL shortened!", "short_url": f"http://g.ay/{hash(url)}"}