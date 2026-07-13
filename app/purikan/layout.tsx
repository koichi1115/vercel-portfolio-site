import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ぷりかん！ | 学校・保育園のプリントをAIでかんたん管理',
  description:
    '学校・保育園のプリントをAIで自動解析し、イベント・TODO・持ち物を抽出。LINE通知と事前リマインダーで提出物を逃さないiOSアプリ「ぷりかん！」。',
};

export default function PurikanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
