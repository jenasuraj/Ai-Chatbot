from fastapi import APIRouter
from pydantic import BaseModel
from services.quest import graph
from langchain_core.messages import HumanMessage
class Text(BaseModel):
    input: str

router = APIRouter()

@router.post("/")
async def get_users(data: Text):
    print("data is", data.input)
    initial_state = {
        "messages":[HumanMessage(content=data.input)]
    }
    result = graph.invoke(initial_state)
    #print("the result is -->",result["messages"][-1].content)
    return {"result":result["messages"][-1].content}
