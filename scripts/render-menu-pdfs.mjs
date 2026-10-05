import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas } from "@napi-rs/canvas";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MENUS_DIR = path.join(ROOT, "public", "menus");
const PAGES_DIR = path.join(MENUS_DIR, "pages");
const MANIFEST_PATH = path.join(ROOT, "data", "menuPdfManifest.json");

// 2x scale keeps text crisp on retina screens without pages becoming too heavy.
const SCALE = 2;

const PDFS = [
  { file: "menu-brunch.pdf", slug: "brunch" },
  { file: "menu-soir.pdf", slug: "soir" },
  { file: "menu-boissons-soir.pdf", slug: "boissons-soir" },
];

async function renderPdf({ file, slug }) {
  const data = new Uint8Array(await readFile(path.join(MENUS_DIR, file)));
  const loadingTask = getDocument({ data });
  const doc = await loadingTask.promise;
  const outDir = path.join(PAGES_DIR, slug);
  await mkdir(outDir, { recursive: true });

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: SCALE });
    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext("2d");
    await page.render({ canvasContext: context, viewport }).promise;
    await writeFile(path.join(outDir, `page-${i}.png`), canvas.toBuffer("image/png"));
    page.cleanup();
  }

  const numPages = doc.numPages;
  await loadingTask.destroy();
  console.log(`${slug}: ${numPages} page(s)`);
  return numPages;
}

async function main() {
  const manifest = {};
  for (const pdf of PDFS) {
    manifest[pdf.slug] = await renderPdf(pdf);
  }
  await mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log("Manifest written to", MANIFEST_PATH);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
