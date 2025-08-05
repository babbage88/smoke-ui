import { useState } from "react";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="fixed top-0 right-0 p-2">
          <header className="flex items-center justify-end">
            <ModeToggle />
          </header>
        </div>
        <h1>Smoke Shop</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </ThemeProvider>
    </>
  );
}

export default App;
