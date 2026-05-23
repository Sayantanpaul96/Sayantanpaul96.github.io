function toggleCanvas() {
  const getCanvas = document.getElementById("canvas1");
  const particleScript = document.getElementById("particle-script");

  if (getCanvas.style.display !== "none") {
    getCanvas.style.display = "none";
    particleScript.parentElement.removeChild(particleScript);
  } else {
    getCanvas.style.display = "block";
    const newScript = document.createElement("script");
    newScript.id = "particle-script";
    newScript.src = "./scripts/particle.js";
    document.body.appendChild(newScript);
  }
}
