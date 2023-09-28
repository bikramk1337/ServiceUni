from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .models import UserIn, UserOut, User  # import User as well
from .database import get_session
from .auth import verify_password, create_access_token

app = FastAPI()


@app.post("/login", response_model=UserOut)
def login(user: UserIn, session: Session = Depends(get_session)):
    db_user = session.query(User).filter(
        User.username == user.username).first()

    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")


    token = create_access_token(user.username)
    return UserOut(username=db_user.username, role=db_user.role, token=token)
