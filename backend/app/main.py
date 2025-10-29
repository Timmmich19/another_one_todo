from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import tasks
from app.database import create_tables

create_tables()

app = FastAPI(
    title="Task Manager API",
    description="Simple task management API",
    version="1.0.0"
)

# CORS для фронтенда
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "Another one TODO API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}