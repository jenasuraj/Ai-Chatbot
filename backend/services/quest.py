from typing import Annotated
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START,END
from langgraph.graph.message import add_messages
from crewai import Agent,Task,Crew,LLM
from dotenv import load_dotenv
load_dotenv()
import os
from langchain_core.messages import AIMessage
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="openai/gpt-4o-mini",
    openai_api_key=os.getenv("OPENROUTER_API_KEY"),
    openai_api_base="https://openrouter.ai/api/v1",
    default_headers={
        "HTTP-Referer": "http://localhost",
        "X-Title": "trial"
    },
    temperature=0.7,
    max_tokens=300,
)


class State(TypedDict):
    messages:Annotated[list,add_messages]


def chatbot(state:State):
    user = state["messages"][0].content
    response = llm.invoke(user)
    return {
        "messages":state["messages"]+[AIMessage(content=response.content)]
    }


graph_builder = StateGraph(State)
graph_builder.add_node("chatbot",chatbot)
graph_builder.add_edge(START,"chatbot")
graph_builder.add_edge("chatbot",END)
graph = graph_builder.compile()