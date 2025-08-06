import { useState } from "react";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "./components/ui/button";
import { Label } from "@/components/ui/label"

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
        
        <div className="fixed top-1 left-2 p-4 card">
          <h1>Smoke Shop</h1>
          <Button size="default" onClick={() => setCount((count) => count + 1)}>
            <Label>Primary count is {count}</Label>
          </Button>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
