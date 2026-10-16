# Practical 3: API Integration and Data Rendering in React

---

## 📌 Project Overview
A reactive web application built with **React** and **Vite** that integrates with the public **GitHub REST API**. The application demonstrates robust asynchronous client-server communication using React's **`useEffect`** and **`useState`** hooks, managing the complete network request lifecycle across **loading**, **error**, and **success** states, alongside real-time search filtering and fault recovery.

---

## 🏗️ Architecture & Component Hierarchy
```text
Projects.jsx (REST API Integration Hub)
 ├── useEffect() → triggers API fetch on mount & dependency updates
 ├── useState: repos, loading, error, searchTerm, username, simulateError
 ├── [loading === true]  → <Spinner /> (animated progress indicator)
 ├── [error !== null]    → <ErrorMessage /> (graceful failure banner with retry callback)
 └── [success]           → <RepoList /> (grid of repository cards)
      └── RepoCard       (name, HTML URL, stars, forks, language badges)
```

---

## 🚀 Key Features Implemented

1. **REST API Integration:**
   - Consumes `https://api.github.com/users/<username>/repos?sort=updated`.
   - Side-effect isolated inside `useEffect` with dependency array handling to prevent infinite re-rendering loops.

2. **Asynchronous State Triad:**
   - **Loading State:** Displays `<Spinner />` during in-flight network requests to provide visual feedback and eliminate perceived lag.
   - **Error State:** Catches network timeouts, 404 Not Found, and rate-limit HTTP errors, rendering `<ErrorMessage />` with a **Retry Request** button.
   - **Success State:** Maps the received repository payload into structured `<RepoList />` cards.

3. **Dynamic Search & Filtering:**
   - Real-time client-side name filter input that updates rendered repositories on every keystroke without triggering redundant network requests.

4. **Multi-User Profile Lookup:**
   - Quick selector buttons for verified profiles (`@24CS012Deep`, `@facebook`, `@vercel`, `@torvalds`) plus custom username input field.

5. **Network Fault Simulation:**
   - Interactive toggle button simulating network failures to allow evaluators to verify error boundary rendering and retry recovery live.

6. **Repository Metrics & Deep Links:**
   - Displays live GitHub stars (`stargazers_count`), forks (`forks_count`), primary programming language, and direct GitHub links.

---

## 🛠️ How to Run Locally

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Execution
```bash
# 1. Navigate to the project directory
cd prc3

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

---

## 📝 Conceptual Analysis & Viva Q&A

### Q1: Why is `useEffect` required for API calls instead of fetching directly in the component body?
Calling `fetch()` directly in the component body executes during React's rendering phase. When the asynchronous request resolves and calls `setRepos()` or `setLoading()`, React schedules a re-render. In that re-render, the component body runs again, firing another `fetch()`, which calls state updater functions again—creating an uncontrollable infinite re-rendering loop that floods the network and crashes the browser. Wrapping the call in `useEffect` guarantees the side effect executes only after the DOM has been committed, and controlling the dependency array ensures it only fires when intended.

### Q2: What is the difference between a loading state and an error state?
- A **loading state** represents an active in-flight operation where data is pending; the UI must display a non-intrusive progress indicator (like a spinner) to reassure the user that the system is processing their request.
- An **error state** indicates that the network request failed (e.g., DNS error, HTTP 404, rate limit, or server outage); the UI must halt loading, explain the failure in user-friendly terms, and provide actionable recovery options (e.g., a "Retry" button).
Handling both separately prevents blank screens and keeps the user informed throughout the request lifecycle.

### Q3: What is the significance of the dependency array in `useEffect`?
The dependency array tells React when to re-execute the effect function:
- **`[]` (empty array):** Runs the effect only once when the component mounts, and cleans up when it unmounts.
- **`[dependency1, dependency2]`:** Runs when the component mounts and re-runs whenever any specified dependency value changes.
- **Omitted dependency array:** Runs after every single render, which typically results in infinite loops when setting state inside the effect.

---

## 🔍 Engineering Reflection
- **Promise Lifecycle Management:** Used `.finally(() => setLoading(false))` to ensure the loading indicator is dismissed regardless of whether the fetch fulfilled successfully or rejected with an error.
- **Client-Side Filtering:** Applied the keyword search filter directly to the fetched array in memory, providing an instant user response without incurring additional GitHub API rate limits.
