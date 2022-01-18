import React from "react";
import { EtherInput } from "@web3-ui/components";
import { EthInput } from "../styledComponents/EthInput";

export default function BetInput({ bet, setBet }) {
  return (
    <EthInput>
      <EtherInput
        className="ethInput"
        value={bet}
        onChange={(e) => setBet(e)}
        unit="wei"
      />
    </EthInput>
  );
}
