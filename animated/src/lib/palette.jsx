import { createContext, useContext, useEffect, useState } from 'react';

// Hex values the 3D scene needs (it cannot read CSS variables).
export const palettes = {
  forest: { label: 'Forest & Brass', swatch: '#2F4A3E', tint: '#C4A574', glow: '#2F4A3E' },
  terracotta: { label: 'Terracotta & Sand', swatch: '#8A4A33', tint: '#D8B48C', glow: '#8A4A33' },
  slate: { label: 'Slate & Stone', swatch: '#3A4B57', tint: '#B9C3C6', glow: '#3A4B57' },
};

const Ctx = createContext({ name: 'forest', set: () => {} });
export const usePalette = () => useContext(Ctx);

export function PaletteProvider({ children }) {
  const [name, setName] = useState(() => {
    try { const v = localStorage.getItem('washuvi-palette'); return palettes[v] ? v : 'forest'; } catch { return 'forest'; }
  });
  useEffect(() => {
    document.documentElement.dataset.palette = name;
    try { localStorage.setItem('washuvi-palette', name); } catch { /* storage unavailable */ }
  }, [name]);
  return <Ctx.Provider value={{ name, set: setName, p: palettes[name] }}>{children}</Ctx.Provider>;
}
