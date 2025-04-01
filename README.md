# SQL Playground

An interactive platform to learn SQL fundamentals directly in your browser with hands-on practice. Try it out at [buddysql.seancoughlin.me](https://buddysql.seancoughlin.me)!

## Features

- **Interactive SQL Lessons**: Step-by-step tutorials covering SQL basics to more advanced topics
- **Live SQL Editor**: Execute queries and see results immediately
- **Built-in Database**: Practice with a pre-populated e-commerce database
- **Instant Feedback**: Get helpful error messages and validation for your queries
- **Progress Tracking**: Your progress is saved automatically to local storage
- **Zero Backend Required**: Everything runs client-side using SQL.js

## Technology Stack

- **Frontend**: React, Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **SQL Engine**: SQL.js (SQLite compiled to WebAssembly)
- **State Management**: React hooks with local storage persistence

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Scc33/BuddySQL.git
   cd BuddySQL
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app`: Next.js app directory structure with pages and layouts
- `/components`: React components organized by purpose
- `/hooks`: Custom React hooks including SQL.js integration
- `/lib`: Utility functions, database initialization, and lesson content
- `/types`: TypeScript type definitions
- `/public`: Static assets

## Key Components

- **SqlEditor**: Interactive SQL editor with query execution and feedback
- **LessonContent**: Markdown-rendered lesson content with code highlighting
- **useSqlJs**: Custom hook to initialize and interact with SQL.js
- **lessons.ts**: Content and structure of all SQL lessons

## Database Schema

The application includes a sample e-commerce database with the following tables:

- **Customers**: customer information
- **Products**: product catalog
- **Orders**: order information
- **Order_Items**: individual items within orders

## Available Lessons

1. Introduction to SQL
2. SELECT Basics
3. Filtering with WHERE
4. Sorting Results
5. Aggregate Functions
6. Grouping Data
7. Basic JOINs

## Contributing

Contributions are welcome! Feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [SQL.js](https://github.com/sql-js/sql.js/) - SQLite compiled to WebAssembly
- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework