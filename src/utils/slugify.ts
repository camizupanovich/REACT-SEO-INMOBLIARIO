export const slugify = (text: string): string =>
  text
    .toString()
    .normalize('NFD')                   // separa acentos (á → a + ́)
    .replace(/[\u0300-\u036f]/g, '')    // elimina diacríticos
    .toLowerCase()                      // minúsculas
    .trim()                             // sin espacios a los lados
    .replace(/[^a-z0-9]+/g, '-')        // reemplaza grupos no alfanuméricos por guión
    .replace(/^-+|-+$/g, '');           // quita guiones al inicio y fin
