import React, { useState } from "react";
import styled from "styled-components";
import Fund, { FundPriority } from "../Fund/Fund";
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
  justify-content: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const CurrencyButton = styled.div<{ active?: boolean }>`
  border: none;
  padding: 4px 12px;
  border: 1px solid #1e90ff;
  background-color: ${(props) => (props.active ? "#1E90FF" : "transparent")};
  color: ${(props) => (props.active ? "#ffffff" : "#767676")};
  cursor: pointer;
`;
interface Props {
  monthlyExpenseAtFreedom: number;
  fundValues: {
    mortalFund: number;
    immortalFund: number;
  };
  freedomAge: number;
  lifeExpectancy: number;
}
const FreedomFundResultCard = React.forwardRef<any, Props>(
  (
    { freedomAge, fundValues, lifeExpectancy, monthlyExpenseAtFreedom },
    ref
  ) => {
    const [currency, setCurrency] = useState<"USD" | "INR">("USD");
    return (
      <Wrapper ref={ref as any}>
        <Fund
          priority={FundPriority.primary}
          amount={fundValues.mortalFund}
          currency={currency}
        >
          Total fund needed at {freedomAge} years age for next{" "}
          {lifeExpectancy - freedomAge} years
        </Fund>
        <Fund amount={monthlyExpenseAtFreedom} currency={currency}>
          Monthly expense at {freedomAge} years age
        </Fund>
        <Fund amount={fundValues.immortalFund} currency={currency}>
          Total fund needed At {freedomAge} years age to use forever
        </Fund>
        <ButtonWrapper>
          <CurrencyButton
            active={currency === "USD"}
            style={{ borderRadius: "4px 0px 0px 4px" }}
            onClick={() => setCurrency("USD")}
          >
            USD
          </CurrencyButton>
          <CurrencyButton
            active={currency === "INR"}
            style={{ borderRadius: "0px 4px 4px 0px" }}
            onClick={() => setCurrency("INR")}
          >
            INR
          </CurrencyButton>
        </ButtonWrapper>
      </Wrapper>
    );
  }
);

export default FreedomFundResultCard;
