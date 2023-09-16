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
app = FastAPI()

app.include_router(food_router)
app.include_router(users_router)


