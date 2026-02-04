#!/usr/bin/env bash
# AuditClaw Setup Script
# Creates required host directories for AuditClaw container volumes
#
# Usage:
#   ./scripts/setup-auditclaw.sh
#   ./scripts/setup-auditclaw.sh --with-skills  # Also clone community skills repo

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

echo_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

echo_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Default directories
AUDIT_INPUT="${AUDIT_INPUT:-$HOME/audit-input}"
AUDIT_OUTPUT="${AUDIT_OUTPUT:-$HOME/audit-output}"
SKILLS_DIR="${SKILLS_DIR:-$HOME/auditclaw-skills}"

# Parse arguments
CLONE_SKILLS=false
for arg in "$@"; do
    case $arg in
        --with-skills)
            CLONE_SKILLS=true
            shift
            ;;
        --help|-h)
            echo "AuditClaw Setup Script"
            echo ""
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --with-skills    Clone the community skills repository"
            echo "  --help, -h       Show this help message"
            echo ""
            echo "Environment Variables:"
            echo "  AUDIT_INPUT      Input directory (default: ~/audit-input)"
            echo "  AUDIT_OUTPUT     Output directory (default: ~/audit-output)"
            echo "  SKILLS_DIR       Skills directory (default: ~/auditclaw-skills)"
            exit 0
            ;;
    esac
done

echo "=============================================="
echo "  AuditClaw Setup"
echo "=============================================="
echo ""

# Create input directory
if [ -d "$AUDIT_INPUT" ]; then
    echo_info "Input directory already exists: $AUDIT_INPUT"
else
    echo_info "Creating input directory: $AUDIT_INPUT"
    mkdir -p "$AUDIT_INPUT"
fi

# Create output directory
if [ -d "$AUDIT_OUTPUT" ]; then
    echo_info "Output directory already exists: $AUDIT_OUTPUT"
else
    echo_info "Creating output directory: $AUDIT_OUTPUT"
    mkdir -p "$AUDIT_OUTPUT"
fi

# Create or clone skills directory
if [ -d "$SKILLS_DIR" ]; then
    echo_info "Skills directory already exists: $SKILLS_DIR"
elif [ "$CLONE_SKILLS" = true ]; then
    echo_info "Cloning community skills repository to: $SKILLS_DIR"
    if command -v git &> /dev/null; then
        git clone https://github.com/auditclaw/skills.git "$SKILLS_DIR" 2>/dev/null || {
            echo_warn "Could not clone skills repo (may not exist yet)"
            echo_info "Creating empty skills directory instead"
            mkdir -p "$SKILLS_DIR"
        }
    else
        echo_warn "git not found, creating empty skills directory"
        mkdir -p "$SKILLS_DIR"
    fi
else
    echo_info "Creating skills directory: $SKILLS_DIR"
    mkdir -p "$SKILLS_DIR"
fi

echo ""
echo "=============================================="
echo "  Setup Complete"
echo "=============================================="
echo ""
echo "Directory structure:"
echo "  Input (read-only):  $AUDIT_INPUT"
echo "  Output (writable):  $AUDIT_OUTPUT"
echo "  Skills (read-only): $SKILLS_DIR"
echo ""
echo "Next steps:"
echo "  1. Copy .env.auditclaw.example to .env and add your API key:"
echo "     cp .env.auditclaw.example .env"
echo ""
echo "  2. Build and start AuditClaw:"
echo "     docker compose -f docker-compose.auditclaw.yml build"
echo "     docker compose -f docker-compose.auditclaw.yml up -d"
echo ""
echo "  3. Open the web interface:"
echo "     http://localhost:18789"
echo ""
