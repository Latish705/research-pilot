import app from "../app";
import * as http from "http";
import WebSocket from "ws";


export function startWebSocketServer() {

    const server = http.createServer(app);
    const wss = new WebSocket.Server({ server });

    let activeConnections:any = [];

    wss.on("connection", (ws) => {
        activeConnections.push(ws);

        ws.on("message", (message) => {
            activeConnections.forEach((client:any) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message.toString());
                }
            });
        });

        ws.on("close", () => {
            activeConnections = activeConnections.filter((client:any) => client !== ws);
        });
    });
    const port = 8090;
    server.listen(port, () => console.log(`WebSocket server running on ws://localhost:${port}`));
}

