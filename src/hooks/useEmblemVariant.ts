import { useState, useEffect } from 'react';

export type EmblemVariant = 'squircle' | 'cartouche' | 'hexagon';

const STORAGE_KEY = 'zy_emblem_geometry_v2';
const EVENT_NAME = 'zy_emblem_variant_change';

export function getStoredVariant(): EmblemVariant {
  if (typeof window === 'undefined') return 'squircle';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'squircle' || saved === 'cartouche' || saved === 'hexagon') {
      return saved;
    }
    return 'squircle';
  } catch {
    return 'squircle';
  }
}

export function setStoredVariant(variant: EmblemVariant) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, variant);
  } catch {
    // Ignore localStorage errors
  }
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: variant }));
}

export function useEmblemVariant(): [EmblemVariant, (variant: EmblemVariant) => void] {
  const [variant, setVariant] = useState<EmblemVariant>(getStoredVariant);

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<EmblemVariant>;
      if (customEvent.detail) {
        setVariant(customEvent.detail);
      }
    };
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);

  return [variant, setStoredVariant];
}
