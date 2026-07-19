import React from 'react';
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-border bg-card text-muted-foreground py-8">
      <div className="container mx-auto max-w-7xl px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-foreground font-semibold">LabManager</h3>
          <p className="text-sm">
            Sistema SPA avanzado para la gestión y control de recursos tecnológicos de laboratorio. 
            Construido con React, Next.js y enfocado en rendimiento.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-foreground font-semibold">Enlaces Rápidos</h4>
          <ul className="text-sm flex flex-col gap-2">
            <li><a href="#" className="hover:text-primary transition-colors">Inicio</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Reportes</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Soporte Técnico</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Manual de Usuario</a></li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-foreground font-semibold">Contacto</h4>
          <ul className="text-sm flex flex-col gap-2">
            <li>📍 Av. Universidad 123, Pabellón C</li>
            <li>✉️ soporte@labmanager.edu</li>
            <li>📞 +56 9 1234 5678</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8 pt-6 border-t border-border text-sm">
        <p>© {currentYear} LabManager. Todos los derechos reservados.</p>
        <p className="mt-2 text-xs">Desarrollado para Evaluación 4 - Integración de Inteligencia Artificial.</p>
      </div>
    </footer>
  );
}
