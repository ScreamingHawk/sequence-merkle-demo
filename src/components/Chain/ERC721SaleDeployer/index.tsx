import { useBytecode, useReadContract, useWriteContract } from "wagmi";
import { ERC721_SALE_FACTORY_ABI } from "../../../contracts/abi";
import { ERC721_SALE_FACTORY_ADDRESS } from "../../../contracts/constants";
import { Button } from "../../Button";

export type ERC721SaleDeployerProps = {
  adminAddress: `0x${string}`;
  itemsAddress: `0x${string}`;
  setSaleAddr: (addr: `0x${string}`) => void;
};

export const ERC721SaleDeployer: React.FC<ERC721SaleDeployerProps> = ({
  adminAddress,
  itemsAddress,
  setSaleAddr,
}) => {
  const { writeContractAsync } = useWriteContract();

  const deployArgs = [
    adminAddress,
    adminAddress,
    itemsAddress,
  ];

  const saleAddrResult = useReadContract({
    abi: ERC721_SALE_FACTORY_ABI,
    address: ERC721_SALE_FACTORY_ADDRESS,
    functionName: "determineAddress",
    args: deployArgs,
  });

  const saleAddr = saleAddrResult.data as `0x${string}` | undefined;

  const bytecodeResult = useBytecode({ address: saleAddr });

  const deployContract = async () => {
    await writeContractAsync({
      abi: ERC721_SALE_FACTORY_ABI,
      address: ERC721_SALE_FACTORY_ADDRESS,
      functionName: "deploy",
      args: deployArgs,
    });
  };

  if (!saleAddr || saleAddrResult.isLoading || bytecodeResult.isLoading) {
    return <div>Loading...</div>;
  }

  if (bytecodeResult.data?.length ?? 0 > 2) {
    setSaleAddr(saleAddr);
    return <div>Contract deployed at {saleAddr}</div>;
  }

  return (
    <div>
      <div>Expected address: {saleAddr}</div>
      <Button onClick={deployContract}>Deploy</Button>
    </div>
  );
};
