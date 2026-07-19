"use client";
interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}
export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex-1 w-full md:w-auto min-w-[250px]">
      <input 
        type="text" 
        placeholder="Buscar recurso por nombre..." 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Buscar recurso por nombre"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
      />
    </div>
  );
}
