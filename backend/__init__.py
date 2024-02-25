import logging.config
from datetime import datetime

logging_config = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "default": {
            "format": "%(asctime)s | %(name)-14s | %(levelname)-5s | %(filename)-21s | %(message)s",
            "datefmt": "%Y-%m-%d %H:%M:%S",
        }
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "default",
            "stream": "ext://sys.stdout",
        },
        "file_handler": {
            "class": "logging.FileHandler",
            "filename": f"log/{datetime.now().strftime('%Y-%m-%d')}.log",
            "formatter": "default",
        },
    },
    "loggers": {
        "uvicorn": {
            "level": "INFO",
            "handlers": ["console", "file_handler"],
        },
        "database": {
            "level": "INFO",
            "handlers": ["console", "file_handler"],
        },
        "server": {
            "level": "INFO",
            "handlers": ["console", "file_handler"],
        }
    }
}

logging.config.dictConfig(logging_config)
