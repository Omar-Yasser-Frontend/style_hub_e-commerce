import { useEffect, useRef, useCallback } from "react";

type ClickHandler = (event: MouseEvent) => void;

class GlobalClickManager {
  private handlers: Set<ClickHandler> = new Set();
  private isListening = false;

  addHandler(handler: ClickHandler) {
    this.handlers.add(handler);
    this.startListening();
  }

  removeHandler(handler: ClickHandler) {
    this.handlers.delete(handler);
    if (this.handlers.size === 0) {
      this.stopListening();
    }
  }

  private startListening() {
    if (this.isListening) return;
    this.isListening = true;
    document.addEventListener("mousedown", this.handleGlobalClick);
  }

  private stopListening() {
    if (!this.isListening) return;
    this.isListening = false;
    document.removeEventListener("mousedown", this.handleGlobalClick);
  }

  private handleGlobalClick = (event: MouseEvent) => {
    this.handlers.forEach((handler) => handler(event));
  };
}

// Singleton instance
const globalClickManager = new GlobalClickManager();

function useGlobalOutsideClick(close: () => void, isActive: boolean = true) {
  const ref = useRef<HTMLElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    if (!isActive) return;

    globalClickManager.addHandler(handleClickOutside);

    return () => {
      globalClickManager.removeHandler(handleClickOutside);
    };
  }, [handleClickOutside, isActive]);

  return ref;
}

export default useGlobalOutsideClick;
