# SQL Playground: Learn SQL in Your Browser

SQL Playground is an interactive browser-based application that helps people learn SQL fundamentals through hands-on practice. Built with React, Next.js, TypeScript, and Tailwind CSS, this client-side application utilizes SQL.js to provide a fully functional SQLite environment directly in the browser without requiring any backend servers.

## Getting Started

1. Clone this repository and install dependencies:

```bash
git clone https://github.com/yourusername/sql-playground.git
cd sql-playground
npm install
```

2. Download the required SQL.js WebAssembly file for the browser version:

```bash
# Create a script to download the required files
cat > download-sql-wasm.sh << 'EOF'
#!/bin/bash
curl -L https://github.com/sql-js/sql.js/releases/download/v1.8.0/sql-wasm.wasm -o public/sql-wasm.wasm
chmod 644 public/sql-wasm.wasm
EOF

# Make it executable
chmod +x download-sql-wasm.sh

# Run it to download the required file
./download-sql-wasm.sh
```

3. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Features

- **Interactive SQL Lessons**: Step-by-step tutorials covering SQL basics and advancing to more complex queries
- **Live SQL Environment**: Execute queries and see results immediately
- **Pre-populated Sample Databases**: Practice with realistic data scenarios
- **Progress Tracking**: Local storage integration saves user progress between sessions
- **Zero Backend Required**: Everything runs in the browser for a frictionless learning experience

## How It Works

SQL Playground uses [SQL.js](https://github.com/sql-js/sql.js), a JavaScript SQL database engine that compiles SQLite to WebAssembly, allowing a complete SQL database to run in your browser. This means:

- No server needed - everything runs client-side
- Instant feedback on queries
- Real SQL syntax and functionality
- No setup required for users

## Technologies Used

- Next.js - React framework
- TypeScript - Type-safe JavaScript
- Tailwind CSS - Utility-first CSS framework
- SQL.js - WebAssembly-compiled SQLite

## License

MIT