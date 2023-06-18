import React, {useId} from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  flex: 1 0 30px;
  padding-left: 15px;
`

const StyledInput = styled.input`
  flex: 1 1 auto;
  font-size: 1rem;
  border: none;
  background: none;
  padding-right: 15px;
  padding-left: 1ch;
`

const StyledInputContainer = styled.div`
  flex: 1 1 100%;
  display: flex;
  gap: 10px;
  border: solid 1px rgb(211, 216, 224);
  border-radius: 6px;

  ${StyledLabel},
  ${StyledInput} {
    padding-top: 15px;
    padding-bottom: 15px;
  }
`

interface InputProps {
  label: string;
  value: string;
  onChange (newValue: string): void;
}

export function Input({label, value, onChange}: InputProps) {
  const id = useId();

  return (
    <StyledInputContainer>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledInput
        id={id}
        name={label}
        value={value}
        onChange={event => onChange(event.target.value)}
        type="number"/>
    </StyledInputContainer>
  )
}
