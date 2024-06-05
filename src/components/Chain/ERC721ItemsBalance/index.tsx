import { useReadContract } from "wagmi";
import { ERC721_ITEMS_ABI } from "../../../contracts/abi";
import { Break } from "../../Break";

export type ERC721ItemsBalanceProps = {
  itemsAddress: `0x${string}`;
  userAddress: `0x${string}`;
  friendlyName?: string;
};

export const ERC721ItemsBalance: React.FC<ERC721ItemsBalanceProps> = ({
  itemsAddress,
  userAddress,
  friendlyName,
}) => {
  const balanceResult = useReadContract({
    abi: ERC721_ITEMS_ABI,
    address: itemsAddress,
    functionName: "balanceOf",
    args: [userAddress],
  });

  if (balanceResult.data === undefined || balanceResult.data === null) {
    return (
      <div>
        {friendlyName ?? userAddress} balance: <small>Loading...</small>
      </div>
    );
  }

  return (
    <>
      <div>
        {friendlyName ?? userAddress} balance:{" "}
        <small>{balanceResult.data.toString()}</small>
      </div>
      <Break />
    </>
  );
};
