import { useEffect, useRef, useState } from "react";

export default function App() {
  const canvasRef = useRef(null);
  const planeRef = useRef(null);
  const [multiplier, setMultiplier] = useState(1);

  useEffect(() => {
    let t = 0;
    let animation;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      let lastX = 0;
      let lastY = canvas.height;

      for (let i = 0; i < t; i++) {
        let x = i * 4;
        let y = canvas.height - Math.exp(0.025 * i);

        ctx.lineTo(x, y);
        lastX = x;
        lastY = y;
      }

      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
      ctx.shadowColor = "red";
      ctx.shadowBlur = 10;
      ctx.stroke();

      // Plane movement
      if (planeRef.current) {
        planeRef.current.style.transform = `translate(${lastX}px, ${lastY}px)`;
      }

      setMultiplier((1 + t * 0.01).toFixed(2));

      t++;
      animation = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <div style={{ background: "#0b0f1a", height: "100vh", color: "#fff" }}>
      <h1 style={{ textAlign: "center", padding: "10px" }}>
        {multiplier}x
      </h1>

      <div style={{ position: "relative", width: "100%", height: "300px" }}>
        <canvas ref={canvasRef} width={500} height={300} />

        <div
          ref={planeRef}
          style={{
            position: "absolute",
            width: "20px",
            height: "20px",
            background: "red",
            borderRadius: "50%",
            boxShadow: "0 0 10px red",
          }}
        />
      </div>
    </div>
  );
}
