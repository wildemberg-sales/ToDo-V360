echo "Waiting for PostgreSQL to be ready..."

while ! nc -z db 5432; do
    echo "PostgreSQL is not ready yet... waiting 2 seconds."
    sleep 2
done

echo "PostgreSQL is ready, running migrations..."
rails db:migrate

# Remove stale PID file if it exists
if [ -f /api/tmp/pids/server.pid ]; then
    echo "Removing stale PID file."
    rm /api/tmp/pids/server.pid
fi

echo "Starting the application..."
bundle exec rails s -p 3000 -b '0.0.0.0'