import { useState } from "react";
import { useTheme } from "react-jss";
import { ERC721ItemsDeployer } from "../../components/Chain/ERC721ItemsDeployer";
import { Form, FormLabel } from "../../components/Form";
import { H2 } from "../../components/Heading";
import { ThemeProps } from "../../providers/ThemeProvider";
import useStyles from "./styles";

type ItemsArgs = {
  name: string;
  symbol: string;
  baseURI: string;
  contractURI: string;
  royaltyReceiver: `0x${string}`;
  royaltyBPS: bigint;
};

export type Step1Props = {
	adminAddress: `0x${string}`;
  setItemsAddr: (addr: `0x${string}`) => void;
};

export const Step1: React.FC<Step1Props> = ({ adminAddress, setItemsAddr }) => {
  const theme = useTheme<ThemeProps>();
  const classes = useStyles(theme);

  const [itemsArgs, setItemsArgs] = useState<ItemsArgs>({
    name: "",
    symbol: "",
    baseURI: "",
    contractURI: "",
    royaltyReceiver: adminAddress,
    royaltyBPS: 0n,
  });

  return (
    <>
      <H2>Deploy Items Contract</H2>
      <span className={classes.note}>
        Updating existing contracts is not supported by this demo.
        <br />
        Changing these values will expect a new deployment.
      </span>
      <Form>
        <FormLabel>
          <span>Name</span>
          <input
            type="text"
            placeholder="Name"
            value={itemsArgs.name}
            onChange={(e) =>
              setItemsArgs({ ...itemsArgs, name: e.target.value })
            }
          />
        </FormLabel>
        <FormLabel>
          <span>Symbol</span>
          <input
            type="text"
            placeholder="Symbol"
            value={itemsArgs.symbol}
            onChange={(e) =>
              setItemsArgs({ ...itemsArgs, symbol: e.target.value })
            }
          />
        </FormLabel>
        <FormLabel>
          <span>Base URI</span>
          <input
            type="text"
            placeholder="Base URI"
            value={itemsArgs.baseURI}
            onChange={(e) =>
              setItemsArgs({ ...itemsArgs, baseURI: e.target.value })
            }
          />
        </FormLabel>
        <FormLabel>
          <span>Contract URI</span>
          <input
            type="text"
            placeholder="Contract URI"
            value={itemsArgs.contractURI}
            onChange={(e) =>
              setItemsArgs({ ...itemsArgs, contractURI: e.target.value })
            }
          />
        </FormLabel>
        <FormLabel>
          <span>Royalty Receiver</span>
          <input
            type="text"
            placeholder="Royalty Receiver"
            value={itemsArgs.royaltyReceiver}
            onChange={(e) =>
              setItemsArgs({
                ...itemsArgs,
                royaltyReceiver: e.target.value as `0x${string}`,
              })
            }
          />
        </FormLabel>
        <FormLabel>
          <span>Royalty BPS</span>
          <input
            type="number"
            placeholder="Royalty BPS"
            value={itemsArgs.royaltyBPS.toString()}
            onChange={(e) =>
              setItemsArgs({ ...itemsArgs, royaltyBPS: BigInt(e.target.value) })
            }
          />
        </FormLabel>
      </Form>
      <ERC721ItemsDeployer
        adminAddress={adminAddress}
        setItemsAddr={setItemsAddr}
        {...itemsArgs}
      />
    </>
  );
};
