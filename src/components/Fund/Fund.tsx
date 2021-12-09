import { FunctionComponent } from 'react'
import styled from 'styled-components';
interface Props {
    amount: number
}
const FundTitle = styled.p`
    margin:0;
    font-size: 14px;
`;
const FundAmount = styled.p`
    margin: 0;
    font-size: 26px;
    font-weight: 600;
`;
const Fund: FunctionComponent<Props> = (props) => {
    return (
        <div>
            <FundTitle>{props.children}</FundTitle>
            <FundAmount>{props.amount}</FundAmount>
        </div>
    )
}

export default Fund
