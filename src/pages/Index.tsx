import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { SearchSection } from "@/components/SearchSection";
import { SummarizeSection } from "@/components/SummarizeSection";
import { WriteSection } from "@/components/WriteSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("search");

  useEffect(() => {
    // Set dark mode as default
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case "search":
        return <SearchSection />;
      case "summarize":
        return <SummarizeSection />;
      case "write":
        return <WriteSection />;
      default:
        return <SearchSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <main>
        {renderSection()}
      </main>
    </div>
  );
};

export default Index;
