import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, onSnapshot, doc, getDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AnnouncementBanner = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [rotateEnabled, setRotateEnabled] = useState(true);
  const navigate = useNavigate();

  // Real-time listener for global store settings (including rotation)
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "metadata", "settings"), (snap) => {
      if (snap.exists()) {
        const settings = snap.data();
        setRotateEnabled(settings.rotateAnnouncements !== false);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "news"), 
      orderBy("date", "desc")
    );
    
    const unsub = onSnapshot(q, (snap) => {
      const allNews = snap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      const activeList = allNews.filter(item => {
        const start = item.startDate ? new Date(item.startDate) : null;
        const end = item.endDate ? new Date(item.endDate) : null;
        
        if (start) start.setHours(0, 0, 0, 0);
        if (end) end.setHours(23, 59, 59, 999);

        const isStarted = !start || now >= start;
        const isNotExpired = !end || now <= end;
        
        return isStarted && isNotExpired;
      });

      setAnnouncements(activeList);
      // Only reset if our current index is out of bounds
      setCurrentIndex(prev => prev >= activeList.length ? 0 : prev);
    });

    return () => unsub();
  }, []);

  // Rotation logic
  useEffect(() => {
    if (rotateEnabled && announcements.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % announcements.length);
      }, 5000); // Rotate every 5 seconds
      return () => clearInterval(timer);
    }
  }, [rotateEnabled, announcements.length]);

  const handleBannerClick = () => {
    const current = announcements[currentIndex];
    if (!current) return;
    
    let path = "/shop";
    const params = new URLSearchParams();
    
    if (current.targetCategory && current.targetCategory !== "All") {
      params.append("category", current.targetCategory);
    }
    if (current.targetSubCategory && current.targetSubCategory !== "All") {
      params.append("subcategory", current.targetSubCategory);
    }
    if (current.discountPercent) {
      params.append("discount", current.discountPercent);
    }
    
    const queryString = params.toString();
    if (queryString) {
      navigate(`${path}?${queryString}`);
    } else {
      navigate(path);
    }
  };

  if (announcements.length === 0 || !isVisible) return null;

  const currentAnnouncement = announcements[currentIndex];

  return (
    <div 
      className="bg-[#310101] text-[#E5D5C5] relative z-[60] border-b border-white/5 cursor-pointer hover:bg-[#3d0202] transition-colors group overflow-hidden h-10 sm:h-12 flex items-center" 
      onClick={handleBannerClick}
    >
      <div className="w-full relative flex items-center overflow-hidden h-full">
        {/* Continuous Marquee Container */}
        <div className="flex items-center gap-0 whitespace-nowrap h-full">
          <motion.div 
            animate={rotateEnabled ? { x: ["0%", "-50%"] } : { x: 0 }}
            transition={{ 
              duration: Math.max(20, announcements.length * 10), 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex items-center gap-12 sm:gap-24 pl-8"
          >
            {/* Double the list for seamless looping */}
            {[...announcements, ...announcements].map((announcement, idx) => (
              <div key={`${announcement.id}-${idx}`} className="flex items-center gap-4 sm:gap-6">
                 <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B0843D] animate-pulse" />
                    <span className="text-[11px] sm:text-[13px] md:text-[15px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em]">
                      {announcement.title}
                    </span>
                 </div>
                 <div className="w-1.5 h-1.5 rounded-full bg-[#B0843D]/40 shrink-0" />
                 <span className="text-[11px] sm:text-[13px] md:text-[14px] font-serif italic text-[#B0843D] font-bold">
                   {announcement.content}
                 </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Backdrop Gradients for Fade effect on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#310101] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#310101] to-transparent z-10 pointer-events-none flex items-center justify-end pr-4">
           <button 
             onClick={(e) => {
               e.stopPropagation();
               setIsVisible(false);
             }}
             className="p-1.5 hover:bg-white/10 rounded-full transition-colors pointer-events-auto bg-[#310101]/80 backdrop-blur-sm shadow-xl"
           >
             <X className="w-4 h-4 opacity-40 hover:opacity-100" />
           </button>
        </div>
      </div>
      
      {/* Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-full bg-[#B0843D]/5 blur-3xl pointer-events-none" />
    </div>
  );
};

export default AnnouncementBanner;
