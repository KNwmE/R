import { createContext, useContext, useEffect, useState } from 'react';

// Hex values the 3D scene needs (it cannot read CSS variables).
export const palettes = {
  emerald: { label: 'Emerald', swatch: '#0F6B4F', tint: '#8FD3B6', glow: '#0F6B4F' },
  oxblood: { label: 'Oxblood', swatch: '#7B2D26', tint: '#E7B2A6', glow: '#7B2D26' },
  bronze: { label: 'Bronze', swatch: '#7A5A22', tint: '#DCC08A', glow: '#7A5A22' },
};

const Ctx = createContext({ name: 'emerald', set: () => {} });
export const usePalette = () => useContext(Ctx);

export function PaletteProvider({ children }) {
  const [name, setName] = useState(() => {
    try { const v = localStorage.getItem('washuvi-palette'); return palettes[v] ? v : 'emerald'; } catch { return 'emerald'; }
  });
  useEffect(() => {
    document.documentElement.dataset.palette = name;
    try { localStorage.setItem('washuvi-palette', name); } catch { /* storage unavailable */ }
  }, [name]);
  return <Ctx.Provider value={{ name, set: setName, p: palettes[name] }}>{children}</Ctx.Provider>;
}
