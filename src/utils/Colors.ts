// src/utils/colorUtils.ts
export function getTextColorFromBackground(hex: string): string {
  let color = hex.replace('#', '');
  if (color.length === 3) {
    color = color.split('').map(c => c + c).join('');
  }

  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}
/**
 * Analiza el brillo promedio de una imagen y determina si es "clara".
 * Escala la imagen a 50x50 píxeles para mejorar performance.
 */
export async function isImageBright(imageUrl: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // necesario si viene de CDN o dominio externo
    img.src = imageUrl;

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(false);

        const sampleSize = 50;
        canvas.width = sampleSize;
        canvas.height = sampleSize;

        // dibuja la imagen reducida al canvas
        ctx.drawImage(img, 0, 0, sampleSize, sampleSize);

        const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
        const data = imageData.data;

        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }

        const avgR = r / count;
        const avgG = g / count;
        const avgB = b / count;

        // brillo según fórmula perceptiva
        const brightness = (0.299 * avgR + 0.587 * avgG + 0.114 * avgB);
        resolve(brightness > 150); // true si es clara
      } catch {
        resolve(false);
      }
    };

    img.onerror = () => resolve(false);
  });
}
export function getTextColorByBrightness(img: HTMLImageElement): boolean {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return false;

  ctx.drawImage(img, 0, 0, img.width, img.height);
  const imageData = ctx.getImageData(0, 0, img.width, img.height);
  const data = imageData.data;

  let r = 0, g = 0, b = 0;
  const pixelCount = data.length / 4;

  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }

  r /= pixelCount;
  g /= pixelCount;
  b /= pixelCount;

  // Brillo promedio (0 oscuro - 255 claro)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // true = texto negro, false = texto blanco
  return brightness > 125;
}
