import React from "react";
import styled from "styled-components";
import { NextButton } from "@components/common/Button";
import { TitleSection } from "@components/common/TitleSection";
import { usePopupPage } from "@hooks/usePopupPage";
import { BRAND } from "@utils/contants";
import { ColumnFlexContainer } from "@components/common/ColumnFlexContainer";
import { GradientH3 } from "@components/common/GradientText";

export const PopupWelcomePage = () => {
  const { setCurrentPage } = usePopupPage();
  return (
    <Container>
      <WelcomeImage src="/images/Welcome/welcome.svg" alt="welcome image" />
      <WelcomeTitleSection>
        <img src="/images/common/logo.svg" alt="Pengwyn Logo" />
        <h1>{BRAND}</h1>
        <GradientH3>Welcome back, you've been missed!</GradientH3>
      </WelcomeTitleSection>
      <NextButton onClick={() => setCurrentPage("setup")}>
        Get Started
      </NextButton>
    </Container>
  );
};

const Container = styled(ColumnFlexContainer)`
  background-color: var(--dark);
  padding: 40px 24px;
`;

const WelcomeImage = styled.img`
  width: 80%;
  height: 250px;
  object-fit: contain;
  filter: drop-shadow(5px 0px var(--primary)) drop-shadow(6px 0px var(--strong))
    drop-shadow(7px 0px var(--confirm));
`;

const WelcomeTitleSection = styled(TitleSection)`
  margin-bottom: 32px;
  img {
    width: 64px;
    height: 64px;
    object-fit: contain;
  }
  h1 {
    color: var(--bright);
  }
`;
