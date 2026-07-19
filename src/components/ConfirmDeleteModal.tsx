"use client";
import React, { useEffect } from 'react';
interface ConfirmDeleteModalProps {
  isOpen: boolean;
  resourceName: string;
  onConfirm: () => void;
  onCancel: () => void;
}
export default function ConfirmDeleteModal({ isOpen, resourceName, onConfirm, onCancel }: ConfirmDeleteModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        className="w-full max-w-md bg-card rounded-xl shadow-lg border border-border p-6"
      >
        <h3 id="delete-dialog-title" className="text-xl font-semibold text-destructive mb-4">Confirmar Eliminación</h3>
        <p className="text-foreground mb-6">
          ¿Estás seguro de que deseas eliminar el recurso <strong className="font-semibold">{resourceName}</strong>? Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-3">
          <button 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2" 
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-9 px-4 py-2" 
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
