export type Severity = "low" | "medium" | "high";

export interface DiagnosisResult {
  diagnosis: string;
  icdCode: string;
  description: string;
  confidence: number; // 0–100
  severity: Severity;
}

export interface AnalysisResponse {
  results: DiagnosisResult[];
}

/**
 * Analyzes symptoms and returns ranked differential diagnoses.
 * Replace the body of this function with a real API call when ready.
 */
export async function analyzeSymptoms(symptoms: string): Promise<AnalysisResponse> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock differential diagnoses
  return {
    results: [
      {
        diagnosis: "Acute Upper Respiratory Infection",
        icdCode: "J06.9",
        description:
          "An acute infection of the upper respiratory tract, commonly presenting with nasal congestion, sore throat, cough, and mild fever. Usually viral in origin and self-limiting within 7–10 days.",
        confidence: 82,
        severity: "low",
      },
      {
        diagnosis: "Acute Sinusitis",
        icdCode: "J01.9",
        description:
          "Inflammation of the paranasal sinuses, typically following a viral URI. Presents with facial pain/pressure, purulent nasal discharge, and reduced sense of smell.",
        confidence: 58,
        severity: "medium",
      },
      {
        diagnosis: "Influenza",
        icdCode: "J11.1",
        description:
          "A systemic viral infection characterized by sudden onset of high fever, myalgia, headache, and severe malaise. May lead to complications in vulnerable populations.",
        confidence: 34,
        severity: "high",
      },
    ],
  };
}

export const COMMON_SYMPTOMS = [
  "Headache",
  "Fever",
  "Cough",
  "Sore throat",
  "Fatigue",
  "Nausea",
  "Chest pain",
  "Shortness of breath",
  "Dizziness",
  "Back pain",
  "Abdominal pain",
  "Joint pain",
];
