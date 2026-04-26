"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";

function Field({ label, value, onChange, multiline = false, placeholder = "" }) {
  const commonProps = {
    className: "cms-input",
    value: value ?? "",
    placeholder,
    onChange: (event) => onChange(event.target.value)
  };

  return (
    <label className="cms-field">
      <span>{label}</span>
      {multiline ? <textarea rows={5} {...commonProps} /> : <input type="text" {...commonProps} />}
    </label>
  );
}

function SectionCard({ title, description, children }) {
  return (
    <section className="cms-section-card">
      <div className="cms-section-head">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function ArrayEditor({ title, description, items, fields, onChange, addItem }) {
  const updateItem = (index, fieldName, value) => {
    const next = items.map((item, itemIndex) =>
      itemIndex === index ? { ...item, [fieldName]: value } : item
    );

    onChange(next);
  };

  const removeItem = (index) => {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <SectionCard title={title} description={description}>
      <div className="cms-stack">
        {items.map((item, index) => (
          <div className="cms-array-card" key={`${title}-${index}`}>
            <div className="cms-array-header">
              <strong>{title} Item {index + 1}</strong>
              <button type="button" className="button button-danger" onClick={() => removeItem(index)}>
                Remove
              </button>
            </div>
            <div className="cms-grid">
              {fields.map((field) => (
                <Field
                  key={field.name}
                  label={field.label}
                  value={item[field.name]}
                  multiline={field.multiline}
                  onChange={(value) => updateItem(index, field.name, value)}
                />
              ))}
            </div>
          </div>
        ))}
        <button type="button" className="button button-secondary" onClick={() => onChange([...items, addItem()])}>
          Add Item
        </button>
      </div>
    </SectionCard>
  );
}

function BulletSectionEditor({ sections, onChange }) {
  const updateTitle = (index, value) => {
    onChange(sections.map((section, itemIndex) => (itemIndex === index ? { ...section, title: value } : section)));
  };

  const updateItems = (index, value) => {
    const bullets = value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    onChange(
      sections.map((section, itemIndex) => (itemIndex === index ? { ...section, items: bullets } : section))
    );
  };

  const addSection = () => {
    onChange([...sections, { title: "New Disclosure Section", items: ["New bullet point"] }]);
  };

  const removeSection = (index) => {
    onChange(sections.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <SectionCard
      title="Disclosure Sections"
      description="Manage UGC and mandatory disclosure blocks. One line equals one bullet."
    >
      <div className="cms-stack">
        {sections.map((section, index) => (
          <div className="cms-array-card" key={`${section.title}-${index}`}>
            <div className="cms-array-header">
              <strong>Disclosure Block {index + 1}</strong>
              <button type="button" className="button button-danger" onClick={() => removeSection(index)}>
                Remove
              </button>
            </div>
            <div className="cms-grid">
              <Field label="Section Title" value={section.title} onChange={(value) => updateTitle(index, value)} />
              <Field
                label="Bullets"
                value={section.items.join("\n")}
                multiline
                onChange={(value) => updateItems(index, value)}
              />
            </div>
          </div>
        ))}
        <button type="button" className="button button-secondary" onClick={addSection}>
          Add Disclosure Section
        </button>
      </div>
    </SectionCard>
  );
}

export function CmsAdmin({ initialContent }) {
  const [content, setContent] = useState(initialContent);
  const [status, setStatus] = useState("Ready");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const lastUpdated = useMemo(() => {
    return new Date(content.metaData?.lastInstitutionalUpdate ?? Date.now()).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }, [content.metaData?.lastInstitutionalUpdate]);

  const updateInstitutionalField = (field, value) => {
    setContent((current) => ({
      ...current,
      institutionalProfile: {
        ...current.institutionalProfile,
        [field]: value
      }
    }));
  };

  const saveContent = () => {
    setStatus("Synchronizing...");
    setError("");

    startTransition(async () => {
      try {
        const response = await fetch("/api/content", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(content)
        });

        if (!response.ok) {
          throw new Error("Unable to synchronize institutional content.");
        }

        const payload = await response.json();
        setContent(payload.content);
        setStatus("Synchronized");
      } catch (saveError) {
        setStatus("Sync failed");
        setError(saveError.message);
      }
    });
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <main className="cms-layout">
      <aside className="cms-sidebar">
        <div>
          <p className="admin-kicker">Institutional Governance Panel</p>
          <h1>JNTU-GV CPSV Administration</h1>
          <p className="admin-copy">
            Authorized portal for managing the digital presence of JNTU-GV College of Pharmaceutical Sciences. Changes are synchronized with the statutory content repository.
          </p>
        </div>

        <div className="cms-meta-card">
          <p><strong>System Status:</strong> {status}</p>
          <p><strong>Last Sync:</strong> {lastUpdated}</p>
          <p><strong>Registry:</strong> {content.metaData?.attribution}</p>
          {error ? <p className="cms-error">{error}</p> : null}
        </div>

        <div className="cms-sidebar-actions">
          <button type="button" className="button button-primary" onClick={saveContent} disabled={isPending}>
            {isPending ? "Synchronizing..." : "Commit Changes"}
          </button>
          <Link href="/" className="button button-secondary">
            View Institutional Portal
          </Link>
          <button type="button" className="button button-danger" onClick={logout}>
            De-authorize Session
          </button>
        </div>
      </aside>

      <section className="cms-main">
        <SectionCard
          title="Institutional Identity"
          description="Statutory institutional credentials and executive branding data."
        >
          <div className="cms-grid">
            <Field label="Statutory Status" value={content.institutionalProfile.status} onChange={(value) => updateInstitutionalField("status", value)} />
            <Field label="Parent University" value={content.institutionalProfile.parentUniversity} onChange={(value) => updateInstitutionalField("parentUniversity", value)} />
            <Field label="Campus Location" value={content.institutionalProfile.location} onChange={(value) => updateInstitutionalField("location", value)} />
            <Field label="Official Domain" value={content.institutionalProfile.domain} onChange={(value) => updateInstitutionalField("domain", value)} />
            <Field label="Regulatory Approvals" value={content.institutionalProfile.approvals} onChange={(value) => updateInstitutionalField("approvals", value)} />
            <Field label="Year Established" value={content.institutionalProfile.established} onChange={(value) => updateInstitutionalField("established", value)} />
            <Field label="Counselling Code" value={content.institutionalProfile.counsellingCode} onChange={(value) => updateInstitutionalField("counsellingCode", value)} />
            <Field label="Administrative Phone" value={content.institutionalProfile.phone} onChange={(value) => updateInstitutionalField("phone", value)} />
            <Field label="Official Email" value={content.institutionalProfile.email} onChange={(value) => updateInstitutionalField("email", value)} />
            <Field label="Residential Facilities" value={content.institutionalProfile.hostel} onChange={(value) => updateInstitutionalField("hostel", value)} />
            <Field label="Institutional Narrative" value={content.institutionalProfile.about} multiline onChange={(value) => updateInstitutionalField("about", value)} />
            <Field label="Digital Transparency Norms" value={content.institutionalProfile.websiteNorms} multiline onChange={(value) => updateInstitutionalField("websiteNorms", value)} />
            <Field label="Institutional Vision" value={content.institutionalProfile.vision} multiline onChange={(value) => updateInstitutionalField("vision", value)} />
            <Field label="Institutional Mission" value={content.institutionalProfile.mission} multiline onChange={(value) => updateInstitutionalField("mission", value)} />
          </div>
        </SectionCard>

        <ArrayEditor
          title="Admission Key Data"
          description="High-impact metrics for the Admissions Portfolio."
          items={content.admissionKeyData}
          fields={[
            { name: "title", label: "Metric Label" },
            { name: "value", label: "Value" }
          ]}
          onChange={(value) => setContent((current) => ({ ...current, admissionKeyData: value }))}
          addItem={() => ({ title: "Key Metric", value: "Value" })}
        />

        <ArrayEditor
          title="Academic Framework"
          description="Core educational programmes and statutory regulations."
          items={content.academicPrograms}
          fields={[
            { name: "name", label: "Programme Name" },
            { name: "duration", label: "Statutory Duration" },
            { name: "status", label: "Current Status" },
            { name: "note", label: "Framework Notes", multiline: true }
          ]}
          onChange={(value) => setContent((current) => ({ ...current, academicPrograms: value }))}
          addItem={() => ({ name: "New Programme", duration: "Duration", status: "Active", note: "Regulatory framework notes" })}
        />

        <ArrayEditor
          title="Governance Framework"
          description="Statutory governance pillars and institutional highlights."
          items={content.governanceFramework}
          fields={[
            { name: "title", label: "Pillar Title" },
            { name: "description", label: "Governance Context", multiline: true }
          ]}
          onChange={(value) => setContent((current) => ({ ...current, governanceFramework: value }))}
          addItem={() => ({ title: "New Governance Pillar", description: "Context" })}
        />

        <ArrayEditor
          title="University Leadership"
          description="Apex university governance roles and personnel."
          items={content.universityLeadership}
          fields={[
            { name: "role", label: "Statutory Role" },
            { name: "name", label: "Personnel Name" },
            { name: "detail", label: "Professional Credentials" }
          ]}
          onChange={(value) => setContent((current) => ({ ...current, universityLeadership: value }))}
          addItem={() => ({ role: "Role", name: "Full Name", detail: "Credentials" })}
        />

        <BulletSectionEditor
          sections={content.mandatoryDisclosures}
          onChange={(value) => setContent((current) => ({ ...current, mandatoryDisclosures: value }))}
        />

        <ArrayEditor
          title="Compliance Audit"
          description="Statutory disclosure tracking and regulatory audit matrix."
          items={content.complianceAudit}
          fields={[
            { name: "item", label: "Statutory Requirement" },
            { name: "status", label: "Audit Status" },
            { name: "placement", label: "Digital Placement" }
          ]}
          onChange={(value) => setContent((current) => ({ ...current, complianceAudit: value }))}
          addItem={() => ({ item: "Requirement", status: "Verified", placement: "Portal Section" })}
        />

        <ArrayEditor
          title="Student Welfare Cells"
          description="Mandated student support and administrative welfare bodies."
          items={content.studentWelfareCells}
          fields={[
            { name: "title", label: "Cell Nomenclature" },
            { name: "description", label: "Functional Brief", multiline: true }
          ]}
          onChange={(value) => setContent((current) => ({ ...current, studentWelfareCells: value }))}
          addItem={() => ({ title: "Welfare Cell", description: "Brief" })}
        />

        <ArrayEditor
          title="Official Notifications"
          description="Statutory bulletins and institutional announcements."
          items={content.officialNotifications}
          fields={[
            { name: "date", label: "Publication Date" },
            { name: "title", label: "Bulletin Title" },
            { name: "summary", label: "Announcement Brief", multiline: true }
          ]}
          onChange={(value) => setContent((current) => ({ ...current, officialNotifications: value }))}
          addItem={() => ({ date: "Date", title: "Bulletin title", summary: "Brief notification summary" })}
        />

        <ArrayEditor
          title="Administrative Inventory"
          description="Official communication channels for institutional correspondence."
          items={content.contactInventory}
          fields={[
            { name: "label", label: "Channel Label" },
            { name: "value", label: "Coordinate Data", multiline: true }
          ]}
          onChange={(value) => setContent((current) => ({ ...current, contactInventory: value }))}
          addItem={() => ({ label: "New Label", value: "Coordinate data" })}
        />

        <ArrayEditor
          title="Faculty Repository"
          description="Full pedagogical roster and scholarly profiles."
          items={content.facultyRepository ?? []}
          fields={[
            { name: "name", label: "Name" },
            { name: "slug", label: "Search Index Slug" },
            { name: "designation", label: "Academic Designation" },
            { name: "department", label: "Academic Division" },
            { name: "experience", label: "Professional Credentials" },
            { name: "email", label: "Correspondence Email" },
            { name: "image", label: "Profile Asset Path" },
            { name: "profile", label: "Professional Bio-Data", multiline: true }
          ]}
          onChange={(value) => setContent((current) => ({ ...current, facultyRepository: value }))}
          addItem={() => ({
            name: "Personnel Name",
            slug: "personnel-name",
            designation: "Designation",
            department: "Division",
            experience: "Credentials",
            email: "email@jntugv.edu.in",
            image: "/profiles/image.jpg",
            profile: "Bio-data brief"
          })}
        />

        <ArrayEditor
          title="Scholarly Downloads"
          description="Statutory academic documents and specialized research assets."
          items={content.scholarlyDownloads ?? []}
          fields={[
            { name: "title", label: "Document Nomenclature" },
            { name: "file", label: "Digital Asset Path" },
            { name: "description", label: "Resource Context", multiline: true }
          ]}
          onChange={(value) => setContent((current) => ({ ...current, scholarlyDownloads: value }))}
          addItem={() => ({
            title: "Document Nomenclature",
            file: "/downloads/resource.pdf",
            description: "Resource context brief"
          })}
        />

        <SectionCard
          title="Principal's Leadership Desk"
          description="Statutory leadership message and executive mandate."
        >
          <div className="cms-grid">
            <Field
              label="Message Title"
              value={content.principalLeadershipDesk?.title}
              onChange={(value) =>
                setContent((current) => ({
                  ...current,
                  principalLeadershipDesk: {
                    ...current.principalLeadershipDesk,
                    title: value
                  }
                }))
              }
            />
            <Field
              label="Executive Mandate / Message"
              value={content.principalLeadershipDesk?.message}
              multiline
              onChange={(value) =>
                setContent((current) => ({
                  ...current,
                  principalLeadershipDesk: {
                    ...current.principalLeadershipDesk,
                    message: value
                  }
                }))
              }
            />
          </div>
        </SectionCard>

        <ArrayEditor
          title="Campus Archive (Gallery)"
          description="Institutional visual record and event archive."
          items={content.campusArchive ?? []}
          fields={[
            { name: "title", label: "Asset Nomenclature" },
            { name: "image", label: "Visual Asset Path" },
            { name: "category", label: "Classification" }
          ]}
          onChange={(value) => setContent((current) => ({ ...current, campusArchive: value }))}
          addItem={() => ({
            title: "Archive Item",
            image: "/gallery/asset.jpg",
            category: "Classification"
          })}
        />
      </section>
    </main>
  );
}
