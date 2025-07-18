from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router import ai_router

app = FastAPI()

origins = [
    "http://43.201.67.86:5173",
    "http://43.201.67.86:8090"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_router.router)

if __name__=="__main__":
    import uvicorn
    uvicorn.run("main:app", reload=True, host="0.0.0.0", port=8000)