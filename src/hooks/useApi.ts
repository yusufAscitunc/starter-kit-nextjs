import { useState, useCallback } from "react";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseApiResult<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<T>;
  reset: () => void;
}

export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>,
  initialData: T | null = null
): UseApiResult<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: initialData,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]): Promise<T> => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const data = await apiFunction(...args);
        setState({ data, loading: false, error: null });
        return data;
      } catch (error) {
        const apiError =
          error instanceof Error ? error : new Error("An error occurred");
        setState((prev) => ({
          ...prev,
          loading: false,
          error: apiError,
        }));
        throw apiError;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({ data: initialData, loading: false, error: null });
  }, [initialData]);

  return {
    ...state,
    execute,
    reset,
  };
}
