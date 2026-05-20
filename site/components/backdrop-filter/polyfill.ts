import polyfill from 'context-filter-polyfill?raw';

async function importPolyfillMin() {
  if (typeof globalThis.dispatchEvent !== 'function') {
    globalThis.dispatchEvent = () => true;
  }
  if (typeof globalThis.HTMLCanvasElement === 'undefined') {
    (globalThis as unknown as { HTMLCanvasElement: typeof HTMLCanvasElement }).HTMLCanvasElement =
      class {} as typeof HTMLCanvasElement;
  }
  if (typeof globalThis.CanvasRenderingContext2D === 'undefined') {
    (
      globalThis as unknown as { CanvasRenderingContext2D: typeof CanvasRenderingContext2D }
    ).CanvasRenderingContext2D = class {} as typeof CanvasRenderingContext2D;
  }
  if ('filter' in OffscreenCanvasRenderingContext2D.prototype) {
    delete (OffscreenCanvasRenderingContext2D.prototype as { filter?: string }).filter;
  }
  const code = polyfill
    .replaceAll('window.', 'globalThis.')
    .replaceAll('//# sourceMappingURL=index.js.map', '');

  const blob = new Blob([code], { type: 'text/javascript' });
  const blobUrl = URL.createObjectURL(blob);

  importScripts(blobUrl);
  URL.revokeObjectURL(blobUrl);
}

importPolyfillMin();
