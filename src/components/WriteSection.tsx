import { PenTool, Download, Sparkles, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const WriteSection = () => {
  const [topic, setTopic] = useState("");
  const [outline, setOutline] = useState("");
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
    
    // TODO: Integrate with AWS Bedrock backend
    setTimeout(() => {
      setIsWriting(false);
      toast({
        title: "Paper generation complete",
        description: "Connect your AWS Bedrock backend to generate papers",
      });
    }, 3000);
  };

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 animate-fade-in">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">AI Writing Assistant</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Write Research Papers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate well-structured academic papers with AI assistance
          </p>
        </div>

        <div className="space-y-6 animate-scale-in">
          <Card className="p-6 shadow-lavender">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Research Topic
                </label>
                <Input
                  placeholder="Enter your research topic..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="bg-background border-border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Outline or Key Points (Optional)
                </label>
                <Textarea
                  placeholder="Provide an outline or key points you want to cover..."
                  value={outline}
                  onChange={(e) => setOutline(e.target.value)}
                  className="min-h-[150px] bg-background border-border"
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleGeneratePaper}
                  disabled={isWriting}
                  className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity shadow-lavender"
                >
                  <PenTool className="h-4 w-4 mr-2" />
                  {isWriting ? "Generating..." : "Generate Paper"}
                </Button>
                <Button variant="outline" disabled>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-muted/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Generated Paper</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lightbulb className="h-3 w-3" />
                <span>AI-Generated Content</span>
              </div>
            </div>
            <div className="bg-background rounded-lg p-6 min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <PenTool className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground mb-2">
                  Your generated paper will appear here
                </p>
                <p className="text-sm text-muted-foreground">
                  Sections will include: Abstract, Introduction, Methodology, Results, Conclusion
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
