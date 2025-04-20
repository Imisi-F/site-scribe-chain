
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MainNav() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" ||
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
  };
  
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  
  const closeMenu = () => setIsMobileMenuOpen(false);
  
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <NavLink to="/" className="flex items-center gap-2 font-semibold text-lg">
            <span className="text-primary">True</span>
            <span className="text-secondary">Trace</span>
          </NavLink>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink 
            to="/new-report" 
            className={({ isActive }) => 
              isActive 
                ? "text-secondary font-medium" 
                : "text-foreground/70 hover:text-foreground transition-colors"
            }
          >
            New Report
          </NavLink>
          <NavLink 
            to="/my-submissions" 
            className={({ isActive }) => 
              isActive 
                ? "text-secondary font-medium" 
                : "text-foreground/70 hover:text-foreground transition-colors"
            }
          >
            My Submissions
          </NavLink>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => 
              isActive 
                ? "text-secondary font-medium" 
                : "text-foreground/70 hover:text-foreground transition-colors"
            }
          >
            Dashboard
          </NavLink>
          
          <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="ml-2">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </nav>
        
        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden gap-2">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-background border-b p-4 shadow-md">
          <nav className="flex flex-col space-y-4">
            <NavLink 
              to="/new-report" 
              onClick={closeMenu}
              className={({ isActive }) => 
                isActive 
                  ? "text-secondary font-medium p-2 rounded-md bg-accent/10" 
                  : "text-foreground/70 hover:text-foreground p-2 rounded-md hover:bg-accent/10 transition-colors"
              }
            >
              New Report
            </NavLink>
            <NavLink 
              to="/my-submissions" 
              onClick={closeMenu}
              className={({ isActive }) => 
                isActive 
                  ? "text-secondary font-medium p-2 rounded-md bg-accent/10" 
                  : "text-foreground/70 hover:text-foreground p-2 rounded-md hover:bg-accent/10 transition-colors"
              }
            >
              My Submissions
            </NavLink>
            <NavLink 
              to="/dashboard" 
              onClick={closeMenu}
              className={({ isActive }) => 
                isActive 
                  ? "text-secondary font-medium p-2 rounded-md bg-accent/10" 
                  : "text-foreground/70 hover:text-foreground p-2 rounded-md hover:bg-accent/10 transition-colors"
              }
            >
              Dashboard
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
