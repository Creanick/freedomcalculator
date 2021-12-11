import { useRef } from "react";
import styled from "styled-components";
import FreedomFundForm from "./components/FreedomFundForm/FreedomFundForm";
import FreedomFundResultCard from "./components/FreedomFundResultCard/FreedomFundResultCard";
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
const App = () => {
  const resultCardRef = useRef<HTMLDivElement>();
  const freedomFundFormik = useFreedomFundForm({
    onSubmit: (_) => {
      if (resultCardRef && resultCardRef.current) {
        resultCardRef.current.scrollIntoView();
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
        <FreedomFundResultCard ref={resultCardRef} freedomAge={freedomFundFormik.submittedValues.freedomAge} lifeExpectancy={freedomFundFormik.submittedValues.lifeExpectancy}
          fundValues={{ mortalFund: freedomFundFormik.mortalFund, immortalFund: freedomFundFormik.immortalFund }} monthlyExpenseAtFreedom={freedomFundFormik.monthlyExpenseAtFreedom}
        />
      </ResultSection>
    </Wrapper>
  );
}

export default App;
