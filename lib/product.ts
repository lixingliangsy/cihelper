export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "CIHelper",
  slug: "cihelper",
  tagline: "Decode failing CI pipelines fast.",
  description: "Paste a failing CI log and CIHelper pinpoints the exact step that broke, the likely cause, the fix, and a prevention tip - so you stop scrolling and start shipping.",
  toolTitle: "Diagnose CI failure",
  resultLabel: "Diagnosis",
  ctaLabel: "Diagnose",
  features: [
  "Pinpoint the failing step",
  "Explain the likely cause",
  "Give a concrete fix",
  "Suggest a prevention tip"
],
  inputs: [
  {
    "key": "ci_log",
    "label": "Paste the CI log",
    "type": "textarea",
    "placeholder": "e.g. Gatsby build failed: Module not found: Can't resolve './Header'"
  },
  {
    "key": "platform",
    "label": "CI platform",
    "type": "select",
    "options": [
      "GitHub Actions",
      "GitLab CI",
      "CircleCI",
      "Other"
    ]
  }
] as InputField[],
  systemPrompt: "You are a DevOps engineer. Given a failing CI log and the platform, pinpoint the exact step that failed, explain the likely cause in plain English, give a concrete fix, and one prevention tip. Be specific and reference the platform's idioms. In demo (mock) mode, return a realistic sample diagnosis following exactly this structure.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "6 diagnoses/mo"
  },
  {
    "tier": "Pro",
    "price": "$19/mo",
    "desc": "Unlimited, save history"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const l = (inputs['ci_log'] || '').trim()
  const p = inputs['platform'] || 'GitHub Actions'
  if (!l) return 'Paste a failing CI log to diagnose it.'
  let out = 'CI DIAGNOSIS (' + p + ')\n\n'
  out += 'Failing step: the build job (e.g. "npm run build").\n\n'
  out += 'Likely cause: a missing/renamed import (module not found). The file was moved or the case differs on a case-sensitive filesystem.\n\n'
  out += 'Fix: restore the import path (or rename the file to match), then re-run.\n\n'
  out += 'Prevention: add a type-check / lint step before build so this fails locally, not in CI.\n'
  out += '\n--- (Mock demo. Paste your real CI log for a tailored diagnosis.)'
  return out
}
}
