import logging

from starlette.websockets import WebSocket


class ConnectionManager:
    def __init__(self, logger: logging.Logger = None):
        self._logger = logger or logging.getLogger("server")
        self.active_connections: dict[WebSocket: str] = {}

    async def connect(self, websocket: WebSocket, meeting: str):
        await websocket.accept()
        self.active_connections[websocket] = meeting

    def disconnect(self, websocket: WebSocket):
        del self.active_connections[websocket]

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str, meeting: str):
        for connection, link in self.active_connections.items():
            if link == meeting:
                await connection.send_text(message)
