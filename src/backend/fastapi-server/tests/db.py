from fastapi.testclient import TestClient
from ..main import app
client = TestClient(app)

def test_create_user():
    body = {
        "username": "tastebuddies",
        "password": "pizza"
    }
    response = client.post("/api/signup/user/", json=body)
    user = client.post("/api/signin/user/", json=body)
    jwt = user.get("jwt")
    delete_user = {
        "jwt": jwt
    }
    client.delete("/api/user/", json=delete_user)
    assert response.status_code == 201
