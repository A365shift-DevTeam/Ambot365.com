#!/bin/sh
set -e

BACKUP_FILE="/docker-entrypoint-initdb.d/a365shift_db.backup"

if [ -f "$BACKUP_FILE" ]; then
  echo "Restoring PostgreSQL backup from $BACKUP_FILE"
  pg_restore --verbose --no-owner --no-acl --dbname="$POSTGRES_DB" "$BACKUP_FILE"
else
  echo "Backup file not found at $BACKUP_FILE; skipping restore"
fi
