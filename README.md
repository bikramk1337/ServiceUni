# SERVICE UNI
### University of Wollongong

Developed as a part of `Service Oriented Software Engineering (CSCI 927)` 
### Quick Start

Starting the project with hot-reloading enabled
(the first time it will take a while):

```bash
docker compose up -d
```

To run the alembic migrations (for the users table):

```bash
docker compose run --rm backend alembic upgrade head
```

Alternatively, there is a build script to simplify setup:

To make the script executable:
```bash
chmod +x scripts/build.sh
```

Run the build script:
```bash
./scripts/build.sh
```

And navigate to http://localhost


Auto-generated FastAPI docs will be at
http://localhost:8000/api/docs

### Rebuilding containers:

```
docker compose build
```

### Restarting containers:

```
docker compose restart
```

### Bringing containers down:

```
docker compose down
```

### Frontend Development



### Frontend Tests


## Migrations

Migrations are run using alembic. To run all migrations:

```
docker compose run --rm backend alembic upgrade head
```

To create a new migration:

```
alembic revision -m "create users table"
```


## Testing

There is a helper script for backend test:

```
./scripts/test.sh
```

### Backend Tests

```
docker-compose run backend pytest
```

any arguments to pytest can also be passed after this command

### Frontend Tests


## Logging

```
docker compose logs
```

Or for a specific service:

```
docker compose logs -f name_of_service backend|db
```