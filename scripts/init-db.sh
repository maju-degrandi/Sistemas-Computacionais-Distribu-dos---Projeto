#!/bin/sh
current_dir=$(basename "$PWD")

# Check if the script is being run from the scripts directory
if [ "$current_dir" != "scripts" ]; then
  echo "Please run this script from the scripts directory."
  exit 1
fi

# Start database container
echo "Starting database container..."
docker compose up -d postgres

# Wait for the database to start
echo "Waiting for database to start..."
sleep 5

# Initialize the database
echo "Initializing database..."
cd ../packages/database
poetry run inv upgrade

echo "Stopping database container..."
docker compose down postgres

echo "Database initialized successfully!"