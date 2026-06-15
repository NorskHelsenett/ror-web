#!/bin/bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

cd "$ROOT_DIR"

echo "Starting Docker Compose API services (detached)..."
if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
  docker compose --profile api up --detach
else
  echo "WARN: Docker Compose not available; skipping 'docker compose --profile api up'."
fi

cleanup() {
  if [[ "${KEEP_COMPOSE:-}" == "1" ]]; then
    echo "KEEP_COMPOSE=1 set; leaving Docker Compose services running."
    return
  fi

  if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
    echo "Stopping Docker Compose API services..."
    docker compose --profile api down
  fi
}
trap cleanup EXIT INT TERM

echo "Starting Next.js dev server (@ror/web) with API..."
exec env NEXT_PUBLIC_MOCKING_ENABLED=false npm --workspace @ror/web run dev
