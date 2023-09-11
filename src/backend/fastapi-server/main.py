from fastapi import FastAPI, Request
from os import environ
from utils import mongo
import requests
import random
import bcrypt
import uuid
import jwt
from datetime import datetime
app = FastAPI()

client = mongo.get_database()
@app.get("/")
async def root():
    return {"message": "Hello World!"}

@app.get("/api/food/")
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

@app.post("/api/signup/user/")
async def create_user(request: Request):
    try:
        request_data = await request.json()
        user_database = client["TasteBuddies"]
        username = request_data.get("username")
        user_collection = user_database["Users"]
        password = request_data.get("password")
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode(), salt)
        user_data = {
            "username": username,
            "password": hashed_password.decode('ascii'),
        }
        user_database.user_collection.insert_one(user_data)
        return {
            "Message": "User created!",
            "status": 200
        }
    except ValueError as e:
        print(e)
        return {
            "Message": "Error occured while creating user!"
        }
    
@app.post("/api/signin/user/")
async def login_user(request: Request):
    jwt_secret = environ.get("JWTSECRET")
    request_data = await request.json()
    user_database = client["TasteBuddies"]
    user_collection = user_database["Users"]
    username = request_data.get("username")
    password = request_data.get("password").encode()
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password, salt)
    find_result = {"username": f"{username}"}
    
    result = user_database.user_collection.find_one(find_result)
    db_password = result.get("password").encode()
    
    if bcrypt.hashpw(password, hashed_password) == hashed_password:
        current_date_isostring = datetime.now().isoformat()
        login_jwt = jwt.encode({"username": f"{username}", "last_signed": f"{current_date_isostring}"}, jwt_secret, algorithm="HS256")
        response = {
            "jwt": login_jwt,
            "status_code": 200
        }
        return response
    

    
@app.post("/api/favorite/")
async def create_favorite(request: Request):
    body = await request.json()
    encoded_jwt = body.get("jwt")
    jwt_secret = environ.get("JWTSECRET")
    try: 
        jwt_decoded = jwt.decode(encoded_jwt, jwt_secret, algorithms=["HS256"])
        timestamp = datetime.fromisoformat(jwt_decoded.get("last_signed"))
        if timestamp.minute > 15:
            return {
                "message": "JWT expired!",
                "status_code": 403
            }
        item = body.get("favoritedItem")
        user_database = client["TasteBuddies"]
        favorites = user_database["Favorites"]
        user_data = {
            "username": jwt_decoded.get("username"),
            "favorited_item": item,
        }
        current_date_isostring = datetime.now().isoformat()
        updated_date = current_date_isostring
        username = jwt_decoded.get('username')
        new_jwt = jwt.encode({"username": f"{username}", "last_signed": f"{updated_date}"}, jwt_secret, algorithm="HS256")
        user_database.favorites.insert_one(user_data)
        response = {
            "jwt": new_jwt,
            "status_code": 200
        }
        return response
    except:
        return {
                "message": "Encountered issue while authenticating!",
                "status_code": 403
            }

@app.get("/api/favorites/")
async def get_favorites(request: Request):
    body = await request.json()
    encoded_jwt = body.get("jwt")
    jwt_secret = environ.get("JWTSECRET")
    try: 
        jwt_decoded = jwt.decode(encoded_jwt, jwt_secret, algorithms=["HS256"])
        timestamp = datetime.fromisoformat(jwt_decoded.get("last_signed"))
        if timestamp.minute > 15:
            return {
                "message": "JWT expired!",
                "status_code": 403
            }
        user_database = client["TasteBuddies"]
        favorites = user_database["Favorites"]
        current_date_isostring = datetime.now().isoformat()
        
        username = jwt_decoded.get('username')
        user_data = {
            "username": username,
            "last_signed": f"{current_date_isostring}"
        }
        new_jwt = jwt.encode(user_data, jwt_secret, algorithm="HS256")
        favorites_collection = []
        favorites_list = user_database.favorites.find({"username": f"{username}"}, {'_id': 0})
        for favorite in favorites_list:
            favorites_collection.append(favorite)
        response = {
            "jwt": new_jwt,
            "status_code": 200,
            "favorites": favorites_collection
        }
        
        return response
    except ValueError as e:
        return {
                "message": "Encountered issue while authenticating!",
                "status_code": 403
            }
        
