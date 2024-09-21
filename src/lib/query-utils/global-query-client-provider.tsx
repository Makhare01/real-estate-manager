import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useQueryClientInstance } from "./query-client";

const ENV = process.env.APP_ENV;

type GlobalQueryClientProviderProps = Readonly<{
  children: ReactNode;
}>;

export const GlobalQueryClientProvider = ({
  children,
}: GlobalQueryClientProviderProps) => {
  const queryClient = useQueryClientInstance({
    debug: false,
    development: ENV === "development",
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
