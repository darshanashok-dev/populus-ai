import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

export const WriteSection = () => {
  const [topic, setTopic] = useState("");
  const [outline, setOutline] = useState("");
  const [generatedPaper, setGeneratedPaper] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const { toast } = useToast();

  const handleGeneratePaper = async () => {
    if (!topic.trim()) {
      toast({
        title: "Please enter a topic",
        variant: "destructive",
      });
      return;
    }

    setIsWriting(true);

    try {
      const result = await api.writePaper({ topic, outline });
      setGeneratedPaper(result.paper);
      toast({
        title: "Paper generated successfully",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsWriting(false);
    }
  };

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 animate-fade-in">
      <div className="container mx-auto max-w-4xl">
        <Card className="p-6 shadow-lavender animate-scale-in">
          <h2 className="text-3xl font-bold mb-4">Write a Research Paper</h2>
          <Input
            placeholder="Enter your topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mb-4 bg-background border-border"
          />
          <Input
            placeholder="Optional: Enter an outline..."
            value={outline}
            onChange={(e) => setOutline(e.target.value)}
            className="mb-4 bg-background border-border"
          />
          <Button
            onClick={handleGeneratePaper}
            disabled={isWriting}
            className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-lavender mb-4"
          >
            {isWriting ? "Generating..." : "Generate Paper"}
          </Button>

          {generatedPaper && (
            <div className="bg-muted rounded-lg p-6 mt-4">
              <h3 className="font-semibold mb-2">Generated Paper:</h3>
              <p>{generatedPaper}</p>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};