document.getElementById("open-resume").addEventListener("click", (event) => {
  event.preventDefault();
  const resumeURL = "./utils/documents/resume.pdf";
  window.open(resumeURL, "_blank");
});
