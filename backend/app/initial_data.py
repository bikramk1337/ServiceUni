#!/usr/bin/env python3

from app.db.session import get_db
from app.db.crud import create_user
from app.db.schemas import UserCreate
from app.db.session import SessionLocal


def init() -> None:
    db = SessionLocal()

    create_user(
        db,
        UserCreate(
            email="admin@mail.com",
            password="admin",
            is_active=True,
            is_superuser=True,
            first_name="Admin",
            last_name="User",
        ),
    )
    create_user(
        db,
        UserCreate(
            email="user@mail.com",
            password="user",
            is_active=True,
            is_superuser=False,
            first_name="Normal",
            last_name="User",
        )
    )


if __name__ == "__main__":
    print("Creating superuser admin")
    init()
    print("Users created")
