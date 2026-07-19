import { Resource } from '../types/Resource';
import ResourceCard from './ResourceCard';
interface ResourceListProps {
  resources: Resource[];
  onEdit: (resource: Resource) => void;
  onDelete: (id: string) => void;
}
export default function ResourceList({ resources, onEdit, onDelete }: ResourceListProps) {
  if (resources.length === 0) {
    return (
      <div className="text-center py-12 px-4 text-muted-foreground bg-card rounded-xl border border-border">
        <p>No se encontraron recursos. Intenta con otra búsqueda o registra un nuevo recurso.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {resources.map(resource => (
        <ResourceCard 
          key={resource.id} 
          resource={resource} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}
