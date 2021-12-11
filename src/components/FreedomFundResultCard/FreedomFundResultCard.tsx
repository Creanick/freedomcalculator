import React from 'react'
import styled from 'styled-components';
import Fund, { FundPriority } from '../Fund/Fund';
const Wrapper = styled.div`
    border-radius: 4px;
    background-color: white;
    box-shadow: 12px 13px 39px -7px #0000001c;
    padding: 40px;
    display: grid;
    gap: 16px;
    max-width: 380px;
    box-sizing: border-box;
    overflow: auto;
`;
interface Props {
    monthlyExpenseAtFreedom: number,
    fundValues: {
        mortalFund: number,
        immortalFund: number,
    },
    freedomAge: number,
    lifeExpectancy: number
}
const FreedomFundResultCard = React.forwardRef<any, Props>(({ freedomAge, fundValues, lifeExpectancy, monthlyExpenseAtFreedom }, ref) => {
    return (
        <Wrapper ref={ref as any}>
            <Fund priority={FundPriority.primary} amount={fundValues.mortalFund}>Total Fund Needed At {freedomAge} years age for next {lifeExpectancy - freedomAge} years</Fund>
            <Fund amount={monthlyExpenseAtFreedom}>Monthly expense at {freedomAge} years age</Fund>
            <Fund amount={fundValues.immortalFund}>Total fund needed At {freedomAge} years age to use forever</Fund>
        </Wrapper>
    )
})

export default FreedomFundResultCard
