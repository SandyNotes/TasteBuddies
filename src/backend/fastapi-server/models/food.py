from fastapi import FastAPI
from pydantic import BaseModel


class Food(BaseModel):
    jwt: str
    diet_types: list


class Preferences(BaseModel):
    encoded_jwt: str
    intolerances: list
