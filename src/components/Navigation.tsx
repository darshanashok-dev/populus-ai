import { BookOpen, FileText, PenTool, Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const sections = [
    { id: "search", label: "Search Papers", icon: Search },
    { id: "summarize", label: "Summarize", icon: FileText },
    { id: "write", label: "Write Paper", icon: PenTool },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
              Populus.ai
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-secondary rounded-full p-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => onSectionChange(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground shadow-lavender"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{section.label}</span>
                </button>
              );
            })}
          </div>

          <ThemeToggle />
        </div>

        <div className="md:hidden flex gap-1 mt-3 bg-secondary rounded-full p-1">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-full transition-all ${
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground shadow-lavender"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs font-medium">{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
