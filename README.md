# Contract Management Platform

A robust, frontend-based Contract Management Platform developed with React and Vite. This application handles the complete lifecycle of contracts—from blueprint creation to final signing or revocation—leveraging local storage for persistence.

## 🚀 Setup Instructions

1.  **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd "Contract Management Platform"
    ```

2.  **Install Dependencies**
    Ensure you have Node.js installed, then run:
    ```bash
    npm install
    ```

3.  **Start Development Server**
    Launch the application locally:
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

## 🏗 Architecture and Design Decisions

### Tech Stack
-   **React + Vite**: Chosen for a high-performance, modern development experience with fast hot-reload capabilities.
-   **Zero-Dependency Styling**: Utilizes **CSS variables** and native utility classes (`src/index.css`) instead of heavy UI libraries (like MUI or Bootstrap). This ensures:
    -   Maximum stability and control.
    -   No version conflicts.
    -   Lightweight bundle size.
-   **LocalStorage Persistence**: Replaces a traditional database backend to allow the application to be fully functional and persistent purely on the client-side.

### Core Architecture
-   **Modular Component Structure**: separated into `pages` (logic-heavy views) and `components` (reusable UI shells), ensuring separation of concerns.
-   **State-Based Routing**: Implements a custom, lightweight router using React state (`currentScreen`) to manage navigation without the overhead of `react-router-dom`.
-   **Linear Lifecycle Management**: Logic is centralized in `ContractDetails.jsx` to enforce strict status transitions (`Created` → `Approved` → `Sent` → ...).

### Design Philosophy
-   **Visual Hierarchy**: Uses a clear typography scale (Bold Headers vs. Semi-Bold Data) to make information scannable.
-   **Feedback Loops**: Interactive elements provide immediate feedback (hover states, modal confirmations, disabled buttons) to guide user behavior.

## 🧩 Assumptions and Limitations

### Assumptions
-   **Single User Environment**: The application is designed for a single user per browser session (data is stored in the browser).
-   **Mock Data Seeding**: If no data exists, the application seeds a set of default contracts for demonstration purposes.

### Limitations
-   **No Backend Sync**: Data lives only in the browser's `localStorage`. Clearing the browser cache will wipe all created contracts and blueprints.
-   **File Storage**: "Documents" are represented conceptually (metadata and fields) rather than as uploaded files (PDFs/Word docs) due to the client-side nature.
-   **Concurrent Editing**: As a local-first app, there is no real-time collaboration support.
