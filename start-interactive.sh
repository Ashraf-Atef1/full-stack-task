#!/bin/bash

echo "🚀 Nawy Apartments - Docker Setup Options"
echo ""
echo "Choose how you want to run the application:"
echo ""
echo "1️⃣  Quick Start (Default configuration)"
echo "   - No configuration files needed"
echo "   - Uses built-in default environment variables"
echo "   Command: docker-compose up --build"
echo ""
echo "2️⃣  Custom Configuration"
echo "   - Create .env.docker files to override defaults"
echo "   - Located at ./backend/.env.docker and ./frontend/.env.docker"
echo "   - Command: docker-compose -f docker-compose.override.yml up --build"
echo ""
echo "3️⃣  Manual Configuration"
echo "   - Edit environment variables directly in docker-compose.yml"
echo "   - Command: docker-compose up --build"
echo ""

read -p "Enter your choice (1-3) or press Enter for Quick Start: " choice

case $choice in
    1|"")
        echo ""
        echo "🚀 Starting with default configuration..."
        docker-compose up --build
        ;;
    2)
        if [ -f "./backend/.env.docker" ] && [ -f "./frontend/.env.docker" ]; then
            echo ""
            echo "🚀 Starting with custom .env.docker files..."
            docker-compose -f docker-compose.override.yml up --build
        else
            echo ""
            echo "❌ Custom .env.docker files not found!"
            echo "Please create:"
            echo "  - ./backend/.env.docker"
            echo "  - ./frontend/.env.docker"
            echo ""
            echo "Or run option 1 for default configuration."
            exit 1
        fi
        ;;
    3)
        echo ""
        echo "🚀 Starting with manual configuration..."
        echo "ℹ️  Make sure you've edited docker-compose.yml first"
        docker-compose up --build
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac
