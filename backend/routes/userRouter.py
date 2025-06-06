from fastapi import APIRouter
from pydantic import BaseModel

class Text(BaseModel):
    input: str

router = APIRouter()

@router.post("/")
async def get_users(data: Text):
    print("data is", data.input)
    return {"message": f"You sent: {data.input}"}
