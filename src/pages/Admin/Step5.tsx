import { useTheme } from "react-jss";
import { zeroAddress } from "viem";
import { useReadContract, useWriteContract } from "wagmi";
import { Accent } from "../../components/Accent";
import { Button } from "../../components/Button";
import { Form, FormLabel } from "../../components/Form";
import { H2 } from "../../components/Heading";
import { Link } from "../../components/Link";
import { ERC721_SALE_ABI } from "../../contracts/abi";
import { ThemeProps } from "../../providers/ThemeProvider";
import useStyles from "./styles";

export type SaleDetails = {
  supplyCap: bigint;
  cost: bigint;
  paymentToken: `0x${string}`;
  startTime: bigint;
  endTime: bigint;
};

export type SaleDetailsWithMerkle = SaleDetails & {
  merkleRoot: string;
};

export type Step5Props = {
  saleAddr: `0x${string}`;
  saleDetails: SaleDetails | undefined;
  setSaleDetails: (details: SaleDetails) => void;
  merkleRoot: string;
};

export const Step5: React.FC<Step5Props> = ({
  saleAddr,
  saleDetails,
  setSaleDetails,
  merkleRoot,
}) => {
  const theme = useTheme<ThemeProps>();
  const classes = useStyles(theme);

  const { writeContractAsync } = useWriteContract();

  const saleDetailsResult = useReadContract({
    abi: ERC721_SALE_ABI,
    address: saleAddr,
    functionName: "saleDetails",
  });

  if (!saleDetails) {
    const now = BigInt(Math.floor(Date.now() / 1000));
    saleDetails = {
      supplyCap: 100n,
      cost: 0n,
      paymentToken: zeroAddress,
      startTime: now,
      endTime: now + (60n * 60n), // +1 hour
    };
  }

  const updateSaleDetails = async () => {
    await writeContractAsync({
      abi: ERC721_SALE_ABI,
      address: saleAddr,
      functionName: "setSaleDetails",
      args: [
        saleDetails.supplyCap,
        saleDetails.cost,
        saleDetails.paymentToken,
        saleDetails.startTime,
        saleDetails.endTime,
        merkleRoot,
      ],
    });
  };

  if (saleDetailsResult.isLoading) {
    return <div>Loading...</div>;
  }

  let isUpdated = false;
  if (saleDetailsResult.data) {
    const currentSaleDetails = saleDetailsResult.data as SaleDetailsWithMerkle;
    const now = BigInt(Math.floor(Date.now() / 1000));
    isUpdated =
      currentSaleDetails.supplyCap === saleDetails.supplyCap &&
      currentSaleDetails.cost === saleDetails.cost &&
      currentSaleDetails.paymentToken === saleDetails.paymentToken &&
      currentSaleDetails.startTime < now &&
      currentSaleDetails.endTime > now &&
      currentSaleDetails.merkleRoot === merkleRoot;
  }

  return (
    <>
      <H2>Set Sale Details</H2>
      <Form>
        <FormLabel>
          <span>Supply Cap</span>
          <input
            type="number"
            placeholder="Supply Cap"
            value={saleDetails.supplyCap.toString()}
            onChange={(e) =>
              setSaleDetails({
                ...saleDetails,
                supplyCap: BigInt(e.target.value),
              })
            }
          />
        </FormLabel>
        <FormLabel>
          <span>Cost (gwei)</span>
          <input
            type="number"
            placeholder="Cost"
            value={saleDetails.cost.toString()}
            onChange={(e) =>
              setSaleDetails({ ...saleDetails, cost: BigInt(e.target.value) })
            }
          />
        </FormLabel>
        <FormLabel>
          <span>Payment Token</span>
          <input
            type="text"
            placeholder="Payment Token"
            value={saleDetails.paymentToken ?? ""}
            onChange={(e) =>
              setSaleDetails({
                ...saleDetails,
                paymentToken: e.target.value as `0x${string}`,
              })
            }
          />
        </FormLabel>
        <FormLabel>
          <span>Start Time</span>
          <input
            type="number"
            placeholder="Start Time"
            value={saleDetails.startTime.toString()}
            onChange={(e) =>
              setSaleDetails({
                ...saleDetails,
                startTime: BigInt(e.target.value),
              })
            }
          />
        </FormLabel>
        <FormLabel>
          <span>End Time</span>
          <input
            type="number"
            placeholder="End Time"
            value={saleDetails.endTime.toString()}
            onChange={(e) =>
              setSaleDetails({
                ...saleDetails,
                endTime: BigInt(e.target.value),
              })
            }
          />
        </FormLabel>
        <FormLabel>
          <span>Merkle Root</span>
          <code className={classes.note}>{merkleRoot}</code>
        </FormLabel>
      </Form>
      {isUpdated ? (
        <>
          <Accent>Congrats! Your sale is active!</Accent>
          <p>Head over to the <Link useRouter href="/mint">Mint page</Link> to try it out.</p>
        </>
      ) : (
        <Button onClick={updateSaleDetails}>Update Sale Details</Button>
      )}
    </>
  );
};
