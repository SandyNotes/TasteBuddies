from fastapi import FastAPI
from pydantic import BaseModel


class Food(BaseModel):
    jwt: str


class Preferences(BaseModel):
    encoded_jwt: str
    ingrident_types_to_avoid: list
