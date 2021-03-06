import React, { useEffect, useState } from "react";
import { storageUserInfo } from "storage";
import styled from "styled-components";
import { MainCardListSection } from "./MainCardList.Section";

export const MainPageHeader = () => {
  const { getUserInfo } = storageUserInfo;
  const [username, setUsername] = useState<string>("User");

  useEffect(() => {
    getUserInfo().then((userInfo) => {
      setUsername(userInfo.username);
    });
  }, []);

  return (
    <Container>
      <Greetings>
        <div>
          <p>Welcome</p>
          <h2>{username}</h2>
        </div>
      </Greetings>
      <MainCardListSection />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Greetings = styled.header`
  padding: 32px 0px 16px 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: start;
  div {
    p {
      margin-bottom: 4px;
      font-size: 12px;
      opacity: 0.7;
    }
  }
`;
