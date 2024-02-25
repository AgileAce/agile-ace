import logging

INTERVAL = 0.5  # seconds


class ClientManager:
    def __init__(self, logger: logging.Logger = None):
        self._logger = logger or logging.getLogger("server")
        self._clients = {}
