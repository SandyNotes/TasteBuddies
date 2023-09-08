from fastapi import FastAPI
from os import environ
import requests
import random
app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World!"}

@app.get("/food/")
async def food_retrival():
    api_key = environ.get("FOODAPIKEY")
    size = ""
    cusines = []
    with open("cuisine.txt", "r") as file1:
        read_content = file1.read()
        cusines = read_content.split()
    cusine = random.choice(cusines)
    url = f"https://api.spoonacular.com/recipes/complexSearch?cuisine={cusine}&number=2&addRecipeNutrition=true&addRecipeInformation=true&instructionsRequired=true&apiKey={api_key}"
    request = requests.get(url).json()
    return request