import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) {
    return <p className="text-center text-gray-400">Sin imágenes</p>;
  }

  const nextImage = () => {
    if (images.length > 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 1) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt={`Imagen ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition"
            onClick={prevImage}
          >
            <FaChevronLeft size={20} />
          </button>

          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition"
            onClick={nextImage}
          >
            <FaChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
