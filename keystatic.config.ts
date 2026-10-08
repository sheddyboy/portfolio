import { collection, config, fields, singleton } from "@keystatic/core";
import { TAG_OPTIONS } from "./lib/tags";

const projectImages = {
  directory: "public/images/projects",
  publicPath: "/images/projects/",
};

export default config({
  storage:
    process.env.NODE_ENV === "development"
      ? { kind: "local" }
      : { kind: "github", repo: "OWNER/REPO" }, // TODO: replace with <github-user>/<repo>
  ui: {
    brand: { name: "Portfolio CMS" },
    navigation: {
      Work: ["projects", "experience"],
      About: ["profile", "skills", "education", "certifications"],
    },
  },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*",
      format: "json",
      entryLayout: "content",
      columns: ["title", "date"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({
          label: "Description",
          description: "One or two sentences, shown on the project card.",
          multiline: true,
        }),
        liveUrl: fields.url({ label: "Live URL" }),
        githubUrl: fields.url({ label: "GitHub URL" }),
        image: fields.image({ label: "Image", ...projectImages }),
        tags: fields.multiselect({
          label: "Tags",
          description: "Used for the filter tabs.",
          options: TAG_OPTIONS.map((t) => ({ ...t })),
        }),
        stack: fields.array(fields.text({ label: "Technology" }), {
          label: "Tech stack",
          description: "Shown on the project page, e.g. FastAPI, Qdrant, Docker.",
          itemLabel: (p) => p.value || "Technology",
        }),
        featured: fields.checkbox({ label: "Featured", defaultValue: false }),
        date: fields.date({ label: "Date", validation: { isRequired: true } }),
        body: fields.markdoc({
          label: "Case study",
          description: "The write-up on the project page. Leave empty to skip the page.",
          options: { image: projectImages },
        }),
      },
    }),
    experience: collection({
      label: "Experience",
      slugField: "company",
      path: "content/experience/*",
      format: "json",
      columns: ["company", "startDate"],
      schema: {
        company: fields.slug({ name: { label: "Company" } }),
        role: fields.text({ label: "Role" }),
        startDate: fields.date({ label: "Start date", validation: { isRequired: true } }),
        endDate: fields.date({ label: "End date (leave empty if current)" }),
        bullets: fields.array(fields.text({ label: "Bullet", multiline: true }), {
          label: "Bullet points",
          itemLabel: (p) => p.value || "Bullet",
        }),
      },
    }),
    education: collection({
      label: "Education",
      slugField: "institution",
      path: "content/education/*",
      format: "json",
      schema: {
        institution: fields.slug({ name: { label: "Institution" } }),
        degree: fields.text({ label: "Degree" }),
        location: fields.text({ label: "Location" }),
        startYear: fields.integer({ label: "Start year", validation: { isRequired: true } }),
        endYear: fields.integer({ label: "End year (expected or actual)" }),
      },
    }),
    certifications: collection({
      label: "Certifications",
      slugField: "name",
      path: "content/certifications/*",
      format: "json",
      columns: ["name", "year"],
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        issuer: fields.text({ label: "Issuer" }),
        year: fields.integer({ label: "Year", validation: { isRequired: true } }),
        url: fields.url({ label: "Credential URL", description: "Link to verify the certificate." }),
      },
    }),
  },
  singletons: {
    profile: singleton({
      label: "Profile",
      path: "content/profile",
      format: "json",
      schema: {
        name: fields.text({ label: "Name" }),
        headline: fields.text({ label: "Headline" }),
        bio: fields.text({ label: "Short bio", multiline: true }),
        location: fields.text({ label: "Location" }),
        email: fields.text({ label: "Email" }),
        github: fields.url({ label: "GitHub URL" }),
        linkedin: fields.url({ label: "LinkedIn URL" }),
        resume: fields.file({
          label: "Resume (PDF)",
          directory: "public/resume",
          publicPath: "/resume/",
        }),
        stats: fields.array(
          fields.object({
            value: fields.text({ label: "Value", description: "e.g. 10k+" }),
            label: fields.text({ label: "Label", description: "e.g. monthly users served" }),
          }),
          {
            label: "Impact stats",
            description: "Shown under the hero. Three or four works best.",
            itemLabel: (p) => `${p.fields.value.value} ${p.fields.label.value}`,
          },
        ),
      },
    }),
    skills: singleton({
      label: "Skills",
      path: "content/skills",
      format: "json",
      schema: {
        groups: fields.array(
          fields.object({
            name: fields.text({ label: "Group name" }),
            items: fields.array(fields.text({ label: "Skill" }), {
              label: "Skills",
              itemLabel: (p) => p.value || "Skill",
            }),
          }),
          { label: "Skill groups", itemLabel: (p) => p.fields.name.value || "Group" },
        ),
      },
    }),
  },
});
