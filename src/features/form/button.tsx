import React, {MouseEventHandler, PropsWithChildren} from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  color: ${({theme}) => theme.bright};
  background: ${({theme}) => theme.primary};
  border: none;
  padding: 15px;
  border-radius: 25px;
  cursor: pointer;

  &:hover {
    background: ${({theme}) => theme.primaryDark};
  }
`

interface ButtonProps extends PropsWithChildren {
  onClick?: () => void,
  type?: "button" | "submit" | "reset"
}

export function Button({children, onClick, type = 'button'}: ButtonProps) {
  const handleOnClick: MouseEventHandler = (event) => {
    if (onClick) {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <StyledButton onClick={handleOnClick} type={type}>
      {children}
    </StyledButton>
  )
}
