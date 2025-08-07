import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { AppNavbar } from "./components/app-navbar";
import { HomeCarousel } from "@/components/home-carousel";

import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b">
          <AppNavbar />
        </header>
        <main className="p-4">
          <HomeCarousel />
        </main>
        <div className="fixed top-2 right-2">
          <ModeToggle />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
