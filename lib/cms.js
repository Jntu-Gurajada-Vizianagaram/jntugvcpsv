import { promises as fs } from "fs";
import path from "path";
import { defaultSiteContent } from "@/lib/site-data";

const contentFilePath = path.join(process.cwd(), "data", "site-content.json");

function deepMerge(base, incoming) {
  if (Array.isArray(base)) {
    return Array.isArray(incoming) ? incoming : base;
  }

  if (base && typeof base === "object") {
    const output = { ...base };

    Object.keys(base).forEach((key) => {
      output[key] = deepMerge(base[key], incoming?.[key]);
    });

    if (incoming && typeof incoming === "object") {
      Object.keys(incoming).forEach((key) => {
        if (!(key in output)) {
          output[key] = incoming[key];
        }
      });
    }

    return output;
  }

  return incoming ?? base;
}

export async function ensureCmsFile() {
  await fs.mkdir(path.dirname(contentFilePath), { recursive: true });

  try {
    await fs.access(contentFilePath);
  } catch {
    await fs.writeFile(contentFilePath, JSON.stringify(defaultSiteContent, null, 2), "utf8");
  }
}

export async function getSiteContent() {
  await ensureCmsFile();

  try {
    const raw = await fs.readFile(contentFilePath, "utf8");
    const parsed = JSON.parse(raw);

    return deepMerge(defaultSiteContent, parsed);
  } catch {
    return defaultSiteContent;
  }
}

export async function saveSiteContent(content) {
  await ensureCmsFile();

  const nextContent = {
    ...deepMerge(defaultSiteContent, content),
    meta: {
      ...(content.meta ?? {}),
      updatedAt: new Date().toISOString(),
      source: "Managed in local CMS"
    }
  };

  await fs.writeFile(contentFilePath, JSON.stringify(nextContent, null, 2), "utf8");
  return nextContent;
}
