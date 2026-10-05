'use client';

/**
 * 区画の発展状態を React から使うための薄い hook。
 * 永続化の詳細は sessionStore に任せ、ここでは状態と fresh だけを持つ。
 */
import { useCallback, useEffect, useState } from 'react';
import {
  EMPTY_DEVELOPMENT,
  develop,
  merge,
  type DevelopmentState,
} from '@/lib/town/development';
import { browserSessionStore, loadDevelopment, saveDevelopment } from '@/lib/town/sessionStore';

export function useDevelopment(ids: readonly string[], initial: DevelopmentState = EMPTY_DEVELOPMENT) {
  const [state, setState] = useState(initial);
  const [fresh, setFresh] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const store = browserSessionStore();
    setState((prev) => merge(prev, loadDevelopment(store, ids)));
    setLoaded(true);
  }, [ids]);

  useEffect(() => {
    if (!loaded) return;
    saveDevelopment(browserSessionStore(), state);
  }, [loaded, state]);

  const developBuilding = useCallback((id: string) => {
    setState((prev) => develop(prev, id));
    setFresh(id);
  }, []);

  return { state, fresh, developBuilding };
}
