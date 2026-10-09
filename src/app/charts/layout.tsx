import type { ReactNode } from "react";

export default function ChartsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <style>{`.chart-fig{display:flex;align-items:center;justify-content:center;width:100%;height:100%}.chart-fig>svg{width:100%;height:100%;max-width:100%;max-height:100%}`}</style>
      {children}
    </>
  );
}
