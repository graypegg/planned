import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${({theme}) => theme.bright};

  & > * {
    margin: 0;
  }

  h1 {
    font-size: 1.1rem;
  }
`

export function Header() {
  return (
    <StyledHeader>
      <img src="https://placekitten.com/60/60"  alt="A place holder kitten"/>
      <h1>Planned test</h1>
    </StyledHeader>
  );
}
