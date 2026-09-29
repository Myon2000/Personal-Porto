import { useSyncExternalStore } from "react";

function emptySubscribe() {
  return () => {};
}

export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
