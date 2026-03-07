## Dockerized Deployment

The API is deployed using Docker and Docker Compose.

### Services

The stack includes:

* **FastAPI API** – served via Gunicorn with Uvicorn workers
* **PostgreSQL** – persistent database container
* **Nginx (host)** – reverse proxy for HTTPS

Architecture:

```
Internet
   ↓
Nginx (host)
   ↓
FastAPI container
   ↓
PostgreSQL container
```

### Running locally or on the server

Build and start services:

```
docker compose up -d --build
```

Check running containers:

```
docker compose ps
```

View logs:

```
docker compose logs -f api
```

Stop services:

```
docker compose down
```

### Notes

* FastAPI runs with:

```
gunicorn app.main:app -k uvicorn.workers.UvicornWorker
```

* Port `8000` is exposed for Nginx to proxy requests.
* PostgreSQL data is persisted via a Docker volume.

### Migration from systemd

Previously the API was managed via a `fastapi.service` systemd unit running Gunicorn directly. (Handling gunicorn hydra bug gave me a headache)
This was replaced with Docker to simplify deployment and dependency management.
