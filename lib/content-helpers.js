export function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function enrichFaculty(faculty = []) {
  // Sort by experience (extracting number from string like "19 years...")
  const sorted = [...faculty].sort((a, b) => {
    const getExp = (str) => {
      const match = str.match(/(\d+(\.\d+)?)/);
      return match ? parseFloat(match[1]) : 0;
    };
    return getExp(b.experience) - getExp(a.experience);
  });

  return sorted.map((member) => ({
    ...member,
    slug: member.slug || slugify(member.name),
    type: member.designation.toLowerCase().includes("principal") || 
          member.designation.toLowerCase().includes("professor") ? "teaching" : "administration"
  }));
}

export function getPrincipal(faculty = []) {
  return faculty.find((member) => member.designation.toLowerCase().includes("principal")) || 
         faculty.find((member) => member.type === "teaching") || 
         faculty[0];
}
