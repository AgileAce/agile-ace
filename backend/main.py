import logging

import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles
from starlette.websockets import WebSocket, WebSocketDisconnect

from __init__ import logging_config
from router import router
from connection_manager import ConnectionManager

import database  # required to set up db

_logger = logging.getLogger("server")


def create_app() -> FastAPI:
    new_app = FastAPI()
    new_app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    new_app.include_router(router)
    new_app.mount("/", StaticFiles(directory="react-app", html=True), name="App")
    return new_app


app = create_app()
manager = ConnectionManager()


@app.websocket("/ws/{meeting}")
async def websocket_endpoint(websocket: WebSocket, meeting: str):
    _logger.info(f"Received WebSocket connection request for meeting: {meeting}")
    await manager.connect(websocket, meeting)
    _logger.info(f"websocket client was connected")
    try:
        # notify other clients
        await manager.broadcast("CONNECTED", meeting)
        while True:
            pass  # do nothing...
    except WebSocketDisconnect:
        _logger.info(f"websocket client # was disconnected")
        manager.disconnect(websocket)

        # notify other clients
        await manager.broadcast("DISCONNECTED", meeting)


if __name__ == "__main__":
    _logger.info(f"Starting server locally")
    uvicorn.run(app, host="localhost", port=5000, log_config=logging_config)
