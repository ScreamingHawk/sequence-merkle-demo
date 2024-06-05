import { useEffect, useState } from "react";
import { useTheme } from "react-jss";
import { zeroAddress } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { Button } from "../../components/Button";
import { Form, FormLabel } from "../../components/Form";
import { Link } from "../../components/Link";
import { ERC20_ABI, ERC721_SALE_ABI } from "../../contracts/abi";
import { useSaleConfig } from "../../providers/SaleConfigProvider";
import { ThemeProps } from "../../providers/ThemeProvider";
import { SaleDetailsWithMerkle } from "../Admin/Step5";
import useStyles from "./styles";
import { ERC721ItemsBalance } from "../../components/Chain/ERC721ItemsBalance";

export const MintPage: React.FC = () => {
  const theme = useTheme<ThemeProps>();
  const classes = useStyles(theme);

  const { saleConfig } = useSaleConfig();

  const { address: userAddress } = useAccount();

  const { writeContractAsync } = useWriteContract();

  const [proof, setProof] = useState<string[]>();
  const [amount, setAmount] = useState<bigint>(1n);

  const saleDetailsResult = useReadContract({
    abi: ERC721_SALE_ABI,
    address: saleConfig.saleAddress,
    functionName: "saleDetails",
  });

  const saleDetails = saleDetailsResult.data as
    | SaleDetailsWithMerkle
    | undefined;

  const allowanceResult = useReadContract({
    abi: ERC20_ABI,
    address: saleDetails?.paymentToken,
    functionName: "allowance",
    args: [userAddress ?? zeroAddress, saleConfig.saleAddress ?? zeroAddress],
    query: {
      enabled: !!userAddress && !!saleConfig.saleAddress,
    },
  });

  useEffect(() => {
    if (!!saleConfig.merkleTreeGen && !!userAddress) {
      try {
        setProof(saleConfig.merkleTreeGen.generateProof(userAddress));
      } catch (e) {
        console.error(e);
        setProof([]);
      }
    }
  }, [saleConfig.merkleTreeGen, userAddress]);

  if (
    !userAddress ||
    allowanceResult.isLoading ||
    saleDetailsResult.isLoading
  ) {
    return (
      <>
        <div>Loading...</div>
        <p>
          <small>This can take a sec</small>
        </p>
      </>
    );
  }

  if (
    !saleConfig.saleAddress ||
    !saleConfig.merkleTreeGen ||
    !saleConfig.itemsAddress
  ) {
    return (
      <div>
        Missing sale config. Please use{" "}
        <Link useRouter href="/admin">
          admin
        </Link>{" "}
        page first
      </div>
    );
  }

  const expectedRoot = saleConfig.merkleTreeGen.generateRoot();
  if (saleDetails?.merkleRoot != expectedRoot) {
    return (
      <div>
        Merkle root mismatch. Please use{" "}
        <Link useRouter href="/admin">
          admin
        </Link>{" "}
        page first.
      </div>
    );
  }

  if (proof?.length === 0) {
    return <div>Address not in allowlist</div>;
  }

  const allowance = allowanceResult.data as bigint;
  const totalCost = saleDetails.cost * amount;

  const approve = async () => {
    await writeContractAsync({
      abi: ERC20_ABI,
      address: saleDetails.paymentToken,
      functionName: "approve",
      args: [saleConfig.saleAddress!, totalCost],
    });
  };

  const mint = async () => {
    await writeContractAsync({
      abi: ERC721_SALE_ABI,
      address: saleConfig.saleAddress!!,
      functionName: "mint",
      args: [userAddress, amount, saleDetails.paymentToken, totalCost, proof!],
    });
  };

  return (
    <>
      <ERC721ItemsBalance itemsAddress={saleConfig.itemsAddress} userAddress={userAddress} friendlyName="Your" />
      <Form>
        <FormLabel>
          <span>Amount</span>
          <input
            type="number"
            placeholder="Amount"
            value={amount.toString()}
            onChange={(e) => setAmount(BigInt(e.target.value))}
          />
        </FormLabel>
        <FormLabel>
          <span>Payment Token</span>
          <code className={classes.note}>{saleDetails.paymentToken}</code>
        </FormLabel>
        <FormLabel>
          <span>Cost</span>
          <code className={classes.note}>{saleDetails.cost.toString()}</code>
        </FormLabel>
        <FormLabel>
          <span>Total Cost</span>
          <code className={classes.note}>{(saleDetails.cost * amount).toString()}</code>
        </FormLabel>
        <FormLabel>
          <span>Proof</span>
          <code className={`${classes.small} ${classes.note}`}>
            {JSON.stringify(proof, null, 2)}
          </code>
        </FormLabel>
      </Form>
      {allowance < totalCost ? (
        <Button onClick={approve}>Approve funds for payment</Button>
      ) : (
        <Button onClick={mint}>Mint</Button>
      )}
    </>
  );
};
