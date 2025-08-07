// src/App.tsx
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { AppNavbar } from "@/components/app-navbar";
import { HomeCarousel } from "@/components/home-carousel";
import { ItemDetailsWrapper } from "@/components/item-details-wrapper";
import { Routes, Route } from "react-router-dom";
import { ProductGrid } from "@/components/products-grid";


import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b">
          <AppNavbar />
        </header>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<HomeCarousel />} />
            <Route path="/item/:itemId" element={<ItemDetailsWrapper />} />
            <Route path="/products" element={<ProductGrid />} />
          </Routes>
        </main>

        <div className="fixed top-2 right-2">
          <ModeToggle />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
