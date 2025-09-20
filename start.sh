#!/bin/bash

echo "🚀 Starting Nawy Apartments Application..."
echo "ℹ️  No configuration required - using default environment variables"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "🔧 Building and starting services..."
docker-compose up --build

echo ""
echo "🎉 Application started successfully!"
echo ""
echo "📍 Services:"
echo "   - Frontend: http://localhost:8000"
echo "   - Backend API: http://localhost:3000"
echo "   - API Documentation: http://localhost:3000/api"
echo "   - Database: localhost:5433"
echo ""
echo "🛑 To stop the application, press Ctrl+C"
