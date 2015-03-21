FROM python:3.11

RUN mkdir /topfunds-backend

WORKDIR /topfunds-backend

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

ARG BUILD_VERSION=""
ENV BUILD_VERSION=${BUILD_VERSION}

WORKDIR src

CMD celery --app=core.celery:app flower
