import { FunctionComponent } from 'react'
import styled from 'styled-components';
const Wrapper = styled.p`
    margin: 0;
    color: red;
    font-size: 12px;
    `;
interface Props {
    message?: string,
    show?: boolean
}
const ErrorLabel: FunctionComponent<Props> = ({ message, show = false }) => {
    if (message && show) {
        return (
            <Wrapper>
                {message}
            </Wrapper>
        )
    }
    return null;
}

export default ErrorLabel
