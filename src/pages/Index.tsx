import { useState, useRef } from "react";
import { Stethoscope, Loader2, RotateCcw, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  analyzeSymptoms,
  COMMON_SYMPTOMS,
  type AnalysisResponse,
  type Severity,
} from "@/services/symptomAnalyzer";

const MAX_CHARS = 1000;

const severityConfig: Record<Severity, { label: string; className: string }> = {
  low: { label: "Low", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  medium: { label: "Medium", className: "bg-amber-100 text-amber-700 border-amber-200" },
  high: { label: "High", className: "bg-red-100 text-red-700 border-red-200" },
};

const Index = () => {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AnalysisResponse | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {
    if (!symptoms.trim() || loading) return;
    setLoading(true);
    setResponse(null);
    try {
      const data = await analyzeSymptoms(symptoms);
      setResponse(data);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSymptoms("");
    setResponse(null);
  };

  const handleChipClick = (symptom: string) => {
    const lower = symptoms.toLowerCase();
    if (lower.includes(symptom.toLowerCase())) return;
    const sep = symptoms.trim() ? ", " : "";
    const next = (symptoms.trim() + sep + symptom).slice(0, MAX_CHARS);
    setSymptoms(next);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:py-16 print:bg-white print:py-4">
      <div className="mx-auto w-full max-w-[800px]">
        {/* Header */}
        <header className="mb-10 text-center print:mb-6">
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
        <Card className="mb-6 shadow-md print:hidden">
          <CardContent className="p-5 sm:p-6">
            {/* Symptom Chips */}
            <div className="mb-4 flex flex-wrap gap-2">
              {COMMON_SYMPTOMS.map((s) => {
                const active = symptoms.toLowerCase().includes(s.toLowerCase());
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleChipClick(s)}
                    disabled={loading}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    } disabled:opacity-50`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            <Textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value.slice(0, MAX_CHARS))}
              placeholder="Describe your symptoms in detail — e.g. persistent headache for 3 days, mild fever, nasal congestion…"
              className="min-h-[140px] resize-none rounded-lg border-input text-base leading-relaxed focus-visible:ring-primary"
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

        {/* Results */}
        {response && (
          <div ref={resultRef} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Differential Diagnoses
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrint}
                className="text-muted-foreground print:hidden"
              >
                <Printer className="mr-1.5 h-4 w-4" />
                Print
              </Button>
            </div>

            {response.results.map((result, i) => {
              const sev = severityConfig[result.severity];
              return (
                <Card
                  key={i}
                  className="overflow-hidden border-l-4 border-l-primary shadow-md animate-in fade-in slide-in-from-bottom-4 duration-300"
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
                >
                  <CardContent className="p-5 sm:p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        {result.icdCode}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${sev.className}`}>
                        {sev.label} Severity
                      </Badge>
                      <span className="ml-auto text-sm font-medium text-muted-foreground">
                        {result.confidence}% match
                      </span>
                    </div>

                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {result.diagnosis}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/80">
                      {result.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}

            <Button
              variant="outline"
              onClick={handleReset}
              className="mt-2 w-full rounded-lg print:hidden"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              New Analysis
            </Button>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-muted-foreground print:mt-12">
          This tool is for informational purposes only and does not constitute medical advice.
        </p>
      </div>
    </div>
  );
};

export default Index;
