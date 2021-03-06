import { GradientH4 } from "../../atoms";
import { TitleSection } from "../../molecules";
import React from "react";

export const SetupCreatePageTitleSection = () => {
  return (
    <TitleSection>
      <img src="/images/common/logo.svg" alt="logo image" />
      <h1>
        Create your
        <br />
        crypto wallet
      </h1>
      <GradientH4>
        Copy the seed words somewhere safe. Never show anyone!
      </GradientH4>
    </TitleSection>
  );
};
