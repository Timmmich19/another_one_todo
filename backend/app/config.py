from pydantic import BaseModel

class Settings(BaseModel):
    app_name: str = "Task Manager API"
    database_url: str = "sqlite:///./tasks.db"
    
    class Config:
        env_file = ".env"

settings = Settings()