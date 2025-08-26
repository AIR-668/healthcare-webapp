# Healthcare Web Application

A modern healthcare management web application built with Next.js (frontend) and FastAPI (backend). This application allows healthcare professionals to manage patients, create healthcare sessions, and collect feedback.

## Features

- **Patient Management**: Create and view patient records with medical history
- **Healthcare Sessions**: Start sessions for patients, add diagnosis and treatment plans
- **Feedback System**: Collect and manage feedback for completed sessions
- **Modern UI**: Clean, responsive interface built with Tailwind CSS
- **API-First Architecture**: RESTful API with automatic documentation

## Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **SQLite** - Lightweight database (configurable)
- **Pydantic** - Data validation using Python type annotations

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd healthcare-webapp
   ```

2. **Start the application**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

4. **Initialize sample data**
   ```bash
   docker-compose run db-init
   ```

### Local Development

#### Backend Setup
```bash
cd api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python seed.py  # Create sample data
uvicorn main:app --reload
```

#### Frontend Setup
```bash
cd web
npm install
npm run dev
```

## Project Structure

```
healthcare-webapp/
├─ web/                    # Next.js Frontend
│  ├─ app/                 # App Router pages
│  │  ├─ layout.tsx        # Root layout
│  │  ├─ page.tsx          # Home page (patient list)
│  │  ├─ feedback/         # Feedback page
│  │  └─ session/[id]/     # Session detail page
│  ├─ lib/                 # Utilities and types
│  │  ├─ api.ts           # API client
│  │  └─ types.ts         # TypeScript types
│  └─ package.json        # Dependencies
├─ api/                   # FastAPI Backend
│  ├─ main.py            # FastAPI application
│  ├─ models.py          # SQLAlchemy models
│  ├─ schemas.py         # Pydantic schemas
│  ├─ database.py        # Database configuration
│  ├─ seed.py            # Sample data creation
│  └─ requirements.txt   # Python dependencies
├─ docker-compose.yml    # Docker orchestration
└─ README.md            # This file
```

## API Endpoints

### Patients
- `GET /patients` - List all patients
- `GET /patients/{id}` - Get patient by ID
- `POST /patients` - Create new patient

### Sessions
- `GET /sessions` - List all sessions
- `GET /sessions/{id}` - Get session by ID
- `POST /sessions` - Create new session
- `PUT /sessions/{id}` - Update session

### Feedback
- `POST /sessions/{id}/feedback` - Submit feedback for session

## Sample Data

The application includes sample data with:
- 5 sample patients with various medical histories
- Multiple healthcare sessions with diagnoses and treatment plans
- Realistic medical scenarios for testing

## Configuration

### Environment Variables

#### Frontend (web/.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

#### Backend (api/.env)
```env
DATABASE_URL=sqlite:///./healthcare.db
```

## Development

### Adding New Features

1. **Backend**: Add new endpoints in `main.py`, models in `models.py`, and schemas in `schemas.py`
2. **Frontend**: Create new pages in `app/`, update API client in `lib/api.ts`, and add types in `lib/types.ts`

### Database Changes

1. Modify models in `models.py`
2. Generate migration: `alembic revision --autogenerate -m "description"`
3. Apply migration: `alembic upgrade head`

## Deployment

### Production Deployment

1. **Update environment variables** for production
2. **Build and deploy containers**:
   ```bash
   docker-compose -f docker-compose.prod.yml up --build -d
   ```

### Database

For production, consider using PostgreSQL instead of SQLite:
```env
DATABASE_URL=postgresql://user:password@localhost/healthcare_db
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Commit your changes: `git commit -am 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue on GitHub or contact the development team.
