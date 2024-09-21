import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { RequestError } from "../request";
import toast from "react-hot-toast";
import { useConst } from "../hooks/use-const";

type UseQueryClientInstanceOptions = {
  debug: boolean;
  development?: boolean;
};

export const useQueryClientInstance = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  debug: _debug,
  development,
}: UseQueryClientInstanceOptions) => {
  const handleError = useCallback((message: string) => {
    toast.error(message);
  }, []);

  return useConst(() => {
    return new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => {
          if (development) {
            const requestError = error as RequestError;

            handleError(requestError.message);
          }
        },
      }),
      mutationCache: new MutationCache({
        onError: (error: unknown) => {
          if (development) {
            const requestError = error as RequestError;

            handleError(requestError.message);
          }
        },
      }),
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    });
  });
};
