import { FileText, Upload, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const SummarizeSection = () => {
  const [paperText, setPaperText] = useState("");
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
    
    // TODO: Integrate with AWS Bedrock backend
    setTimeout(() => {
      setIsSummarizing(false);
      toast({
        title: "Summarization complete",
        description: "Connect your AWS Bedrock backend to see summaries",
      });
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Process PDF/text file
      toast({
        title: "File uploaded",
        description: "File processing will be available after backend integration",
      });
    }
  };

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 animate-fade-in">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">Intelligent Analysis</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Summarize Research Papers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get concise, accurate summaries of complex academic papers
          </p>
        </div>

        <div className="space-y-6 animate-scale-in">
          <Card className="p-6 shadow-lavender">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Upload Paper or Paste Content
              </label>
              <div className="flex gap-2 mb-4">
                <Button
                  variant="outline"
                  className="relative overflow-hidden"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload PDF
                  <input
                    type="file"
                    accept=".pdf,.txt"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </Button>
              </div>
              <Textarea
                placeholder="Or paste the paper content here..."
                value={paperText}
                onChange={(e) => setPaperText(e.target.value)}
                className="min-h-[200px] bg-background border-border"
              />
            </div>

            <Button 
              onClick={handleSummarize}
              disabled={isSummarizing}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity shadow-lavender"
            >
              <FileText className="h-4 w-4 mr-2" />
              {isSummarizing ? "Summarizing..." : "Generate Summary"}
            </Button>
          </Card>

          <Card className="p-6 bg-muted/50">
            <h3 className="font-semibold mb-4">Summary Output</h3>
            <div className="bg-background rounded-lg p-6 min-h-[200px] flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">
                  Summary will appear here after processing
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
