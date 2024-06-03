import { KitProvider } from "@0xsequence/kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { kitConfig, wagmiConfig } from "../../config.ts";

const queryClient = new QueryClient();

export const Web3Provider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <KitProvider config={kitConfig}>{children}</KitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
