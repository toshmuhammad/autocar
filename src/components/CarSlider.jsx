import { useEffect, useState } from "react";

export default function CarSlider({ images }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images]);

  if (!images?.length) return null;

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <img
        src={images[index]}
        alt={`Car ${index + 1}`}
        className="w-full h-64 object-cover rounded-xl shadow"
      />
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
