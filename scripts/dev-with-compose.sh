#!/bin/bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

cd "$ROOT_DIR"

echo "Starting Docker Compose services (detached)..."
if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
  docker compose up --detach
else
  echo "WARN: Docker Compose not available; skipping 'docker compose up'."
fi

cleanup() {
  if [[ "${KEEP_COMPOSE:-}" == "1" ]]; then
    echo "KEEP_COMPOSE=1 set; leaving Docker Compose services running."
    return
  fi

  if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
    echo "Stopping Docker Compose services..."
    docker compose down
  fi
}
trap cleanup EXIT INT TERM

echo "Starting Next.js dev server (@ror/web)..."
exec npm --workspace @ror/web run dev
