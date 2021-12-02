import { FunctionComponent, SyntheticEvent } from 'react'
import styled from 'styled-components'
import Input from '../Input/Input'

const Wrapper = styled.div`
    text-align: left;
    label{
        margin-bottom:8px;
        display: block;
        font-weight: 600;
        font-size: 16px;
    }
`;
interface Props {
    id: string
    type?: string
    hint?: string
    value?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const LabeledInput: FunctionComponent<Props> = ({ id, children, type = "text", hint, value, onChange }) => {
    return (
        <Wrapper>
            <label htmlFor={id}>{children}</label>
            <Input type={type} id={id} name={id} placeholder={hint} value={value} onChange={onChange} />
        </Wrapper>
    )
}

export default LabeledInput
