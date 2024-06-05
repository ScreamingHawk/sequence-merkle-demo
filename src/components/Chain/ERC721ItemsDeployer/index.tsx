import { useBytecode, useReadContract, useWriteContract } from "wagmi";
import { ERC721_ITEMS_FACTORY_ABI } from "../../../contracts/abi";
import { ERC721_ITEMS_FACTORY_ADDRESS } from "../../../contracts/constants";
import { Button } from "../../Button";

export type ERC721ItemsDeployerProps = {
  adminAddress: `0x${string}`;
  name: string;
  symbol: string;
  baseURI: string;
  contractURI: string;
  royaltyReceiver: `0x${string}`;
  royaltyBPS: bigint;
  setItemsAddr: (addr: `0x${string}`) => void;
};

export const ERC721ItemsDeployer: React.FC<ERC721ItemsDeployerProps> = ({
  adminAddress,
  name,
  symbol,
  baseURI,
  contractURI,
  royaltyReceiver,
  royaltyBPS,
  setItemsAddr,
}) => {
  const { writeContractAsync } = useWriteContract();

  const deployArgs = [
    adminAddress,
    adminAddress,
    name,
    symbol,
    baseURI,
    contractURI,
    royaltyReceiver,
    royaltyBPS,
  ];

  const itemsAddrResult = useReadContract({
    abi: ERC721_ITEMS_FACTORY_ABI,
    address: ERC721_ITEMS_FACTORY_ADDRESS,
    functionName: "determineAddress",
    args: deployArgs,
  });

  const itemsAddr = itemsAddrResult.data as `0x${string}` | undefined;

  const bytecodeResult = useBytecode({ address: itemsAddr });

  const deployContract = async () => {
    await writeContractAsync({
      abi: ERC721_ITEMS_FACTORY_ABI,
      address: ERC721_ITEMS_FACTORY_ADDRESS,
      functionName: "deploy",
      args: deployArgs,
    });
  };

  if (!itemsAddr || itemsAddrResult.isLoading || bytecodeResult.isLoading) {
    return <div>Loading...</div>;
  }

  if (bytecodeResult.data?.length ?? 0 > 2) {
    setItemsAddr(itemsAddr);
    return <div>Contract deployed at {itemsAddr}</div>;
  }

  return (
    <div>
      <div>Expected address: {itemsAddr}</div>
      <Button onClick={deployContract}>Deploy</Button>
    </div>
  );
};
