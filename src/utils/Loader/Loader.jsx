import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.5)]">
        <div id="loader" className="flex flex-col gap-1 items-center">
            <motion.div
                className="w-10 h-10 border-3 border-t-[#002f34] border-b-gray-300 border-l-gray-300 border-r-gray-300 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <span className="inline-block !mt-2 text-16 text-olx_text_white font-semibold">Loading...</span>
        </div>
    </div>
  );
};

export default Loader;
