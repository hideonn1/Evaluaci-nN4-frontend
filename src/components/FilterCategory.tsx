"use client";
import { RESOURCE_CATEGORIES } from '../types/Resource';
interface FilterCategoryProps {
  value: string;
  onChange: (val: string) => void;
}
export default function FilterCategory({ value, onChange }: FilterCategoryProps) {
  return (
    <div className="w-full md:w-[250px]">
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        aria-label="Filtrar por categoría"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
      >
        <option value="">Todas las categorías</option>
        {RESOURCE_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}
