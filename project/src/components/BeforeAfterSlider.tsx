import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
  aspectRatio?: string;
}

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  className = '',
  aspectRatio = 'aspect-[4/3]',
}: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const offsetX = e.clientX - containerRect.left;
    
    // Calculate position as percentage of container width
    let newPosition = (offsetX / containerWidth) * 100;
    
    // Clamp between 10% and 90% to avoid slider disappearing
    newPosition = Math.max(10, Math.min(90, newPosition));
    
    setSliderPosition(newPosition);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const touch = e.touches[0];
    const offsetX = touch.clientX - containerRect.left;
    
    // Calculate position as percentage of container width
    let newPosition = (offsetX / containerWidth) * 100;
    
    // Clamp between 10% and 90%
    newPosition = Math.max(10, Math.min(90, newPosition));
    
    setSliderPosition(newPosition);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className={`comparison-slider relative overflow-hidden rounded-2xl shadow-xl ${aspectRatio} ${className}`}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* Before Image - Fixed Size */}
      <div className="absolute inset-0">
        <img 
          src={beforeImage} 
          alt="Before enhancement" 
          className="w-full h-full object-cover"
          draggable="false"
        />
      </div>
      
      {/* After Image - Shown using a clipping mask based on slider position */}
      <div 
        className="absolute inset-0"
        style={{
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
        }}
      >
        <img 
          src={afterImage} 
          alt="After enhancement" 
          className="w-full h-full object-cover"
          draggable="false"
        />
      </div>
      
      {/* Slider Handle */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        whileTap={{ scale: 1.1 }}
        animate={{ 
          x: isDragging ? 0 : [0, -5, 5, -5, 5, 0],
          transition: { duration: 1.5, repeat: Infinity, repeatDelay: 3 }
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="w-1 h-4 bg-slate-300 rounded-full"></div>
        </div>
      </motion.div>
      
      {/* Labels */}
      <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white text-xs font-medium px-2 py-1 rounded">
        Before
      </div>
      <div className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white text-xs font-medium px-2 py-1 rounded">
        After
      </div>
    </div>
  );
};

export default BeforeAfterSlider;