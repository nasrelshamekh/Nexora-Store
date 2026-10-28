"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <Button
        size="icon"
        onClick={scrollToTop}
        className="cursor-pointer rounded-full shadow-xl border border-border/60 hover:scale-110 active:scale-95 transition-all bg-card/90 backdrop-blur-md text-foreground hover:bg-primary hover:text-primary-foreground size-11"
        aria-label="Scroll back to top"
      >
        <ChevronUp className="h-5 w-5" />
      </Button>
    </div>
  );
}
