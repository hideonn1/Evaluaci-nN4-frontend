export const RESOURCE_CATEGORIES = ['Redes', 'Computación', 'Sensores', 'Impresión 3D', 'Herramientas', 'Otros'] as const;
export const RESOURCE_STATUSES = ['Disponible', 'En uso', 'En mantención', 'Dado de baja'] as const;
export type ResourceCategory = typeof RESOURCE_CATEGORIES[number];
export type ResourceStatus = typeof RESOURCE_STATUSES[number];
export interface Resource {
  id: string;
  name: string;
  category: ResourceCategory;
  quantity: number;
  status: ResourceStatus;
  location: string;
  responsible?: string;
  registrationDate: string;
  description?: string;
}
