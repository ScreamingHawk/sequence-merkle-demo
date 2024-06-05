import { useReadContract, useWriteContract } from "wagmi";
import { Accent } from "../../components/Accent";
import { Button } from "../../components/Button";
import { H2 } from "../../components/Heading";
import { ERC721_ITEMS_ABI } from "../../contracts/abi";
import { MINTER_ROLE } from "../../contracts/constants";

export type Step4Props = {
  itemsAddr: `0x${string}`;
  saleAddr: `0x${string}`;
  setRolesUpdated: (updated: boolean) => void;
};

export const Step4: React.FC<Step4Props> = ({
  itemsAddr,
  saleAddr,
  setRolesUpdated,
}) => {
  const { writeContractAsync } = useWriteContract();
  const roleResult = useReadContract({
    abi: ERC721_ITEMS_ABI,
    address: itemsAddr,
    functionName: "hasRole",
    args: [MINTER_ROLE, saleAddr],
  });

  const addRole = async () => {
    await writeContractAsync({
      abi: ERC721_ITEMS_ABI,
      address: itemsAddr,
      functionName: "grantRole",
      args: [MINTER_ROLE, saleAddr],
    });
  };

  if (roleResult.isLoading) {
    return <div>Loading...</div>;
  }

  const hasRole = roleResult.data as boolean;

  setRolesUpdated(hasRole);

  return (
    <>
      <H2>Give Sale Contract Mint Role</H2>
      {hasRole ? (
        <Accent>Role has been successfully updated</Accent>
      ) : (
        <Button onClick={addRole}>Add Role</Button>
      )}
    </>
  );
};
