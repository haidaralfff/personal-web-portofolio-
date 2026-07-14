import { jsPDF } from "jspdf";
import { cvData } from "../data/cvData";

function addSection(doc, title, y, margin, contentW) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(20, 20, 20);
  doc.text(title, margin, y);
  y += 1.5;
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.3);
  doc.line(margin, y, margin + contentW, y);
  return y + 4;
}

function addText(doc, text, x, y, options = {}) {
  const {
    font = "helvetica",
    style = "normal",
    size = 9,
    color = [50, 50, 50],
    maxWidth,
    indent = 0,
  } = options;

  doc.setFont(font, style);
  doc.setFontSize(size);
  doc.setTextColor(...color);

  const effectiveX = x + indent;
  const effectiveMaxW = maxWidth ? maxWidth - indent : undefined;

  if (effectiveMaxW) {
    const lines = doc.splitTextToSize(text, effectiveMaxW);
    doc.text(lines, effectiveX, y);
    return y + lines.length * 3.8 + 1;
  }

  doc.text(text, effectiveX, y);
  return y + 3.8 + 1;
}

function addBullet(doc, text, x, y, maxW) {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  doc.text("- ", x + 2, y);
  const lines = doc.splitTextToSize(text, maxW - 6);
  doc.text(lines, x + 6, y);
  return y + lines.length * 3.8 + 1;
}

function addKeyValue(doc, key, value, x, y, maxW) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 40);
  doc.text(key + ":", x + 2, y);
  const keyW = doc.getTextWidth(key + ": ");
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  const valLines = doc.splitTextToSize(value, maxW - keyW - 4);
  doc.text(valLines, x + 2 + keyW, y);
  return y + valLines.length * 3.8 + 1;
}

export function generateAndDownloadCV() {
  const { personal, summary, education, skills, experience, certifications, projects } = cvData;

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 18;
  const contentW = pageW - margin * 2;
  let y = margin;

  // ── NAME ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(20, 20, 20);
  doc.text(personal.name, margin, y);
  y += 7;

  // ── CONTACT ──
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  const contactLine = [
    personal.email,
    personal.phone,
    personal.location,
    personal.linkedin,
    personal.github,
  ]
    .filter(Boolean)
    .join("  |  ");
  const contactLines = doc.splitTextToSize(contactLine, contentW);
  doc.text(contactLines, margin, y);
  y += contactLines.length * 3.5 + 4;

  // ── SUMMARY ──
  y = addSection(doc, "SUMMARY", y, margin, contentW);
  y = addText(doc, summary, margin, y, { maxWidth: contentW });
  y += 3;

  // ── EDUCATION ──
  y = addSection(doc, "EDUCATION", y, margin, contentW);
  education.forEach((edu) => {
    y = addText(doc, edu.school, margin, y, {
      style: "bold",
      size: 9.5,
      color: [30, 30, 30],
    });
    y = addText(doc, `${edu.degree}  •  ${edu.period}`, margin, y, {
      size: 8.5,
      color: [100, 100, 100],
    });
    if (edu.details) {
      y = addText(doc, edu.details, margin, y, { maxWidth: contentW, size: 8.5 });
    }
    y += 2;
  });
  y += 1;

  // ── SKILLS ──
  y = addSection(doc, "SKILLS", y, margin, contentW);
  y = addKeyValue(doc, "Frontend", skills.frontend.join(", "), margin, y, contentW);
  y = addKeyValue(doc, "Tools", skills.tools.join(", "), margin, y, contentW);
  if (skills.learning?.length) {
    y = addKeyValue(doc, "Learning", skills.learning.join(", "), margin, y, contentW);
  }
  y += 2;

  // ── EXPERIENCE ──
  y = addSection(doc, "EXPERIENCE", y, margin, contentW);
  experience.forEach((exp) => {
    y = addText(doc, exp.title, margin, y, {
      style: "bold",
      size: 9.5,
      color: [30, 30, 30],
    });
    y = addText(doc, exp.period, margin, y, {
      size: 8.5,
      color: [100, 100, 100],
    });
    y = addText(doc, exp.description, margin, y, { maxWidth: contentW, size: 8.5 });
    y += 2;
  });
  y += 1;

  // ── CERTIFICATIONS ──
  y = addSection(doc, "CERTIFICATIONS", y, margin, contentW);
  certifications.forEach((cert) => {
    y = addText(doc, `${cert.title}  —  ${cert.issuer} (${cert.date})`, margin, y, {
      size: 8.5,
    });
  });
  y += 3;

  // ── PROJECTS ──
  y = addSection(doc, "PROJECTS", y, margin, contentW);
  projects.forEach((proj) => {
    y = addText(doc, proj.title, margin, y, {
      style: "bold",
      size: 9.5,
      color: [30, 30, 30],
    });
    y = addText(doc, `[${proj.tech.join(", ")}]`, margin, y, {
      size: 8,
      color: [100, 100, 100],
    });
    y = addText(doc, proj.description, margin, y, { maxWidth: contentW, size: 8.5 });
    y += 2;
  });

  // ── FOOTER ──
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(170, 170, 170);
    doc.text(
      `${personal.name}  •  ${new Date().getFullYear()}`,
      margin,
      290
    );
  }

  doc.save(`${personal.name.replace(/\s+/g, "_")}_CV.pdf`);
}
