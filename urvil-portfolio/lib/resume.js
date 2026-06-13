// Triggers the hidden resume download anchor rendered in page.jsx.
export function downloadResume() {
  const link = document.getElementById("resume-link");
  if (link) link.click();
}
