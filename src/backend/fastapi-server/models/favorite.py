from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict

class NewFavorite(BaseModel):
    encoded_jwt: str
    favorited_item: Dict


class GetFavorite(BaseModel):
    encoded_jwt: str
