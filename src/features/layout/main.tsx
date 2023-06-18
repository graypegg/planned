import React, {PropsWithChildren, ReactNode} from "react";
import styled from "styled-components";

const StyledMain = styled.main`
  max-width: 1600px;
  margin: 2rem auto 0;
  padding: 0 30px 2rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: 320px 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'heading heading'
    'aside content';

  @media (width <= 1630px) {
  }

  & > header {
    grid-area: heading;

    & > * {
      margin: 0;
    }
  }
`

type MainProps = PropsWithChildren<{ heading: ReactNode }>;

export function Main({heading, children}: MainProps) {
  return (
    <StyledMain>
      <header>
        {heading}
      </header>
      {children}
    </StyledMain>
  )
}
