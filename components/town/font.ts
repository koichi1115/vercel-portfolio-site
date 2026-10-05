/**
 * 看板と見出しだけに使うポップな日本語フォント。
 * app/page.tsx からのみ import する（テストからは読まない）。
 */
import { Mochiy_Pop_One } from 'next/font/google';

export const signFont = Mochiy_Pop_One({
  weight: '400',
  variable: '--font-sign',
  display: 'swap',
  preload: false,
});
