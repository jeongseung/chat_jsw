from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router import ai_router

app = FastAPI()

origins = [
<<<<<<< HEAD
    "http://localhost:5000",
=======
    "http://localhost:5173",
>>>>>>> 54271c89f25123f4bb882eb54f22b800964a05ba
    "http://localhost:8090"
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