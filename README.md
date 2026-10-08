# 🔗 Link Shortener

A simple and modern URL shortener with password protection, click analytics, and a React frontend.

Built with **FastAPI** (backend) and **React + Vite** (frontend).

## Features

- Shorten long URLs into clean 8-character codes
- Optional password protection for links
- Click tracking (IP address + timestamp)
- Per-link statistics
- Application-wide statistics (protected)
- Rate limiting on key endpoints
- QR code generation
- Responsive frontend with React Router

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Backend   | FastAPI, SQLAlchemy (async), SQLite |
| Frontend  | React 19, Vite, React Router        |
| Database  | SQLite (`aiosqlite`)                |
| Auth      | Password hashing with `bcrypt`      |
| Rate Limit| `slowapi`                           |
| Other     | Pydantic, Uvicorn, qrcode.react     |

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/oBritt/link_shortener.git
cd link_shortener



# Create and activate virtual environment (recommended)
python -m venv venv
source venv/bin/activate        # Linux / macOS
# or
venv\Scripts\activate           # Windows


### 2. Backend
# Install dependencies
pip install -r requirements.txt

# Run the backend
cd backend
python -m src.main

The API will be available at: http://localhost:8000API 
docs (Swagger): http://localhost:8000/docs


### 3. Frontend
cd frontend/my-app
npm install
npm run dev

The frontend will be available at: http://localhost:5173

