import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 -z-50 pointer-events-none"
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: { enable: false },
            onHover: { enable: false },
            resize: true,
          },
        },
        particles: {
          color: { value: "#6366f1" },
          links: { color: "#6366f1", distance: 150, enable: true, opacity: 0.1, width: 1 },
          move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: false, speed: 0.4, straight: false },
          number: { density: { enable: true, area: 800 }, value: 20 },
          opacity: { value: 0.2 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 2 } },
        },
        detectRetina: false,
      }}
    />
  );
};

export default ParticlesBackground;
