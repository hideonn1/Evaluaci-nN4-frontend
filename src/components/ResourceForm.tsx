"use client";
import { useState, useEffect } from 'react';
import { Resource, RESOURCE_CATEGORIES, RESOURCE_STATUSES } from '../types/Resource';
import { validateResource } from '../utils/validations';
interface ResourceFormProps {
  initialData?: Resource | null;
  onSave: (resource: Resource) => void;
  onCancel: () => void;
}
const AI_SUGGESTIONS: Partial<Record<string, string>> = {
  'Redes': 'Verifica la disponibilidad de puertos libres antes de asignar equipos de red.',
  'Sensores': 'Recuerda revisar el estado de la batería de los sensores IoT antes de usarlos.',
  'Computación': 'Revisa que el equipo tenga instalados los drivers y software actualizado antes de asignarlo.',
  'Impresión 3D': 'Verifica el nivel de filamento y la calibración de la cama antes de iniciar una impresión.',
};
export default function ResourceForm({ initialData, onSave, onCancel }: ResourceFormProps) {
  const [generatedId] = useState(() => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return `rec-${crypto.randomUUID().split('-')[0]}`;
    }
    return `rec-${Math.random().toString(36).substring(2, 9)}`;
  });
  const [formData, setFormData] = useState<Partial<Resource>>({
    id: generatedId,
    name: '',
    category: '' as Resource['category'],
    quantity: 1,
    status: 'Disponible',
    location: '',
    responsible: '',
    registrationDate: new Date().toISOString().split('T')[0],
    description: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setErrors({});
    }
  }, [initialData]);
  const aiSuggestion = formData.category ? AI_SUGGESTIONS[formData.category] ?? null : null;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? (value === '' ? '' : Number(value)) : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateResource(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave(formData as Resource);
  };
  const inputClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors";
  const labelClass = "text-sm font-medium leading-none mb-2 block";
  const errorClass = "text-[0.8rem] font-medium text-destructive mt-1 block";
  return (
    <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-semibold leading-none tracking-tight text-primary mb-6">
        {initialData ? 'Editar Recurso' : 'Registrar Nuevo Recurso'}
      </h2>
      {aiSuggestion && (
        <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-md mb-6 flex gap-3 items-start" role="note">
          <span className="text-xl" aria-hidden="true">🤖</span>
          <p className="text-sm font-medium text-primary">
            <strong>Sugerencia IA:</strong> {aiSuggestion}
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label htmlFor="field-id" className={labelClass}>ID del Recurso</label>
            <input
              id="field-id"
              type="text"
              name="id"
              value={formData.id ?? ''}
              onChange={handleChange}
              disabled={!!initialData}
              className={inputClass}
            />
            {errors.id && <span className={errorClass} role="alert">{errors.id}</span>}
          </div>
          <div>
            <label htmlFor="field-name" className={labelClass}>Nombre *</label>
            <input
              id="field-name"
              type="text"
              name="name"
              value={formData.name ?? ''}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.name && <span className={errorClass} role="alert">{errors.name}</span>}
          </div>
          <div>
            <label htmlFor="field-category" className={labelClass}>Categoría *</label>
            <select
              id="field-category"
              name="category"
              value={formData.category ?? ''}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Seleccione una categoría</option>
              {RESOURCE_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <span className={errorClass} role="alert">{errors.category}</span>}
          </div>
          <div>
            <label htmlFor="field-quantity" className={labelClass}>Cantidad *</label>
            <input
              id="field-quantity"
              type="number"
              name="quantity"
              value={formData.quantity ?? ''}
              onChange={handleChange}
              min="0"
              className={inputClass}
            />
            {errors.quantity && <span className={errorClass} role="alert">{errors.quantity}</span>}
          </div>
          <div>
            <label htmlFor="field-status" className={labelClass}>Estado *</label>
            <select
              id="field-status"
              name="status"
              value={formData.status ?? ''}
              onChange={handleChange}
              className={inputClass}
            >
              {RESOURCE_STATUSES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.status && <span className={errorClass} role="alert">{errors.status}</span>}
          </div>
          <div>
            <label htmlFor="field-location" className={labelClass}>Ubicación *</label>
            <input
              id="field-location"
              type="text"
              name="location"
              value={formData.location ?? ''}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.location && <span className={errorClass} role="alert">{errors.location}</span>}
          </div>
          <div>
            <label htmlFor="field-responsible" className={labelClass}>Responsable</label>
            <input
              id="field-responsible"
              type="text"
              name="responsible"
              value={formData.responsible ?? ''}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="field-date" className={labelClass}>Fecha de Registro *</label>
            <input
              id="field-date"
              type="date"
              name="registrationDate"
              value={formData.registrationDate ?? ''}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.registrationDate && <span className={errorClass} role="alert">{errors.registrationDate}</span>}
          </div>
        </div>
        <div className="mt-6">
          <label htmlFor="field-description" className={labelClass}>Descripción</label>
          <textarea
            id="field-description"
            name="description"
            value={formData.description ?? ''}
            onChange={handleChange}
            rows={3}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
          />
        </div>
        <div className="flex gap-4 mt-8 justify-end">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-10 px-6 py-2"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6 py-2"
          >
            Guardar Recurso
          </button>
        </div>
      </form>
    </div>
  );
}
