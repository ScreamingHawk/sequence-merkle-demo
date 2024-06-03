import React from "react";
import useStyles from "./styles";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "../Button";
import { Select } from "../Select";

export const Header: React.FC = () => {
  const classes = useStyles();
  const account = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const connected = account.status === "connected";

  return (
    <nav className={classes.container}>
      <div className={classes.innerContainer}>
        <a href="/" className={classes.logo}>
          🌳
        </a>
        Merkle Tree Demo
      </div>
      <div className={classes.innerContainer}>
        {connected ? (
          <>
            <code className={classes.smallText}>
              {account.addresses[0]} ({account.chainId})
            </code>
            <Button onClick={() => disconnect()}>Disconnect</Button>
          </>
        ) : (
          <Select
            onChange={(e) =>
              connect({ connector: connectors[parseInt(e.target.value)] })
            }
          >
            <option value="">Select a wallet</option>
            {connectors.map((connector, i) => (
              <option key={connector.uid} value={i}>
                {connector.name}
              </option>
            ))}
          </Select>
        )}
      </div>
    </nav>
  );
};
