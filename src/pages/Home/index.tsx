import React from "react";
import { useTheme } from "react-jss";
import { Accent } from "../../components/Accent";
import { H1 } from "../../components/Heading";
import { Link } from "../../components/Link";
import { ThemeProps } from "../../providers/ThemeProvider";
import useStyles from "./styles";

export const HomePage: React.FC = () => {
  const theme = useTheme<ThemeProps>();
  const classes = useStyles(theme);

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <H1>Merkle Tree Demo 🌳</H1>
        <p>
          Protect your <Accent>ERC-20 / 721 / 1155</Accent> mint process by
          allowing only <Accent>allow listed</Accent> addresses to mint!
        </p>
      </div>
      <div className={classes.buttonContainer}>
        <Link useRouter href="/admin" type="button">
          Admin Setup
        </Link>
        <Link useRouter href="/mint" type="button">
          User Mint
        </Link>
      </div>
    </div>
  );
};
