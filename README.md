# Contract Management Platform

A robust, frontend-based Contract Management Platform built with React and Vite. This application handles the full lifecycle of contracts—from blueprint creation to final signing or revocation—with persistent local storage.

## 🚀 Features

### 1. Contract Lifecycle Management
-   **Linear Workflow**: Enforces a strict status progression:
    `Created` → `Approved` → `Sent` → `Signed` → `Locked`
-   **Revocation Flow**: Contracts can be revoked at any stage via a secure confirmation modal, transitioning them to a permanent `Revoked` state.
-   **Locked State**: Signed/Locked contracts are immutable to ensure integrity.

### 2. Dynamic Blueprint Creation
-   **Visual Builder**: Create reusable templates (`Blueprints`) by adding fields from a palette.
-   **Field Types**: Supports Text, Date, Signature, and Checkbox inputs.
-   **Persistence**: Blueprints are saved locally and used to generate new contracts.

### 3. Contract Generation & Editing
-   **Inheritance**: New contracts automatically inherit fields from their selected blueprint.
-   **Interactive Editing**:
    -   "Edit Fields" mode allows filling in contract details.
    -   Interactive checkboxes, date pickers, and text inputs.
    -   Data is saved locally and persists across sessions.

### 4. Interactive Dashboard
-   **Status Filtering**: Filter contracts by active status (Active, Signed, Revoked, etc.).
-   **Visual Badges**: Color-coded status indicators (e.g., Red for Revoked, Green for Signed).
-   **Actionable**: Quick "View" access to contract details.

## 🛠 Tech Stack & Architecture

-   **React + Vite**: For a high-performance, modern development experience.
-   **Zero-Dependency Styling**: Custom **CSS variables** and utility classes (no external UI libraries) to ensure maximum stability and clean code.
-   **Local Persistence**: All data (Blueprints, Contracts, Field Data) is stored in the browser's `localStorage`, simulating a real backend.
-   **Custom Router**: A lightweight, state-based router for instant, flicker-free navigation.

## 📦 Setup & Run

1.  **Install**
    ```bash
    npm install
    ```

2.  **Run**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your browser.

## 📂 Project Structure

-   `src/components`: Reusable UI elements (Layout, Icons).
-   `src/pages`:
    -   `Dashboard.jsx`: Main table view with filters.
    -   `CreateBlueprint.jsx`: Drag-and-drop style builder logic.
    -   `CreateContract.jsx`: Instantiation logic.
    -   `ContractDetails.jsx`: Complex state management for lifecycle, editing, and revocation.
-   `src/index.css`: Global design system (colors, typography, buttons).
