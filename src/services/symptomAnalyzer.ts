export interface DiagnosisResult {
  diagnosis: string;
  icdCode: string;
  description: string;
}

/**
 * Analyzes symptoms and returns a diagnosis.
 * Currently returns mock data — replace the body of this function
 * with a real API call when your backend is ready.
 */
export async function analyzeSymptoms(symptoms: string): Promise<DiagnosisResult> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock response — swap this with fetch("/api/analyze", { ... }) later
  return {
    diagnosis: "Acute Upper Respiratory Infection",
    icdCode: "J06.9",
    description:
      "An acute infection of the upper respiratory tract, commonly presenting with nasal congestion, sore throat, cough, and mild fever. Usually viral in origin and self-limiting within 7–10 days.",
  };
}
