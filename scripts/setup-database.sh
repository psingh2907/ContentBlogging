#!/bin/bash

# ===========================================
# Blogging Platform Database Setup Script
# ===========================================
# This script automates the PostgreSQL setup for the blogging platform

set -e  # Exit on any error

echo "🗄️  Starting PostgreSQL Database Setup for Blogging Platform..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if PostgreSQL is installed
check_postgresql_installation() {
    print_status "Checking PostgreSQL installation..."
    
    if command -v psql >/dev/null 2>&1; then
        print_success "PostgreSQL is installed"
        psql --version
    else
        print_error "PostgreSQL is not installed!"
        echo ""
        echo "Please install PostgreSQL first:"
        echo ""
        echo "📋 Installation Commands:"
        echo "  macOS (Homebrew):    brew install postgresql"
        echo "  Ubuntu/Debian:       sudo apt install postgresql postgresql-contrib"
        echo "  CentOS/RHEL:         sudo yum install postgresql postgresql-server"
        echo ""
        exit 1
    fi
}

# Check if PostgreSQL service is running
check_postgresql_service() {
    print_status "Checking PostgreSQL service status..."
    
    if pg_isready >/dev/null 2>&1; then
        print_success "PostgreSQL service is running"
    else
        print_warning "PostgreSQL service is not running. Attempting to start..."
        
        # Try to start PostgreSQL service
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            if command -v brew >/dev/null 2>&1; then
                brew services start postgresql
                print_success "Started PostgreSQL service (macOS)"
            else
                print_error "Please start PostgreSQL manually on macOS"
                exit 1
            fi
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            # Linux
            if command -v systemctl >/dev/null 2>&1; then
                sudo systemctl start postgresql
                print_success "Started PostgreSQL service (Linux)"
            else
                print_error "Please start PostgreSQL manually on Linux"
                exit 1
            fi
        else
            print_error "Please start PostgreSQL service manually"
            exit 1
        fi
        
        # Wait a moment for service to start
        sleep 2
        
        # Check again
        if ! pg_isready >/dev/null 2>&1; then
            print_error "Failed to start PostgreSQL service"
            exit 1
        fi
    fi
}

# Create postgres user if it doesn't exist
create_postgres_user() {
    print_status "Checking if 'postgres' user exists..."
    
    # Try to connect as postgres user
    if psql -U postgres -c '\q' >/dev/null 2>&1; then
        print_success "User 'postgres' already exists"
        return 0
    fi
    
    print_warning "User 'postgres' does not exist. Creating..."
    
    # Try different methods to create the user
    if createuser -s postgres >/dev/null 2>&1; then
        print_success "Created 'postgres' superuser"
    elif sudo -u postgres createuser -s postgres >/dev/null 2>&1; then
        print_success "Created 'postgres' superuser (with sudo)"
    else
        print_error "Failed to create 'postgres' user"
        print_error "Please create the user manually:"
        echo "  sudo -u postgres createuser -s postgres"
        exit 1
    fi
}

# Create the blog database
create_database() {
    print_status "Creating 'blog_db' database..."
    
    # Check if database already exists
    if psql -U postgres -lqt | cut -d \| -f 1 | grep -qw blog_db; then
        print_success "Database 'blog_db' already exists"
        return 0
    fi
    
    # Create the database
    if createdb -U postgres blog_db >/dev/null 2>&1; then
        print_success "Created database 'blog_db'"
    else
        print_error "Failed to create database 'blog_db'"
        print_error "Please create the database manually:"
        echo "  createdb -U postgres blog_db"
        exit 1
    fi
}

# Test database connection
test_connection() {
    print_status "Testing database connection..."
    
    if psql -U postgres -d blog_db -c 'SELECT version();' >/dev/null 2>&1; then
        print_success "Successfully connected to 'blog_db' database"
        
        # Get PostgreSQL version
        version=$(psql -U postgres -d blog_db -t -c 'SELECT version();' 2>/dev/null | head -n1 | xargs)
        echo "  📋 $version"
    else
        print_error "Failed to connect to 'blog_db' database"
        exit 1
    fi
}

# Create .env file if it doesn't exist
create_env_file() {
    print_status "Checking for .env file..."
    
    if [ -f ".env" ]; then
        print_success ".env file already exists"
        return 0
    fi
    
    print_warning ".env file not found. Creating default configuration..."
    
    cat > .env << EOF
# ===========================================
# BLOGGING PLATFORM ENVIRONMENT CONFIGURATION
# ===========================================
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=
DB_NAME=blog_db

# Application Configuration
NODE_ENV=development
PORT=3000
EOF
    
    print_success "Created .env file with default configuration"
    print_warning "Please update the DB_PASSWORD in .env if your postgres user has a password"
}

# Verify setup by running a quick test
verify_setup() {
    print_status "Verifying complete setup..."
    
    # Check if we can connect and create a test table
    if psql -U postgres -d blog_db -c '
        CREATE TABLE IF NOT EXISTS setup_test (id SERIAL PRIMARY KEY, created_at TIMESTAMP DEFAULT NOW());
        INSERT INTO setup_test DEFAULT VALUES;
        SELECT * FROM setup_test LIMIT 1;
        DROP TABLE setup_test;
    ' >/dev/null 2>&1; then
        print_success "Database setup verification passed!"
    else
        print_error "Database setup verification failed"
        exit 1
    fi
}

# Main setup process
main() {
    echo "🚀 Blogging Platform Database Setup"
    echo "===================================="
    echo ""
    
    check_postgresql_installation
    echo ""
    
    check_postgresql_service
    echo ""
    
    create_postgres_user
    echo ""
    
    create_database
    echo ""
    
    test_connection
    echo ""
    
    create_env_file
    echo ""
    
    verify_setup
    echo ""
    
    print_success "🎉 Database setup completed successfully!"
    echo ""
    echo "📋 Next Steps:"
    echo "  1. Install backend dependencies:     yarn install"
    echo "  2. Start the backend server:        yarn start:dev"
    echo "  3. Install frontend dependencies:   cd frontend && npm install"
    echo "  4. Start the frontend server:       npm start"
    echo ""
    echo "🌐 Your blogging platform will be available at:"
    echo "  Backend:   http://localhost:3000"
    echo "  Frontend:  http://localhost:3001"
    echo ""
}

# Handle script interruption
trap 'echo ""; print_error "Setup interrupted by user"; exit 1' INT

# Check if running from the correct directory
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
    print_error "Please run this script from the blogging-platform root directory"
    print_error "Current directory: $(pwd)"
    exit 1
fi

# Run main setup
main 