interface WorkerMessage {
  bitmap: ImageBitmap;
  mask: string;
  filter: string;
  offscreen?: OffscreenCanvas;
}
let timer: ReturnType<typeof setTimeout>;
let canvas: OffscreenCanvas, ctx: OffscreenCanvasRenderingContext2D | null;

import './polyfill';

function onMessage({ data }: MessageEvent<WorkerMessage>) {
  clearTimeout(timer);
  timer = setTimeout(async () => {
    clearTimeout(timer);
    const { offscreen, bitmap, filter, mask } = data;

    if (!canvas && offscreen) {
      canvas = offscreen;
      ctx = offscreen.getContext('2d');
    } else if (ctx) {
      // 创建一个OffscreenCanvas
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      ctx.clearRect(0, 0, bitmap.width, bitmap.height);
      ctx.filter = filter;
      ctx.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
      ctx.filter = 'none';
      ctx.fillStyle = mask;
      ctx.fillRect(0, 0, bitmap.width, bitmap.height);
    }
  }, 5);
}

addEventListener('message', onMessage, false);
