FROM python:3.11-slim
LABEL Owner 'SandyNotes'

# set the working directory in the container
WORKDIR /backend/fastapi-server

# copy the content of the local src directory to the working directory
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

#It will expose the FastAPI application on port `8000` inside the container
EXPOSE 8443
#It is the command that will start and run the FastAPI application container
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8443"]