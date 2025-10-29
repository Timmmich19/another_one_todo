from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List
from .task import TaskStatus

class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200, example="Сделать back на FastAPI")
    description: Optional[str] = Field(None, max_length=1000, example="Начать с базы")

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200, example="Обновлённое название")
    description: Optional[str] = Field(None, max_length=1000, example="Обновлённое описание")
    status: Optional[TaskStatus] = Field(None, example=TaskStatus.IN_PROGRESS)

class Task(TaskBase):
    id: str = Field(..., example="550e8400-e29b-41d4-a716-446655440000")
    status: TaskStatus = Field(..., example=TaskStatus.PENDING)
    created_at: datetime = Field(..., example="2024-01-01T12:00:00Z")
    
    class Config:
        from_attributes = True