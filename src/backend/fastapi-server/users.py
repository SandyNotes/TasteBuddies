
from models import user
from utils import mongo

from fastapi.responses import JSONResponse
from fastapi import status, APIRouter
from os import environ
from datetime import datetime
import jwt
import bcrypt

client = mongo.get_database()
users_router = APIRouter(
    prefix="/api",
    tags= ["food"]
)
@users_router.post("/api/signup/user/")
def create_user(new_user: user.User):
    try:
        user_database = client["TasteBuddies"]
        username = new_user.username
        user_collection = user_database["Users"]
        password = new_user.password.encode()
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password, salt)
        user_data = {
            "username": username,
            "password": hashed_password.decode("ascii"),
        }
        find_result = {"username": f"{username}"}
        if user_database.user_collection.count_documents(find_result) >= 1:
            return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="User already exists!")
        elif user_database.user_collection.count_documents(find_result) <= 0:
            user_database.user_collection.insert_one(user_data)
        return JSONResponse(status_code=status.HTTP_201_CREATED, content="User created!")
    except:
       return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="Could not create user!")


@users_router.post("/api/signin/user/")
def login_user(new_user: user.User) -> None:
    try:
        jwt_secret = environ.get("JWTSECRET")
        user_database = client["TasteBuddies"]
        user_collection = user_database["Users"]
        username = new_user.username
        password = new_user.password.encode()
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password, salt)
        find_result = {"username": f"{username}"}

        result = user_database.user_collection.find_one(find_result)
        db_password = result.get("password").encode()

        if bcrypt.hashpw(password, hashed_password) == hashed_password:
            current_date_isostring = datetime.now().isoformat()
            login_jwt = jwt.encode(
                {"username": f"{username}", "last_signed": f"{current_date_isostring}"},
                jwt_secret,
                algorithm="HS256",
            )
            response = {"jwt": login_jwt, "status_code": 200}
            return JSONResponse(status_code=status.HTTP_200_OK, content=response)
    except:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="Error occured while signing in!")

@users_router.delete("/api/user/")
def delete_user(deleting_user: user.DeleteUser):
    encoded_jwt = deleting_user.encoded_jwt
    jwt_secret = environ.get("JWTSECRET")
    try:
        jwt_decoded = jwt.decode(encoded_jwt, jwt_secret, algorithms=["HS256"])
        timestamp = datetime.fromisoformat(jwt_decoded.get("last_signed"))
        # if timestamp.minute > 15:
        #     return {"message": "JWT expired!", "status_code": 403}
        
        user_database = client["TasteBuddies"]
        user_collection = user_database["Users"]
        username = jwt_decoded.get("username")
        find_result = {"username": f"{username}"}
        user_collection.delete_one(find_result)
        response = {"message": "User deleted!", "status_code": 200}
        return response
    except:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="Could not delete user!")