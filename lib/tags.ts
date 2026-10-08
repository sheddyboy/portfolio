// Single source of truth for project tags. Add a line here to extend.
export const TAG_OPTIONS = [
  { label: "React", value: "react" },
  { label: "Next.js", value: "nextjs" },
  { label: "AI", value: "ai" },
  { label: "RAG", value: "rag" },
  { label: "Python", value: "python" },
  { label: "FastAPI", value: "fastapi" },
] as const;

export type Tag = (typeof TAG_OPTIONS)[number]["value"];

export const tagLabel = (value: string) =>
  TAG_OPTIONS.find((t) => t.value === value)?.label ?? value;
