import { useState } from "react";
import { Stethoscope, Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { analyzeSymptoms, type DiagnosisResult } from "@/services/symptomAnalyzer";

const MAX_CHARS = 1000;

const Index = () => {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const handleSubmit = async () => {
    if (!symptoms.trim() || loading) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await analyzeSymptoms(symptoms);
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSymptoms("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-[800px]">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center justify-center rounded-full bg-accent p-3">
            <Stethoscope className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Clinical Symptom Analyzer
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Describe your symptoms for a preliminary assessment
          </p>
        </header>

        {/* Input Section */}
        <Card className="mb-6 shadow-md">
          <CardContent className="p-5 sm:p-6">
            <Textarea
              value={symptoms}
              onChange={(e) =>
                setSymptoms(e.target.value.slice(0, MAX_CHARS))
              }
              placeholder="Describe your symptoms in detail — e.g. persistent headache for 3 days, mild fever, nasal congestion…"
              className="min-h-[160px] resize-none rounded-lg border-input text-base leading-relaxed focus-visible:ring-primary"
              disabled={loading}
            />
            <div className="mt-2 text-right text-xs text-muted-foreground">
              {symptoms.length}/{MAX_CHARS}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!symptoms.trim() || loading}
              className="mt-4 w-full rounded-lg py-5 text-base font-medium"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing…
                </>
              ) : (
                "Analyze Symptoms"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Result Card */}
        {result && (
          <Card className="overflow-hidden border-l-4 border-l-primary shadow-md animate-in fade-in slide-in-from-bottom-4 duration-300">
            <CardContent className="p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  Assessment Result
                </h2>
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                  {result.icdCode}
                </span>
              </div>

              <div className="mb-1 text-sm font-medium text-muted-foreground">
                Suggested Diagnosis
              </div>
              <div className="mb-4 text-xl font-semibold text-foreground">
                {result.diagnosis}
              </div>

              <div className="mb-1 text-sm font-medium text-muted-foreground">
                Description
              </div>
              <p className="leading-relaxed text-foreground/80">
                {result.description}
              </p>

              <Button
                variant="outline"
                onClick={handleReset}
                className="mt-6 w-full rounded-lg"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                New Analysis
              </Button>
            </CardContent>
          </Card>
        )}

        <p className="mt-8 text-center text-xs text-muted-foreground">
          This tool is for informational purposes only and does not constitute medical advice.
        </p>
      </div>
    </div>
  );
};

export default Index;
