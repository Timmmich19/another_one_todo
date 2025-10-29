from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.models.pydantic_models import Task, TaskCreate, TaskUpdate
from app.models.task import TaskStatus
from app import crud

router = APIRouter()

@router.get("/tasks", response_model=List[Task])
def read_tasks(
    status: Optional[TaskStatus] = Query(None, description="Фильтр по статусу"),
    db: Session = Depends(get_db)
):
    """
    Получить список задач с возможностью фильтрации по статусу
    """
    return crud.get_tasks(db, status=status)

@router.get("/tasks/{task_id}", response_model=Task)
def read_task(task_id: str, db: Session = Depends(get_db)):
    """
    Получить задачу по ID
    """
    task = crud.get_task(db, task_id)
    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    return task

@router.post("/tasks", response_model=Task, status_code=status.HTTP_201_CREATED)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    """
    Создать новую задачу
    """
    return crud.create_task(db, task)

@router.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: str, task_update: TaskUpdate, db: Session = Depends(get_db)):
    """
    Обновить задачу
    """
    task = crud.update_task(db, task_id, task_update)
    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    return task

@router.delete("/tasks/{task_id}")
def delete_task(task_id: str, db: Session = Depends(get_db)):
    """
    Удалить задачу
    """
    success = crud.delete_task(db, task_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    return {"message": "Task deleted successfully"}