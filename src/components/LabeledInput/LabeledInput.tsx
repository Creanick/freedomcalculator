import { FunctionComponent } from 'react'
import styled, { css } from 'styled-components'
import ErrorLabel from '../ErrorLabel/ErrorLabel';

const Wrapper = styled.div<{ hasError?: boolean }>`
    text-align: left;
    label{
        margin-bottom:8px;
        display: block;
        font-weight: 600;
        font-size: 16px;
        cursor: pointer;
    }
    ${props => props.hasError && css`
        input,input:focus{
            border-color: red;
        }
    `}
    `;
interface Props {
    inputElement: JSX.Element
    idFor: string
    errorMessage?: string
    showError?: boolean
}
const LabeledInput: FunctionComponent<Props> = ({ idFor, children, inputElement, errorMessage, showError }) => {
    return (
        <Wrapper hasError={showError}>
            <label htmlFor={idFor}>{children}</label>
            {inputElement}
            {showError && <ErrorLabel message={errorMessage} />}
        </Wrapper>
    )
}

export default LabeledInput
