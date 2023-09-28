import os
import bcrypt
import jwt
from datetime import datetime, timedelta

# constants
SECRET_KEY = os.getenv("SECRET_KEY")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def hash_password(password: str, rounds: int = 12):
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=rounds)).decode()


def verify_password(password: str, hashed_pw: str):
    return bcrypt.checkpw(password.encode(), hashed_pw.encode())


def create_access_token(username: str):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    data = {"sub": username, "exp": expire}

    # Encode the JWT using the secret key
    token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
    return token
