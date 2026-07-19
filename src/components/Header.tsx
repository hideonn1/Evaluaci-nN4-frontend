import React from 'react';
import ThemeToggle from './ThemeToggle';
export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4 md:px-8 h-16 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-primary">LabManager</h1>
          <p className="text-xs text-muted-foreground hidden sm:block">Gestión de Recursos Tecnológicos</p>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
