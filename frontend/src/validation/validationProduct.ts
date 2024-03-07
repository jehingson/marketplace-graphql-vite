import { object, string, number, boolean } from "yup";

export const validationProducts = () => {
  return object({
    name: string()
    .required("El nombre del producto es requerido")
    .min(1, "El nombre del producto tiene que tener al menos un carácter")
    .max(100, "El nombre del producto no puede superar los 100 carácteres"),
    description: string()
    .required("El descripción  del producto es requerido")
    .min(1, "El descripción  del tiene que tener al menos un carácter")
    .max(250, "El descripción  del no puede superar los 250 carácteres"),
    sku: string()
    .required("El Sku del producto es requerido")
    .min(1, "El Sku  del tiene que tener al menos un carácter")
    .max(100, "El Sku  del no puede superar los 100 carácteres"),
    prices: number()
      .required()
      .typeError('La cantidad de producto tiene que ser numérico')
      .positive('La cantidad de producto no puede ser 0')
      .min(1, 'La cantidad de producto tiene que ser mínimo de 1'),
    quantity: number()
      .required()
      .typeError('La cantidad de producto tiene que ser numérico')
      .positive('La cantidad de producto no puede ser 0')
      .min(1, 'La cantidad de producto tiene que ser mínimo de 1'),
    tax: boolean(),
  });
};
