from enum import Enum as PyEnum
from sqlalchemy import Column, Integer, String, Enum as SQLAlchemyEnum
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel

Base = declarative_base()

class UserRoleSQLAlchemy(PyEnum):
    STUDENT = "student"
    TEACHER = "teacher"
    EMPLOYEE = "employee"

class UserRolePydantic(PyEnum):
    STUDENT = "student"
    TEACHER = "teacher"
    EMPLOYEE = "employee"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(SQLAlchemyEnum(UserRoleSQLAlchemy), nullable=False)  # Corrected line

class UserIn(BaseModel):
    username: str
    password: str
    role: UserRolePydantic

class UserOut(BaseModel):
    username: str
    role: str
    token: str
