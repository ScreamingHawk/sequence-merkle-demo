import { MerkleTreeGenerator, getSaleItemsLeaf } from "@0xsequence/utils";
import { useTheme } from "react-jss";
import { Form } from "react-router-dom";
import { Accent } from "../../components/Accent";
import { FormLabel } from "../../components/Form";
import { H2 } from "../../components/Heading";
import { ThemeProps } from "../../providers/ThemeProvider";
import useStyles from "./styles";
import { Wallet } from "ethers";
import { useAccount } from "wagmi";

export type Step3Props = {
  allowlist: `0x${string}`[];
  setAllowlist: (al: `0x${string}`[]) => void;
  merkleTreeGen?: MerkleTreeGenerator<`0x${string}`>;
  setMerkleTreeGen: (
    mt: MerkleTreeGenerator<`0x${string}`> | undefined
  ) => void;
};

export const Step3: React.FC<Step3Props> = ({
  allowlist,
  setAllowlist,
  merkleTreeGen,
  setMerkleTreeGen,
}) => {
  const theme = useTheme<ThemeProps>();
  const classes = useStyles(theme);

  const { address: adminAddress } = useAccount();

  const getLeaf = (addr: `0x${string}`) => {
    // ERC-721 uses 0 as tokenId for merkle
    return getSaleItemsLeaf({ address: addr, tokenId: 0n });
  };

  if (allowlist.length === 0) {
    const randomAddrs = Array.from({ length: 3 }, () => Wallet.createRandom().address as `0x${string}`);
    if (adminAddress) {
      randomAddrs.unshift(adminAddress as `0x${string}`)
    }
    setAllowlist(randomAddrs)
    const mtGenerator = new MerkleTreeGenerator(randomAddrs, getLeaf);
    setMerkleTreeGen(mtGenerator);
  }

  const setAllowlistFromString = (str: string) => {
    const al = str.split("\n").map((addr) => addr.trim()).filter((addr) => addr.length > 0) as `0x${string}`[];
    setAllowlist(al);
    if (al.length > 1) {
      const mtGenerator = new MerkleTreeGenerator(al, getLeaf);
      setMerkleTreeGen(mtGenerator);
    } else {
      setMerkleTreeGen(undefined);
    }
  };

  const root = merkleTreeGen?.generateRoot();

  return (
    <>
      <H2>Generate Merkle Root</H2>
      <Form>
        <FormLabel>
          <span>Items Contract Address</span>
          <textarea
            value={allowlist.join("\n")}
            onChange={(e) => setAllowlistFromString(e.target.value)}
            rows={5}
          />
        </FormLabel>
      </Form>
      {root && (
        <p className={classes.note}>
          <Accent>Merkle Root</Accent> <code>{root}</code>
        </p>
      )}
    </>
  );
};
