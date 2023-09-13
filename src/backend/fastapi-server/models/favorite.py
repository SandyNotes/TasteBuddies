from fastapi import FastAPI
from pydantic import BaseModel


class NewFavorite(BaseModel):
    encoded_jwt: str
    favorited_item: list


class GetFavorite(BaseModel):
    encoded_jwt: str
