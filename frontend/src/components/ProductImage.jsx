import { useState, useRef } from "react";

function ProductImage({ image, name, width = 150, height = 120 }) {
  const imageUrl = image?.url || "/placeholder.png";
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const moveX = ((x - centerX) / centerX) * 15;
    const moveY = ((y - centerY) / centerY) * 15;
    
    setTransform({ x: moveX, y: moveY });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 });
  };

  const handleTouchMove = (e) => {
    if (!imgRef.current) return;
    const touch = e.touches[0];
    const rect = imgRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const moveX = ((x - centerX) / centerX) * 15;
    const moveY = ((y - centerY) / centerY) * 15;
    
    setTransform({ x: moveX, y: moveY });
  };

  const handleTouchEnd = () => {
    setTransform({ x: 0, y: 0 });
  };

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        overflow: "hidden",
        borderRadius: "12px",
        position: "relative",
        cursor: "pointer"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <img
        ref={imgRef}
        src={imageUrl}
        alt={name}
        width={width}
        height={height}
        style={{
          objectFit: "cover",
          borderRadius: "12px",
          width: "100%",
          height: "100%",
          transition: "transform 0.3s ease-out",
          transform: `translate(${transform.x}px, ${transform.y}px) scale(1.05)`,
          userSelect: "none"
        }}
      />
    </div>
  );
}

export default ProductImage;
