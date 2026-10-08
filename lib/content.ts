import Markdoc, { type Node, type RenderableTreeNode } from "@markdoc/markdoc";
import { reader } from "./reader";

export type Project = {
  slug: string;
  title: string;
  description: string;
  liveUrl: string | null;
  githubUrl: string | null;
  image: string | null;
  tags: string[];
  stack: string[];
  featured: boolean;
  date: string | null;
  hasCaseStudy: boolean;
};

export type ProjectDetail = Project & { body: RenderableTreeNode };

export type Stat = { value: string; label: string };

export type Profile = {
  name: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  github: string | null;
  linkedin: string | null;
  resume: string | null;
  stats: Stat[];
};

export type Experience = {
  slug: string;
  company: string;
  role: string;
  startDate: string | null;
  endDate: string | null;
  bullets: string[];
};

export type SkillGroup = { name: string; items: string[] };

export type Education = {
  slug: string;
  institution: string;
  degree: string;
  location: string;
  startYear: number;
  endYear: number | null;
};

export type Certification = {
  slug: string;
  name: string;
  issuer: string;
  year: number;
  url: string | null;
};

// resolveLinkedFiles loads each case study (body.mdoc) alongside its JSON.
const linked = { resolveLinkedFiles: true } as const;
type ProjectEntry = Awaited<ReturnType<typeof reader.collections.projects.all<[typeof linked]>>>[number]["entry"];

function toProject(slug: string, entry: ProjectEntry): Project & { node: Node } {
  const { node } = entry.body;
  return {
    slug,
    title: entry.title,
    description: entry.description,
    liveUrl: entry.liveUrl,
    githubUrl: entry.githubUrl,
    image: entry.image,
    tags: [...entry.tags],
    stack: [...entry.stack],
    featured: entry.featured,
    date: entry.date,
    // An empty editor still produces a document node, so check for real children.
    hasCaseStudy: node.children.length > 0,
    node,
  };
}

export async function getProjects(): Promise<Project[]> {
  const entries = await reader.collections.projects.all(linked);
  return entries
    .map(({ slug, entry }) => {
      const project: Project & { node?: Node } = toProject(slug, entry);
      delete project.node; // pages only need the card fields; keep the tree out of client props
      return project;
    })
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export async function getProject(slug: string): Promise<ProjectDetail | null> {
  const entry = await reader.collections.projects.read(slug, linked);
  if (!entry) return null;
  const { node, ...project } = toProject(slug, entry);
  const errors = Markdoc.validate(node);
  if (errors.length) console.error(`Markdoc errors in project "${slug}"`, errors);
  return { ...project, body: Markdoc.transform(node) };
}

export async function getProfile(): Promise<Profile> {
  const p = await reader.singletons.profile.read();
  return {
    name: p?.name ?? "",
    headline: p?.headline ?? "",
    bio: p?.bio ?? "",
    location: p?.location ?? "",
    email: p?.email ?? "",
    github: p?.github ?? null,
    linkedin: p?.linkedin ?? null,
    resume: p?.resume ?? null,
    stats: (p?.stats ?? []).filter((s) => s.value && s.label),
  };
}

export async function getExperience(): Promise<Experience[]> {
  const entries = await reader.collections.experience.all();
  return entries
    .map(({ slug, entry }) => ({
      slug,
      company: entry.company,
      role: entry.role,
      startDate: entry.startDate,
      endDate: entry.endDate,
      bullets: [...entry.bullets],
    }))
    .sort((a, b) => (b.startDate ?? "").localeCompare(a.startDate ?? ""));
}

export async function getSkills(): Promise<SkillGroup[]> {
  const s = await reader.singletons.skills.read();
  return (s?.groups ?? [])
    .map((g) => ({ name: g.name, items: g.items.filter(Boolean) }))
    .filter((g) => g.name && g.items.length > 0);
}

export async function getEducation(): Promise<Education[]> {
  const entries = await reader.collections.education.all();
  return entries
    .map(({ slug, entry }) => ({
      slug,
      institution: entry.institution,
      degree: entry.degree,
      location: entry.location,
      startYear: entry.startYear,
      endYear: entry.endYear,
    }))
    .sort((a, b) => b.startYear - a.startYear);
}

export async function getCertifications(): Promise<Certification[]> {
  const entries = await reader.collections.certifications.all();
  return entries
    .map(({ slug, entry }) => ({
      slug,
      name: entry.name,
      issuer: entry.issuer,
      year: entry.year,
      url: entry.url,
    }))
    .sort((a, b) => b.year - a.year || a.name.localeCompare(b.name));
}
