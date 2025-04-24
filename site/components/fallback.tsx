import { registry, Skeleton } from 'neko-ui';

registry(Skeleton);
export default function Fallback() {
  return <n-skeleton active={true} title={true} rows={6} />;
}
