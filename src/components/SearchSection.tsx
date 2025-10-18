import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const SearchSection = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // TODO: Integrate with AWS Bedrock backend
    // This is where you'll call your AWS Bedrock agent
    setTimeout(() => {
      setIsSearching(false);
      toast({
        title: "Search initiated",
        description: "Connect your AWS Bedrock backend to see results",
      });
    }, 1500);
  };

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 animate-fade-in">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">AI-Powered Research</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Search Academic Papers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover relevant research papers using advanced AI semantic search
          </p>
        </div>

        <Card className="p-6 shadow-lavender animate-scale-in">
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Enter research topic, keywords, or questions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 bg-background border-border"
            />
            <Button 
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-lavender"
            >
              <Search className="h-4 w-4 mr-2" />
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>

          <div className="bg-muted rounded-lg p-8 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">
              Search results will appear here once connected to AWS Bedrock
            </p>
          </div>
        </Card>

        <div className="mt-8 grid gap-4">
          <p className="text-sm text-muted-foreground text-center">
            💡 Try searching for: "machine learning in healthcare", "quantum computing applications", or "climate change mitigation"
          </p>
        </div>
      </div>
    </section>
  );
};
