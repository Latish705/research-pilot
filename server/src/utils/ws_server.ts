// import { WebSocketServer, WebSocket } from "ws";
// import * as Y from "yjs";
// import { encodeStateAsUpdate, applyUpdate } from "yjs";

// // Create the WebSocket server
// export function createWebSocketServer(port: number) {
//   const wss = new WebSocketServer({ port });

//   // A map to store Yjs documents by document ID
//   const docs = new Map<string, Y.Doc>();

//   wss.on("connection", (ws, req) => {
//     // Extract document ID from the URL
//     const url = new URL(req.url || "", `ws://${req.headers.host}`);
//     const documentId = url.pathname.slice(1);

//     // Get or create the Yjs document for the given ID
//     let doc = docs.get(documentId);
//     if (!doc) {
//       doc = new Y.Doc();
//       docs.set(documentId, doc);
//     }

//     // Sync the current state of the document with the new client
//     const stateUpdate = encodeStateAsUpdate(doc);
//     ws.send(stateUpdate);

//     // Handle incoming updates from the client
//     ws.on("message", (message) => {
//       const update = new Uint8Array(message as Buffer);
//       applyUpdate(doc, update);

//       // Broadcast the update to other clients
//       wss.clients.forEach((client) => {
//         if (client !== ws && client.readyState === WebSocket.OPEN) {
//           client.send(update);
//         }
//       });
//     });

//     // Log disconnection
//     ws.on("close", () => {
//       console.log("Client disconnected");
//     });
//   });

//   console.log(`WebSocket server is running on ws://localhost:${port}`);
// }
