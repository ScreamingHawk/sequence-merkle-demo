import { MerkleTreeGenerator } from "@0xsequence/utils";
import { useState } from "react";
import { useTheme } from "react-jss";
import { useAccount } from "wagmi";
import { Break } from "../../components/Break";
import { Button } from "../../components/Button";
import { ThemeProps } from "../../providers/ThemeProvider";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { SaleDetails, Step5 } from "./Step5";
import useStyles from "./styles";
import { useSaleConfig } from "../../providers/SaleConfigProvider";

export const AdminPage: React.FC = () => {
  const theme = useTheme<ThemeProps>();
  const classes = useStyles(theme);

  const { address: adminAddress } = useAccount();

  const { saleConfig, setSaleConfig } = useSaleConfig();

  const [step, setStep] = useState(1);
  const [itemsAddr, setItemsAddr] = useState<`0x${string}`>();
  const [saleAddr, setSaleAddr] = useState<`0x${string}`>();
  const [merkleTreeGen, setMerkleTreeGen] = useState<MerkleTreeGenerator<`0x${string}`>>();
  const [allowlist, setAllowlist] = useState<`0x${string}`[]>([]);
  const [rolesUpdated, setRolesUpdated] = useState<boolean>(false);
  const [saleDetails, setSaleDetails] = useState<SaleDetails>();

  const canNextStep = () => {
    if (step === 1) {
      return !!itemsAddr;
    }
    if (step === 2) {
      return !!itemsAddr && !!saleAddr;
    }
    if (step === 3) {
      return !!merkleTreeGen && !!allowlist.length;
    }
    if (step === 4) {
      return !!rolesUpdated;
    }

    return false;
  }

  const moveStep = (step: number) => {
    // Update sale config when stepping
    setSaleConfig({
      ...saleConfig,
      itemsAddress: itemsAddr,
      saleAddress: saleAddr,
      merkleTreeGen,
    });
    setStep(step);
  }

  if (!adminAddress) {
    return <div>Loading...</div>;
  }

  const root = merkleTreeGen?.generateRoot();

  return (
    <>
      {step === 1 && <Step1 adminAddress={adminAddress} setItemsAddr={setItemsAddr} />}
      {step === 2 && itemsAddr && <Step2 adminAddress={adminAddress} setSaleAddr={setSaleAddr} itemsAddr={itemsAddr} />}
      {step === 3 && itemsAddr && saleAddr && <Step3 merkleTreeGen={merkleTreeGen} setMerkleTreeGen={setMerkleTreeGen}  allowlist={allowlist} setAllowlist={setAllowlist} />}
      {step === 4 && itemsAddr && saleAddr && <Step4 saleAddr={saleAddr} itemsAddr={itemsAddr} setRolesUpdated={setRolesUpdated}  />}
      {step === 5 && saleAddr && root && <Step5 saleAddr={saleAddr} saleDetails={saleDetails} setSaleDetails={setSaleDetails} merkleRoot={root} />}

      <Break />

      <div className={classes.pageButtons}>
        {step > 1 && <Button onClick={() => moveStep(step - 1)}>Back</Button>}
        { step < 5 && <Button onClick={() => moveStep(step + 1)} disabled={!canNextStep()}>Next</Button> }
      </div>
    </>
  );
};
