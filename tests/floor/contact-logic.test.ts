import { describe, expect, it } from 'vitest';
import { readRepoFile } from '../town/helpers/read-file';

const source = readRepoFile('app/contact/page.tsx');

describe('問い合わせフォームの既存ロジック', () => {
  it('同じAPI契約でJSONを送信する', () => {
    expect(source).toContain("fetch('/api/contact'");
    expect(source).toContain("method: 'POST'");
    expect(source).toContain("'Content-Type': 'application/json'");
    expect(source).toContain('JSON.stringify(formData)');
  });

  it('状態管理とクライアント実行を維持する', () => {
    expect(source.trimStart().startsWith('"use client";')).toBe(true);
    expect(source).toContain('useState<FormStatus>');
  });

  it.each(['name', 'email', 'company', 'subject', 'message'])('%s のnameを維持する', (name) => {
    expect(source).toContain(`name="${name}"`);
  });

  it('選択肢の値と必須項目を維持する', () => {
    for (const value of ['consulting', 'development', 'collaboration', 'interview', 'other']) {
      expect(source).toContain(`value="${value}"`);
    }
    expect(source.match(/\brequired\b/g) ?? []).toHaveLength(4);
  });

  it('送信エラーをalertとして通知する', () => {
    expect(source).toMatch(/role="alert"/);
  });
});
