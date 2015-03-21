FROM python:3.11

RUN mkdir /topfunds-backend

WORKDIR /topfunds-backend

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

ARG BUILD_VERSION=""
ENV BUILD_VERSION=${BUILD_VERSION}

WORKDIR src

CMD gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8000