
from models import food, favorite
from utils import mongo

from fastapi.responses import JSONResponse
from fastapi import status, APIRouter
from os import environ
from datetime import datetime, timedelta
import jwt
import bcrypt
import requests

client = mongo.get_database()
food_router = APIRouter(
    prefix="/api",
    tags= ["food"]
)
@food_router.post("/api/food/")
async def food_retrival(food_request: food.Food):
    api_key = environ.get("FOODAPIKEY")
    
    jwt_secret = environ.get("JWTSECRET")
    encoded_jwt = food_request.jwt
    # Combine all the diets into a comma seperated list to sastify all conditions
    diets = ",".join(food_request.diet_types).lower()
    # Attempts to decode a jwt to ensure its validity
    try:
        jwt_decoded = jwt.decode(encoded_jwt, jwt_secret, algorithms=["HS256"])
        # Grabs the existing iso string from the jwt to validate when it was last signed.
        timestamp = datetime.fromisoformat(jwt_decoded.get("last_signed"))
        # if timestamp.minute > 15:
        #     return {"message": "JWT expired!", "status_code": 403}
        user_database = client["TasteBuddies"]
        intolerances = user_database["intolerances"]
        username = jwt_decoded.get("username")

        # Creates a dictionary to find the user
        find_result = {"username": f"{username}"}
        result = user_database.intolerances.find_one(find_result)

        # Gets the ingridents to avoid, intolerances
        preferences_result = result.get("intolerances")
        intolerances_record = ",".join(preferences_result)
        current_date_isostring = datetime.now().isoformat()

        updated_date = current_date_isostring
        username = jwt_decoded.get("username")
        new_jwt = jwt.encode(
            {"username": f"{username}", "last_signed": f"{updated_date}"},
            jwt_secret,
            algorithm="HS256",
        )
        url = f"https://api.spoonacular.com/recipes/complexSearch?diet={diets}&number=10&addRecipeNutrition=true&addRecipeInformation=true&instructionsRequired=true&intolerances={intolerances_record}&apiKey={api_key}"
        request = requests.get(url).json()
        response = {"jwt": new_jwt, "status_code": 200, "data": request}
        return response
    except:
        return JSONResponse(status_code=status.HTTP_403_FORBIDDEN, content="Could not authenticate!")

@food_router.put("/api/intolerances/")
def create_preference(preferences_model: food.Preferences):
    encoded_jwt = preferences_model.encoded_jwt
    jwt_secret = environ.get("JWTSECRET")
    try:
        jwt_decoded = jwt.decode(encoded_jwt, jwt_secret, algorithms=["HS256"])
        timestamp = datetime.fromisoformat(jwt_decoded.get("last_signed"))
        current_date = datetime.now()
        # Fix timestamp issue
        # if timestamp > current_date - timedelta(minutes=15):
        #     return {"message": "JWT expired!", "status_code": 403}
        intolerances_data = preferences_model.intolerances
        user_database = client["TasteBuddies"]
        intolerances = user_database["intolerances"]
        username = jwt_decoded.get("username")
        find_result = {"username": f"{username}"}
        user_data = {
            "username": username,
            "intolerances": intolerances_data,
        }
        current_date_isostring = datetime.now().isoformat()
        updated_date = current_date_isostring

        new_jwt = jwt.encode(
            {"username": f"{username}", "last_signed": f"{updated_date}"},
            jwt_secret,
            algorithm="HS256",
        )
        if user_database.intolerances.count_documents(find_result) >= 1:
            user_database.intolerances.delete_many(find_result)
            user_database.intolerances.insert_one(user_data)
        else:
            user_database.intolerances.insert_one(user_data)
        response = {"jwt": new_jwt}
        return JSONResponse(status_code=status.HTTP_200_OK, content=response)
    except:
        return JSONResponse(status_code=status.HTTP_403_FORBIDDEN, content="Could not authenticate!")

@food_router.get("/api/favorites/")
def get_favorites(favorite: favorite.GetFavorite):
    encoded_jwt = favorite.encoded_jwt
    jwt_secret = environ.get("JWTSECRET")
    try:
        jwt_decoded = jwt.decode(encoded_jwt, jwt_secret, algorithms=["HS256"])
        timestamp = datetime.fromisoformat(jwt_decoded.get("last_signed"))
        # if timestamp.minute > 15:
        #     return {"message": "JWT expired!", "status_code": 403}
        user_database = client["TasteBuddies"]
        favorites = user_database["Favorites"]
        current_date_isostring = datetime.now().isoformat()

        username = jwt_decoded.get("username")
        user_data = {"username": username, "last_signed": f"{current_date_isostring}"}
        new_jwt = jwt.encode(user_data, jwt_secret, algorithm="HS256")
        favorites_collection = []
        favorites_list = user_database.favorites.find(
            {"username": f"{username}"}, {"_id": 0}
        )
        for favorite in favorites_list:
            favorites_collection.append(favorite)
        response = {
            "jwt": new_jwt,
            "favorites": favorites_collection,
        }
        return JSONResponse(status_code=status.HTTP_200_OK, content=response)
    except:
        return JSONResponse(status_code=status.HTTP_403_FORBIDDEN, content="Could not authenticate!")

@food_router.post("/api/favorite/")
def create_favorite(new_favorite: favorite.NewFavorite):
    encoded_jwt = new_favorite.encoded_jwt
    jwt_secret = environ.get("JWTSECRET")
    try:
        jwt_decoded = jwt.decode(encoded_jwt, jwt_secret, algorithms=["HS256"])
        timestamp = datetime.fromisoformat(jwt_decoded.get("last_signed"))
        # if timestamp.minute > 15:
        #     return {"message": "JWT expired!", "status_code": 403}
        item = new_favorite.favorited_item
        user_database = client["TasteBuddies"]
        favorites = user_database["Favorites"]
        username = jwt_decoded.get("username")
        user_data = {
            "username": username,
            "favorited_item": item,
        }
        current_date_isostring = datetime.now().isoformat()
        updated_date = current_date_isostring
        new_jwt = jwt.encode(
            {"username": f"{username}", "last_signed": f"{updated_date}"},
            jwt_secret,
            algorithm="HS256",
        )
        user_database.favorites.insert_one(user_data)
        response = {"jwt": new_jwt, "status_code": 200}
        return response
    except:
        return {
            "message": "Encountered issue while authenticating!",
            "status_code": 403,
        }
