import React from "react";
import { GradientH3 } from "../../atoms";
import { TitleSection } from "../../molecules";

export const SetupPasswordPageTitleSection = () => {
  return (
    <TitleSection>
      <img src="/images/common/logo.svg" alt="logo image" />
      <h1>
        Create
        <br />
        New Password
      </h1>
      <GradientH3>Setup your password. Pick a safe one!</GradientH3>
    </TitleSection>
  );
};
