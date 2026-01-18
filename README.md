# Contract Management Platform UI

A frontend-based Contract Management Platform built with React and JavaScript.
This project follows a **Zero-Dependency** architecture to ensure maximum stability and ease of setup.

## 🚀 Setup Instructions

1.  **Install Dependencies**
    ```bash
    npm install
    ```
    *(Note: minimal dependencies required: only React and Vite)*

2.  **Start Development Server**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## 🏗 Architecture & Design Decisions

### Tech Stack Request & Justification
The assignment allows choosing the stack with justification. I have chosen:

-   **React (Vite)**: For a modern, performant foundation.
-   **Standard CSS (CSS Variables)**:
    -   **Why?** To avoid complex build chains and dependency conflicts (like Tailwind installation issues).
    -   **Benefit**: Ensures the project runs immediately on any machine with zero configuration overhead.
    -   **Design**: Uses a "Purple/Indigo" semantic color system defined in `index.css` for consistent branding.
-   **Local State Navigation**:
    -   **Why?** The app is a Single Page Application (SPA) with a flat hierarchy.
    -   **Decision**: Replaced `react-router-dom` with a lightweight, custom state-based router to further reduce bundle size and external dependencies.

### Directory Structure
-   `src/components`: Reusable UI shells (Layout).
-   `src/pages`: Feature screens (Dashboard, Blueprints, Create Contract).
-   `src/index.css`: Centralized interaction design and theme variables.

## 📱 Screens & Features

1.  **Dashboard**:
    -   Grid view of contracts.
    -   Status badges (Signed, Approved, etc.).
    -   Summary statistics.
2.  **Blueprints**:
    -   Template management table.
3.  **Create Contract**:
    -   Clean form interface for contract initiation.

## 🧩 Assumptions

-   **Backend**: Mocked via local constant data.
-   **Persistence**: Data resets on reload (as per "No storage" requirement).
