"use client";
import { Resource } from '../types/Resource';
interface ResourceCardProps {
  resource: Resource;
  onEdit: (resource: Resource) => void;
  onDelete: (id: string) => void;
}
export default function ResourceCard({ resource, onEdit, onDelete }: ResourceCardProps) {
  const getStatusClass = (status: string) => {
    switch(status) {
      case 'Disponible': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400';
      case 'En uso': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400';
      case 'En mantención': return 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400';
      case 'Dado de baja': return 'bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };
  return (
    <div className="rounded-xl border border-border bg-card text-card-foreground shadow transition-all hover:shadow-md hover:-translate-y-1 flex flex-col gap-4 p-6">
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-lg font-semibold leading-none tracking-tight">{resource.name}</h3>
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${getStatusClass(resource.status)}`}>{resource.status}</span>
      </div>
      <div className="text-sm text-muted-foreground grid gap-1.5">
        <p><strong className="font-medium text-foreground">ID:</strong> {resource.id}</p>
        <p><strong className="font-medium text-foreground">Categoría:</strong> {resource.category}</p>
        <p><strong className="font-medium text-foreground">Ubicación:</strong> {resource.location}</p>
        <p><strong className="font-medium text-foreground">Cantidad:</strong> {resource.quantity}</p>
        {resource.responsible && <p><strong className="font-medium text-foreground">Responsable:</strong> {resource.responsible}</p>}
      </div>
      {resource.description && (
        <div className="text-sm bg-secondary/50 p-3 rounded-md text-foreground">
          {resource.description}
        </div>
      )}
      <div className="flex gap-3 mt-auto pt-4 border-t border-border">
        <button 
          onClick={() => onEdit(resource)} 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 flex-1"
        >
          Editar
        </button>
        <button 
          onClick={() => onDelete(resource.id)} 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-9 px-4 py-2 flex-1"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
