# 1. Use Python 3.10 as the base
FROM python:3.10

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy the requirements file first (for caching)
COPY requirements.txt .

# 4. Install the Python libraries
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of the application code
COPY . .

# 6. The command to start the server
# (host 0.0.0.0 is crucial for Docker)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
