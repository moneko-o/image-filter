import ghp from '@app/secret';
import CryptoJS from 'crypto-js';

// Decrypt
const bytes = CryptoJS.AES.decrypt(ghp.ghp, '12345678901234567890123456789012');
const enc = bytes.toString(CryptoJS.enc.Utf8);

interface WorkerMessage {
  file: File;
  filename: string;
}

function onMessage({ data }: MessageEvent<WorkerMessage>) {
  const { file, filename } = data;

  uploadImage(filename!, file);
}

addEventListener('message', onMessage, false);

const REPO_OWNER = 'monako97';
const REPO_NAME = 'cdn';
const BRANCH = 'main';

function arrayBufferToBase64(numberArray: number[]) {
  const binaryString = Array.from(new Uint8Array(numberArray), (byte) =>
    String.fromCharCode(byte),
  ).join('');

  return btoa(binaryString);
}
async function uploadImage(fileName: string, file: File) {
  const reader = new FileReader();

  reader.onload = (event) => {
    if (event.target?.result) {
      const encodedContent = arrayBufferToBase64(event.target.result as unknown as number[]);

      if (encodedContent) {
        fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/filter-image/${new Date().toLocaleString().replaceAll('/', '-')}-${fileName}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `token ${enc}`,
              Accept: 'application/vnd.github.v3+json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: `Upload image: ${fileName}`, // 提交信息
              content: encodedContent, // 文件的 Base64 编码内容
              branch: BRANCH, // 指定上传到的分支
            }),
          },
        ).catch(() => {
          uploadImage(fileName, file);
        });
      }
    }
  };
  reader.onerror = () => {};
  reader.readAsArrayBuffer(file); // 以二进制字符串读取文件
}
