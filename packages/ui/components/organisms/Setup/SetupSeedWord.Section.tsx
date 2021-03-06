import React, { TextareaHTMLAttributes } from "react";
import styled from "styled-components";
import { TextArea, Warning } from "../../atoms";
import { SetupFormSection } from "./SetupForm.Section";

export const SetupSeedWordSection: React.FC<
  TextareaHTMLAttributes<HTMLTextAreaElement>
> = (props) => {
  return (
    <SeedWordSection>
      <SeedWordsTextArea rows={5} {...props} />
    </SeedWordSection>
  );
};

const SeedWordSection = styled(SetupFormSection)`
  align-items: center;
  justify-content: center;
`;

const SeedWordsTextArea = styled(TextArea)`
  padding: 12px 12px;
  resize: none;
  font-size: 16px;
  font-weight: 600;
  height: 150px;
  width: 100%;
`;

const SeedInvalidWarning = styled(Warning)`
  margin-bottom: 12px;
`;
