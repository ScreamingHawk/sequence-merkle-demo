import React, { createContext, useContext, useState } from 'react';
import { MerkleTreeGenerator } from "@0xsequence/utils";

export type SaleConfig = {
  itemsAddress?: `0x${string}`;
  saleAddress?: `0x${string}`;
  merkleTreeGen?: MerkleTreeGenerator<`0x${string}`>;
}

type SaleConfigContextType = {
  saleConfig: SaleConfig;
  setSaleConfig: React.Dispatch<React.SetStateAction<SaleConfig>>;
}

const SaleConfigContext = createContext<SaleConfigContextType | undefined>(undefined);

export const SaleConfigProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [saleConfig, setSaleConfig] = useState<SaleConfig>({});

  return (
    <SaleConfigContext.Provider value={{ saleConfig, setSaleConfig }}>
      {children}
    </SaleConfigContext.Provider>
  );
};

export const useSaleConfig = (): SaleConfigContextType => {
  const context = useContext(SaleConfigContext);
  if (context === undefined) {
    throw new Error('useSaleConfig must be used within a SaleConfigProvider');
  }
  return context;
};
