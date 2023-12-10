if (THREE && document.querySelector(".star-field")) {
  const starField = document.querySelector(".star-field");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  starField.appendChild(renderer.domElement);

  const starsGeometry = new THREE.BufferGeometry();
  const starsMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 1.5,
    transparent: true,
  });

  const starsVertices = [];
  const numStars = 2000;
  const trailLength = 3; // how long the trail is

  for (let i = 0; i < numStars; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;

    for (let j = 0; j < trailLength; j++) {
      starsVertices.push(x, y, z - j * 10);
    }
  }

  starsGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starsVertices, 3)
  );

  const stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);

  camera.position.z = 1000;

  function animate() {
    requestAnimationFrame(animate);
    c;
    // move towards the camera
    const positions = starsGeometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 2] += 3; //speed here

      // Reset logic
      if (i % (trailLength * 3) === 0 && positions[i + 2] > 1000) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;

        for (let j = 0; j < trailLength; j++) {
          const idx = i + j * 3;
          positions[idx] = x;
          positions[idx + 1] = y;
          positions[idx + 2] = z - j * 10;
        }
      }
    }

    starsGeometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  }

  animate();
} else {
  console.error("Three.js not loaded or .star-field element not found.");
}

// app flex box

document.addEventListener("DOMContentLoaded", (event) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // fade in % for how much must be seen
    }
  );

  document.querySelectorAll(".app-card").forEach((card) => {
    observer.observe(card);
  });
});
