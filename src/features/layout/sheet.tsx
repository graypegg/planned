import styled from "styled-components";
import React, {PropsWithChildren} from "react";

const StyledSheet = styled.section`
  border-radius: 10px;
  padding: 25px;
  filter: drop-shadow(0px 0px 5px rgba(191, 194, 196, 0.5));
  background: #FFFFFF;
  border: solid 1px rgb(211, 216, 224);
`

export function Sheet({children}: PropsWithChildren) {
  return (
    <StyledSheet>
      {children}
    </StyledSheet>
  )
}
