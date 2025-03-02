from fastapi import FastAPI
from pydantic import BaseModel
from groq import Groq
from kaggle_datasets import get_kaggle_datasets
from chat_response import generate_response
from research_papers import get_research_papers
import os
import spacy

# Load spaCy English model for keyword extraction
nlp = spacy.load("en_core_web_sm")

# Initialize FastAPI
app = FastAPI()

# Define request model
class QueryRequest(BaseModel):
    text: str  # Example: "AI in healthcare"

# Function to extract keywords from a query and return as a string
def extract_keywords(text):
    doc = nlp(text)
    keywords = [token.text for token in doc if token.pos_ in {"NOUN", "PROPN"}]
    return " ".join(keywords)  # Convert list to space-separated string

# Endpoint: Chat with AI
@app.post("/research_chat")
async def chat_with_bot(request: QueryRequest):
    query_text = request.text
    
    # Extract keywords as a string
    keywords = extract_keywords(query_text)
    
    # Use keywords for better search
    papers_list = get_research_papers(keywords)
    datasets = get_kaggle_datasets(keywords)
    response = generate_response(f"Provide insights on {query_text}.")
    
    return {"response": response, "papers": papers_list, "datasets": datasets, "keywords": keywords}


@app.post("/chat")
async def chat_with_bot(request: QueryRequest):
    query_text = request.text
    
    response = generate_response(f"Provide Recommendation on {query_text}.Give keyword only for better results.")
    
    return {"response": response}

# Endpoint: Get Research Papers
@app.post("/research_papers")
async def fetch_research_papers(request: QueryRequest):
    keywords = extract_keywords(request.text)
    papers_list = get_research_papers(keywords)
    return {"papers": papers_list, "keywords": keywords}

# Endpoint: Get Kaggle Datasets
@app.post("/kaggle_datasets")
async def fetch_kaggle_datasets(request: QueryRequest):
    keywords = extract_keywords(request.text)
    datasets = get_kaggle_datasets(keywords)
    return {"datasets": datasets, "keywords": keywords}



# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
