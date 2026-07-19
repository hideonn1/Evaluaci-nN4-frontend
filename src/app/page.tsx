"use client";
import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FilterCategory from '@/components/FilterCategory';
import ResourceList from '@/components/ResourceList';
import ResourceForm from '@/components/ResourceForm';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useSessionStorage } from '@/hooks/useSessionStorage';
import { Resource } from '@/types/Resource';
import { mockResources } from '@/utils/mockData';
export default function Home() {
  const [resources, setResources] = useLocalStorage<Resource[]>('lab_resources', []);
  const [searchQuery, setSearchQuery] = useSessionStorage<string>('lab_resource_search', '');
  const [filterCategory, setFilterCategory] = useSessionStorage<string>('lab_resource_filter', '');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState<Resource | null>(null);
  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const matchSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = filterCategory === '' || res.category === filterCategory;
      return matchSearch && matchCategory;
    });
  }, [resources, searchQuery, filterCategory]);
  const handleSaveResource = (resource: Resource) => {
    if (editingResource) {
      setResources(prev => prev.map(r => r.id === resource.id ? resource : r));
    } else {
      setResources(prev => [resource, ...prev]);
    }
    setIsFormOpen(false);
    setEditingResource(null);
  };
  const handleEditClick = (resource: Resource) => {
    setEditingResource(resource);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleDeleteClick = (id: string) => {
    const res = resources.find(r => r.id === id);
    if (res) {
      setResourceToDelete(res);
      setDeleteModalOpen(true);
    }
  };
  const confirmDelete = () => {
    if (resourceToDelete) {
      setResources(prev => prev.filter(r => r.id !== resourceToDelete.id));
      setDeleteModalOpen(false);
      setResourceToDelete(null);
    }
  };
  const handleLoadMockData = () => {
    if (window.confirm('¿Estás seguro de cargar los datos de prueba? Esto reemplazará tu lista actual por 25 recursos de ejemplo (5 por categoría).')) {
      setResources(mockResources);
    }
  };
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-7xl px-4 md:px-8 py-8 flex-1 flex flex-col">
        {isFormOpen ? (
          <ResourceForm 
            initialData={editingResource} 
            onSave={handleSaveResource} 
            onCancel={() => { setIsFormOpen(false); setEditingResource(null); }} 
          />
        ) : (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Inventario de Recursos</h2>
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              <button 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-10 px-4 py-2 flex-1 sm:flex-none" 
                onClick={handleLoadMockData}
              >
                📥 Cargar Datos Prueba
              </button>
              <button 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2 flex-1 sm:flex-none" 
                onClick={() => setIsFormOpen(true)}
              >
                + Registrar Recurso
              </button>
            </div>
          </div>
        )}
        {!isFormOpen && (
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <FilterCategory value={filterCategory} onChange={setFilterCategory} />
          </div>
        )}
        {!isFormOpen && (
          <ResourceList 
            resources={filteredResources} 
            onEdit={handleEditClick} 
            onDelete={handleDeleteClick} 
          />
        )}
        <ConfirmDeleteModal 
          isOpen={deleteModalOpen}
          resourceName={resourceToDelete?.name || ''}
          onConfirm={confirmDelete}
          onCancel={() => { setDeleteModalOpen(false); setResourceToDelete(null); }}
        />
      </main>
    </>
  );
}
