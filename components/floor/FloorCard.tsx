import type { ReactNode } from 'react';
import Link from 'next/link';
import styles from './floor.module.css';

type FloorCardProps = {
  href?: string;
  className?: string;
  children: ReactNode;
};

export function FloorCard({ href, className = '', children }: FloorCardProps) {
  const cardClassName = `${styles.card} ${href ? styles.tap : ''} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cardClassName}>
        {children}
      </Link>
    );
  }
  return <div className={cardClassName}>{children}</div>;
}
