from fastapi import FastAPI, WebSocket
from typing import List

app = FastAPI()
active_connections: List[WebSocket] = []

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            for connection in active_connections:
                if connection != websocket:
                    await connection.send_text(data)
    except:
        active_connections.remove(websocket)


# uvicorn server:app --host 0.0.0.0 --port 8002 --reload