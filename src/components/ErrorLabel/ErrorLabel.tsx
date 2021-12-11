import { FunctionComponent } from 'react'
import styled from 'styled-components';
const Wrapper = styled.p`
    margin: 0;
    color: red;
    font-size: 12px;
    `;
interface Props {
    message?: string
}
const ErrorLabel: FunctionComponent<Props> = ({ message }) => {
    return (
        <Wrapper>
            {message}
        </Wrapper>
    )
}

export default ErrorLabel
