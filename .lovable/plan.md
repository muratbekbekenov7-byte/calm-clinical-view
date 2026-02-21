

# Medical Symptom Checker Interface

A clean, professional medical web interface for entering symptoms and displaying diagnostic results, designed with a hospital-grade aesthetic.

## Design
- **Light gray background** (`#F5F7FA` range) with a centered container (max 800px)
- Soft card-based layout with rounded corners and subtle shadows
- Clean, professional typography — system font stack for a clinical feel
- Medical blue as the primary accent color
- Fully responsive, optimized for tablets and mobile

## Page Layout (Single Page)

### Header
- App title (e.g. "Clinical Symptom Analyzer") with a subtle medical icon
- Professional, minimal top bar

### Symptom Input Section
- Large rounded textarea with placeholder text guiding the user (e.g. "Describe your symptoms…")
- Character count indicator
- Full-width primary blue **"Analyze Symptoms"** button beneath the textarea

### Loading State
- When submitted, show a centered spinner with "Analyzing…" text
- Button becomes disabled during loading

### Result Card
- Appears below the form after submission
- Displays: **Suggested Diagnosis**, **ICD-10 Code**, and a brief **Description**
- Clean card with soft shadow and a left-side accent border
- A "Clear" or "New Analysis" button to reset

## Technical Approach
- Frontend-only with a mock async function simulating an API call (~2 second delay)
- The mock function returns sample diagnosis data so the UI is fully testable
- The API call is isolated in a single service file, making it trivial to swap in a real backend later
- No database or authentication needed

