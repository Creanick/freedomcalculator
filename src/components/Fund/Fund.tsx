import { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import formatCurrency from "../../utils/formatCurrency";
export enum FundPriority {
  primary,
  secondary,
}
interface Props {
  amount: number;
  priority?: FundPriority;
  currency?: "USD" | "INR";
}
const titleBaseColor = "#858585";
const amountBaseColor = "#4c4c4c";
const FundTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
`;
const FundAmount = styled.p`
  font-size: 26px;
  font-weight: 600;
`;
const Wrapper = styled.div<{ active?: boolean }>`
  ${FundTitle},${FundAmount} {
    margin: 0;
  }
  ${FundAmount} {
    color: ${amountBaseColor};
  }
  ${FundTitle} {
    color: ${titleBaseColor};
    margin-bottom: 4px;
  }
  ${(props) => {
    return (
      props.active &&
      css`
        ${FundAmount} {
          color: seagreen;
        }
      `
    );
  }}
`;
const Fund: FunctionComponent<Props> = ({
  children,
  amount,
  priority = FundPriority.secondary,
  currency,
}) => {
  return (
    <Wrapper active={priority === FundPriority.primary ? true : false}>
      <FundTitle>{children}</FundTitle>
      <FundAmount>{formatCurrency(amount, currency)}</FundAmount>
    </Wrapper>
  );
};

export default Fund;
