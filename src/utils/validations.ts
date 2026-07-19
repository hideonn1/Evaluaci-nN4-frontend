import { Resource } from '../types/Resource';
export function validateResource(resource: Partial<Resource>): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!resource.id?.trim()) {
    errors.id = "El ID es obligatorio";
  }
  if (!resource.name?.trim()) {
    errors.name = "El nombre es obligatorio";
  }
  if (!resource.category) {
    errors.category = "La categoría es obligatoria";
  }
  if (resource.quantity === undefined || resource.quantity === null) {
    errors.quantity = "La cantidad es obligatoria";
  } else if (isNaN(Number(resource.quantity)) || Number(resource.quantity) < 0) {
    errors.quantity = "La cantidad debe ser un número válido mayor o igual a 0";
  }
  if (!resource.status) {
    errors.status = "El estado es obligatorio";
  }
  if (!resource.location?.trim()) {
    errors.location = "La ubicación es obligatoria";
  }
  if (!resource.registrationDate) {
    errors.registrationDate = "La fecha de registro es obligatoria";
  }
  return errors;
}
