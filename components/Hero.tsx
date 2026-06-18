"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-[#050714]">

      {/* BACKGROUND BLOBS */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-600 rounded-full blur-[120px] opacity-40 animate-pulse"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-blue-600 rounded-full blur-[120px] opacity-40 animate-pulse"></div>

      {/* CONTENT */}
      <div className="text-center z-10">

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-bold"
        >
          NEXORA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-300 mt-4 text-lg"
        >
          Your complete academic universe in one place
        </motion.p>

        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.1 }}
          className="mt-8 px-6 py-3 rounded-full bg-white text-black font-semibold"
        >
          Enter Learning Hub
        </motion.button>

      </div>
    </div>
  );
}