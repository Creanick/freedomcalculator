import { useRef } from "react";
import styled from "styled-components";
import FreedomFundForm from "./components/FreedomFundForm/FreedomFundForm";
import Fund, { FundPriority } from "./components/Fund/Fund";
import Header from "./components/Header/Header";
import useFreedomFundForm from "./hooks/use_freedom_fund_form";

const sectionBreakPoint = "850px"
const Wrapper = styled.div`
  //desktop style
  @media screen and (min-width:${sectionBreakPoint}){
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;
const InputSection = styled.section`
    display: grid;
    grid-template-rows: auto 1fr;
    align-items: center;
    form{
      justify-self: center;
    }
`;
const ResultSection = styled.section`
  background-image: linear-gradient(0deg, #aad4ff, transparent);
  padding: 80px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width:${sectionBreakPoint}){
    background-image: linear-gradient(270deg, #aad4ff, transparent);
  }
`;
const FundContainer = styled.div`
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
const App = () => {
  const fundContainerRef = useRef<HTMLDivElement>();
  const freedomFundFormik = useFreedomFundForm({
    onSubmit: (_) => {
      if (fundContainerRef && fundContainerRef.current) {
        fundContainerRef.current.scrollIntoView();
      }
    }
  });
  return (
    <Wrapper>
      <InputSection>
        <Header />
        <FreedomFundForm onSubmit={freedomFundFormik.handleSubmit} errors={freedomFundFormik.errors} touched={freedomFundFormik.touched}
          values={freedomFundFormik.currentValues} isValid={freedomFundFormik.isValid} onBlur={freedomFundFormik.handleBlur}
          onChange={freedomFundFormik.handleChange} onFocus={freedomFundFormik.handleFocus} />
      </InputSection>
      <ResultSection>
        <FundContainer ref={fundContainerRef as any}>
          <Fund priority={FundPriority.primary} amount={freedomFundFormik.mortalFund}>Total Fund Needed At {freedomFundFormik.submittedValues.freedomAge} years age for next {freedomFundFormik.submittedValues.lifeExpectancy - freedomFundFormik.submittedValues.freedomAge} years</Fund>
          <Fund amount={freedomFundFormik.monthlyExpenseAtFreedom}>Monthly expense at {freedomFundFormik.submittedValues.freedomAge} years age</Fund>
          <Fund amount={freedomFundFormik.immortalFund}>Total fund needed At {freedomFundFormik.submittedValues.freedomAge} years age to use forever</Fund>
        </FundContainer>
      </ResultSection>
    </Wrapper>
  );
}

export default App;
