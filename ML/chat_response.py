from groq import Groq
import os
from dotenv import load_dotenv
load_dotenv()
key = os.getenv("GROQ_API_KEY")
client = Groq(
    api_key= key
)
# Function to generate chatbot response
def generate_response(query_text):
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": query_text}],
        temperature=1,
        max_completion_tokens=1024,
        top_p=1,
        stream=False,
        stop=None,
    )
    return completion.choices[0].message.content