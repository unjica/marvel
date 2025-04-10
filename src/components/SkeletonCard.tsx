import React from 'react';
import { motion } from 'framer-motion';

const SkeletonCard: React.FC = () => {
  const pulseAnimation = {
    opacity: [0.6, 1, 0.6],
  };

  const pulseTransition = {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut" as const,
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col gap-5 h-full p-4">
      {/* Animated Placeholder for Image */}
      <motion.div
        className="w-full h-[280px] bg-gray-300"
        animate={pulseAnimation}
        transition={pulseTransition}
      />
      <div className="flex flex-col items-center flex-grow gap-5 mb-2">
        {/* Animated Placeholder for Title */}
        <motion.div
          className="h-5 bg-gray-300 rounded w-3/4"
          animate={pulseAnimation}
          transition={{ ...pulseTransition, delay: 0.2 }}
        />
        {/* Animated Placeholder for Price */}
        <motion.div
          className="h-4 bg-gray-300 rounded w-1/4"
          animate={pulseAnimation}
          transition={{ ...pulseTransition, delay: 0.4 }}
        />
        {/* Animated Placeholder for Button */}
        <motion.div
          className="h-10 bg-gray-300 rounded w-1/2"
          animate={pulseAnimation}
          transition={{ ...pulseTransition, delay: 0.6 }}
        />
      </div>
    </div>
  );
};

export default SkeletonCard;