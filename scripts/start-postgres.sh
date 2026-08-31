#!/bin/bash
# Start PostgreSQL for local development
export PATH="/tmp/pgsql2/pgsql/bin:$PATH"

# Check if already running
if pg_isready -q 2>/dev/null; then
  echo "PostgreSQL is already running"
else
  pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/logfile start
  echo "PostgreSQL started"
fi

echo "Connection: postgresql://postgres@localhost:5432/womanmedspa"