import { FunctionComponent } from 'react'
import styled from 'styled-components'

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
    id: string
}
const LabeledInput: FunctionComponent<Props> = ({ id, children, inputElement }) => {
    return (
        <Wrapper>
            <label htmlFor={id}>{children}</label>
            {inputElement}
        </Wrapper>
    )
}

export default LabeledInput
