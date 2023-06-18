import styled from "styled-components";
import React, {PropsWithChildren} from "react";

const StyledSheet = styled.section`
  border-radius: 10px;
  padding: 25px;
  filter: drop-shadow(0px 0px 15px rgba(191, 194, 196, 0.5));
  background: ${({theme}) => theme.bright};
  border: solid 1px ${({theme}) => theme.border};
`

export function Sheet({children}: PropsWithChildren) {
  return (
    <StyledSheet>
      {children}
    </StyledSheet>
  )
}
