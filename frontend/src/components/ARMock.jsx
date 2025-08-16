import React, { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";

// Lightweight AR mock: shows camera feed (if allowed) and a floating token
export default function ARMock({ color = "#065f46", onClose }) {
  const videoRef = useRef(null);
  const tokenRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let stream;
    async function init() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (e) {
        setError("Cámara no disponible, usando fondo simulado.");
      }
    }
    init();

    const handleOrient = (e) => {
      const x = Math.max(-15, Math.min(15, e.beta || 0));
      const y = Math.max(-15, Math.min(15, e.gamma || 0));
      if (tokenRef.current) {
        tokenRef.current.style.transform = `translate(-50%, -50%) rotateX(${x / 3}deg) rotateY(${y / 3}deg)`;
      }
    };
    window.addEventListener("deviceorientation", handleOrient, true);

    return () => {
      window.removeEventListener("deviceorientation", handleOrient, true);
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/80" />
      <div className="absolute inset-4 rounded-xl overflow-hidden shadow-2xl">
        <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
        {error && (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 to-emerald-700 flex items-center justify-center text-white">
            {error}
          </div>
        )}
        <div
          ref={tokenRef}
          className="absolute left-1/2 top-1/2 w-24 h-24 rounded-full border-4 shadow-2xl"
          style={{ background: color, borderColor: "rgba(255,255,255,0.7)" }}
        />
        <div className="absolute top-3 right-3">
          <Button onClick={onClose} variant="secondary" className="bg-white/90">Salir AR</Button>
        </div>
      </div>
    </div>
  );
}