from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
from os import environ
from utils import mongo
import requests
import random
import bcrypt
import uuid
import jwt
from datetime import datetime
from models import user, favorite, food
from food import food_router
from users import users_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=environ.get("ALLOWEDORIGINS"),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(food_router)
app.include_router(users_router)


