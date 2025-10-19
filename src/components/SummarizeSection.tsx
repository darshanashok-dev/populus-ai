import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

export const SummarizeSection = () => {
  const [paperText, setPaperText] = useState("");
  const [summary, setSummary] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!paperText.trim()) {
      toast({
        title: "Please provide paper content",
        variant: "destructive",
      });
      return;
    }

    setIsSummarizing(true);

    try {
      const result = await api.summarizePaper({ content: paperText });
      setSummary(result.summary);
      toast({
        title: "Summarization complete",
      });
    } catch (error) {
      toast({
        title: "Summarization failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 animate-fade-in">
      <div className="container mx-auto max-w-4xl">
        <Card className="p-6 shadow-lavender animate-scale-in">
          <h2 className="text-3xl font-bold mb-4">Summarize a Paper</h2>
          <Input
            placeholder="Paste the research paper content here..."
            value={paperText}
            onChange={(e) => setPaperText(e.target.value)}
            className="mb-4 bg-background border-border"
          />
          <Button
            onClick={handleSummarize}
            disabled={isSummarizing}
            className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-lavender mb-4"
          >
            {isSummarizing ? "Summarizing..." : "Summarize"}
          </Button>

          {summary && (
            <div className="bg-muted rounded-lg p-6 mt-4">
              <h3 className="font-semibold mb-2">Summary:</h3>
              <p>{summary}</p>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};