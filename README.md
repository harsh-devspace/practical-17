# Practical 17: Read Operation with API

## Objective
Develop a **Student List** application that retrieves student data from a dummy API using `fetch()` and displays the records using React components and `map()`.

## Topics Covered
- Asynchronous data fetching using JavaScript `fetch()` within React `useEffect()`
- Handling loading skeleton states, errors, and fallback datasets
- Transforming raw API JSON payloads into modular React component props
- Dynamic list rendering using the array `.map()` operator with unique `key` identifiers
- Client-side searching and department filtering

## Project Structure
```
Practical_17/
├── src/
│   ├── App.jsx            # Student List API fetch and mapped card grid
│   ├── main.jsx           # React DOM root entry
│   └── index.css          # Tailwind CSS styles
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── vite.config.js         # Vite configuration
├── vercel.json            # Vercel configuration
└── README.md              # Project documentation
```

## Installation & Running Steps
1. Navigate to the project directory:
   ```bash
   cd Practical_17
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.
