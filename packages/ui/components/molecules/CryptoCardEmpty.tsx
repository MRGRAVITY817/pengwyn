import { usePopupPage, useSetupInfo, useSetupPage } from "hooks";
import React from "react";
import styled from "styled-components";
import { Blockchain } from "types";
import { Button } from "../atoms";

export const CryptoCardEmpty: React.FC<{
  blockchain: Blockchain;
}> = ({ blockchain }) => {
  const { setupInfo, setSetupInfo } = useSetupInfo();
  const { setCurrentPage: setSetupPage } = useSetupPage();
  const { setCurrentPage: setPage } = usePopupPage();

  const cryptoName = blockchain === "eth" ? "ETH" : "SOL";

  const onClickAddAccount = () => {
    setSetupInfo({ ...setupInfo, blockchain, revisit: true });
    setSetupPage("first");
    setPage("setup");
  };

  return (
    <Container>
      <h3>No {cryptoName} account found.</h3>
      <AddButton onClick={onClickAddAccount}>Add account</AddButton>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding-top: 12px;
  padding-left: 12px;
  min-width: 240px;
  max-width: 240px;
  max-height: 160px;
  border-radius: 20px;
  border: 3px dashed rgba(0, 0, 0, 0.2);
  z-index: 0;
`;

const AddButton = styled(Button)`
  && {
    background-color: var(--dark);
    color: var(--bright);
  }
`;