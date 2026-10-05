import Link from 'next/link';
import styles from './floor.module.css';

export function BackToTown() {
  return (
    <Link href="/" className={styles.back}>
      ← 街に戻る
    </Link>
  );
}
