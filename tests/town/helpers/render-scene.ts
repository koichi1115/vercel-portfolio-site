import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { TownScene } from '@/components/town/TownScene';
import type { DevelopmentState } from '@/lib/town/development';
import type { TownConfig } from '@/lib/town/schema';

export function renderScene(config: TownConfig, initialDevelopment?: DevelopmentState): string {
  return renderToStaticMarkup(
    createElement(TownScene, { config, initialDevelopment }),
  );
}
