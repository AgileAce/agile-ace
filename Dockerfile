# Base image: Python 3.9
FROM python:3.9

# Copy Python requirements (not yet mapped in during execution of this script)
COPY backend/requirements.txt /usr/src/app/requirements.txt

# Install Python requirements (and ignore warnings lol)
RUN pip install -r /usr/src/app/requirements.txt --disable-pip-version-check --root-user-action=ignore

# Change working directory & start
WORKDIR /usr/src/app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80", "--reload"]
