import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { css } from '@moneko/css';
import notification from 'neko-ui/es/notification';

import 'neko-ui/es/color-palette';
import 'context-filter-polyfill';

const styles = css`
  .box {
    margin: 0 auto 24px;
    border-radius: var(--border-radius);
    padding: 16px;
    background: var(--component-bg);
    box-shadow: 0 0.125rem 0.5rem 0 var(--primary-shadow);
    max-inline-size: 80rem;
  }

  canvas {
    inline-size: 100%;
    object-fit: contain;
    display: block;
    margin: auto;
    max-inline-size: 350px;
  }

  .fileds {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    max-inline-size: 350px;
    margin: auto;
  }

  .palette {
    border: var(--border-base);
    border-radius: var(--border-radius);
    padding: 6px 12px;
    background: var(--component-bg);
  }
`;

function BackdropFilter() {
  let canvas: HTMLCanvasElement | undefined;
  const [bitmap, setBitmap] = createSignal<ImageBitmap>();
  const [blur, setBlur] = createSignal(32);
  const [quality, setQuality] = createSignal(2);
  const [mask, setMask] = createSignal('rgba(255, 255, 255, 0.65)');
  const [loading, setLoading] = createSignal(false);
  const worker = new Worker(new URL('./worker.ts', import.meta.url));
  const upload = new Worker(new URL('./upload.ts', import.meta.url));

  function changeImage(e: Event & { target: HTMLInputElement }) {
    if (e.target.files && e.target.files[0]) {
      const chunks: BlobPart[] = [];
      const reader = e.target.files[0].stream().getReader();

      async function processText({ done, value }: { value?: BlobPart; done: boolean }) {
        if (done) {
          const blob = new Blob(chunks);

          createImageBitmap(blob).then((imgBitmap) => {
            setBitmap(imgBitmap);
            upload.postMessage({
              filename: e.target.files![0].name,
              file: e.target.files![0],
            });
          });
          return;
        }
        chunks.push(value!);
        reader.read().then(processText);
      }

      reader.read().then(processText);
    }
  }
  function maskChange(e: CustomEvent<string>) {
    setMask(void 0 === e.detail ? 'rgba(255, 255, 255, 0.65)' : e.detail);
  }
  function blurChange(e: CustomEvent<number | undefined>) {
    setBlur(void 0 === e.detail ? 32 : e.detail);
  }
  function qualityChange(e: CustomEvent<number | undefined>) {
    setQuality(void 0 === e.detail ? 2 : e.detail);
  }
  function draw() {
    if (bitmap()) {
      worker.postMessage(
        {
          bitmap: bitmap(),
          mask: mask(),
          filter: `blur(${blur()}px)`,
        },
        [],
      );
    } else {
      notification.warning('请选择图片!');
    }
  }

  function download() {
    if (bitmap()) {
      setLoading(true);
      canvas!.toBlob(
        (blob) => {
          if (blob) {
            const link = document.createElement('a');

            link.href = URL.createObjectURL(blob);
            link.download = `${new Date().toLocaleString().replaceAll('/', '-')}.png`; // 设置下载文件名
            link.click(); // 模拟点击下载链接
            link.remove();
          } else {
            notification.warning('无图片数据');
          }
          setLoading(false);
        },
        'image/png',
        quality(),
      );
    } else {
      notification.warning('请选择图片!');
    }
  }

  createEffect(() => {
    draw();
  });
  onMount(() => {
    const offscreen = canvas!.transferControlToOffscreen();

    worker.postMessage({ offscreen }, [offscreen]);
  });
  onCleanup(() => {
    worker.terminate();
    upload.terminate();
  });

  return (
    <>
      <style textContent={styles} />
      <div class="box">
        <canvas ref={canvas} />
        <div class="fileds">
          <input type="file" accept="image/*" onChange={changeImage} />
          <div class="palette">
            <n-typography>蒙版颜色</n-typography>
            <n-color-palette value={mask()} onChange={maskChange} />
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <n-input-number label="模糊度" min={0} step={1} value={blur()} onChange={blurChange} />
            <n-input-number
              label="保存质量"
              min={0.5}
              max={10}
              step={0.1}
              value={quality()}
              onChange={qualityChange}
            />
          </div>
          <n-button
            loading={loading()}
            disabled={!bitmap()}
            block={true}
            type="primary"
            fill={true}
            onClick={download}
          >
            保存
          </n-button>
        </div>
      </div>
    </>
  );
}

export default BackdropFilter;
