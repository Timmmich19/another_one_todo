from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from .task import TaskStatus

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None

class Task(TaskBase):
    id: str
    status: TaskStatus
    created_at: datetime
    
    class Config:
        from_attributes = True