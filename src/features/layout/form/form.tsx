import styled from "styled-components";
import React, {FormEventHandler, MouseEventHandler, ReactElement} from "react";

const StyledForm = styled.form`
  display: grid;
  gap: 1rem;
`

const StyledFormRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
`

interface FormProps {
  rows: ReactElement[];
  onSubmit?: () => void
}

export function Form({rows, onSubmit}: FormProps) {
  const handleOnSubmit: FormEventHandler = (event) => {
    event.preventDefault()
    if (onSubmit) onSubmit()
  }

  return (
    <StyledForm onSubmit={handleOnSubmit}>
      {
        rows.map((row, index) => (
          <StyledFormRow key={index}>
            {row}
          </StyledFormRow>
        ))
      }
    </StyledForm>
  )
}
