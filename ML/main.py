from fastapi import FastAPI
from pydantic import BaseModel
from groq import Groq
from kaggle_datasets import get_kaggle_datasets
from chat_response import generate_response
from research_papers import get_research_papers
import os
# Initialize FastAPI
app = FastAPI()



# Define request model
class QueryRequest(BaseModel):
    text: str  # Example: "AI in healthcare"

# Endpoint: Chat with AI
@app.post("/chat")
async def chat_with_bot(request: QueryRequest):
    query_text = request.text
    papers_list = get_research_papers(request.text)
    datasets = get_kaggle_datasets(request.text)
    response = generate_response(f"Provide insights on {query_text}.")
    return {"response": response, "papers": papers_list , "datasets": datasets}

# Endpoint: Get Research Papers
@app.post("/research_papers")
async def fetch_research_papers(request: QueryRequest):
    papers_list = get_research_papers(request.text)
    return {"papers": papers_list}

# Endpoint: Get Kaggle Datasets
@app.post("/kaggle_datasets")
async def fetch_kaggle_datasets(request: QueryRequest):
    datasets = get_kaggle_datasets(request.text)
    return {"datasets": datasets}

# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
