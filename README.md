# 🚀 Code Flow Visualizer

> Visualize your code. Understand it faster.

---

## 📌 Overview

**Code Flow Visualizer** is a web-based tool that converts JavaScript code into an interactive graph of function relationships.
It helps developers quickly understand how functions are connected without manually tracing through the code.

---

## ✨ Features

* 🔍 **Automatic Function Detection**
  Parses JavaScript code and identifies functions and their relationships

* 🌐 **Interactive Graph Visualization**
  Displays function calls using a clean and structured graph

* ⚡ **Instant Analysis**
  Generate visual output with a single click

* 📱 **Responsive Design**
  Works seamlessly on both desktop and mobile devices

* 📥 **Export Graph**
  Download the visualization as an image

---

## 🛠️ Tech Stack

* **Frontend:** Next.js (App Router)
* **UI:** Tailwind CSS
* **Visualization:** React Flow
* **Parsing Logic:** Custom JavaScript parser
* **Deployment:** Vercel

---

## 📸 Demo

> Paste your JavaScript code → Click **Visualize** → See function flow instantly

---

## 🌐 Live Demo
https://code-visualizer-seven.vercel.app/

---

## 🧠 How It Works

1. User inputs JavaScript code
2. The parser extracts:

   * Functions
   * Function calls
3. A graph is generated where:

   * Nodes = Functions
   * Edges = Function calls
4. React Flow renders an interactive visualization

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/code-flow-visualizer.git
cd code-flow-visualizer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:3000
```

---

## 📂 Project Structure

```
/app
  /visualizer
    page.tsx
/components
  code-editor.tsx
  graph-visualization.tsx
/lib
  parser.ts
```

---

## 📈 Use Cases

* Understanding large codebases
* Debugging function flow
* Teaching programming concepts
* Visualizing execution structure

---

## 🔮 Future Enhancements

* Function execution highlighting
* Support for multiple languages
* Call stack simulation
* Code-to-flow animation

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.

