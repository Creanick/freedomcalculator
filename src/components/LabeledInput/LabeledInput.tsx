import { FunctionComponent } from 'react'
import styled from 'styled-components'
import ErrorLabel from '../ErrorLabel/ErrorLabel';

const Wrapper = styled.div`
    text-align: left;
    label{
        margin-bottom:8px;
        display: block;
        font-weight: 600;
        font-size: 16px;
        cursor: pointer;
    }
`;
interface Props {
    inputElement: JSX.Element
    idFor: string
    errorMessage?: string
    showError?: boolean
}
const LabeledInput: FunctionComponent<Props> = ({ idFor, children, inputElement, errorMessage, showError }) => {
    return (
        <Wrapper>
            <label htmlFor={idFor}>{children}</label>
            {inputElement}
            <ErrorLabel message={errorMessage} show={showError} />
        </Wrapper>
    )
}

export default LabeledInput
