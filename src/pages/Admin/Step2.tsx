import { ERC721SaleDeployer } from "../../components/Chain/ERC721SaleDeployer";
import { H2 } from "../../components/Heading";

export type Step2Props = {
	adminAddress: `0x${string}`;
  itemsAddr: `0x${string}`;
  setSaleAddr: (addr: `0x${string}`) => void;
};

export const Step2: React.FC<Step2Props> = ({ adminAddress, itemsAddr, setSaleAddr }) => {
  return (
    <>
      <H2>Deploy Sale Contract</H2>
      <ERC721SaleDeployer
        adminAddress={adminAddress}
        setSaleAddr={setSaleAddr}
        itemsAddress={itemsAddr}
      />
    </>
  );
};
