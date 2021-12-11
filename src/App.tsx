import { useRef } from "react";
import styled from "styled-components";
import Button from "./components/Button/Button";
import Fund, { FundPriority } from "./components/Fund/Fund";
import Header from "./components/Header/Header";
import Input from "./components/Input/Input";
import LabeledInput from "./components/LabeledInput/LabeledInput";
import useFreedomFundForm, { FreedomFormValues } from "./hooks/use_freedom_fund_form";

const sectionBreakPoint = "850px"
const Wrapper = styled.div`
  //desktop style
  @media screen and (min-width:${sectionBreakPoint}){
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;
const inputContainerWidth = "300px";
const InputContainer = styled.form`
  box-sizing: border-box;
  width: ${inputContainerWidth};
  max-width: ${inputContainerWidth};
  padding: 20px;
  display: grid;
  gap:18px;
  @media screen and (max-width:${inputContainerWidth}){
    width:100%;
  }
`;
const InputSection = styled.section`
    display: grid;
    grid-template-rows: auto 1fr;
    align-items: center;
    ${InputContainer}{
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
  const freedomFundFormInputProperties: {
    id: keyof FreedomFormValues,
    inputType: string,
    placeholder: string,
    label: string
  }[] = [
      {
        id: "monthlyExpense",
        placeholder: "0",
        inputType: "number",
        label: "Monthly Expense"
      },
      {
        id: "currentAge",
        placeholder: "0 years",
        inputType: "number",
        label: "Current Age"
      },
      {
        id: "freedomAge",
        placeholder: "0 years",
        inputType: "number",
        label: "Freedom Age"
      },
      {
        id: "lifeExpectancy",
        placeholder: "0 years",
        inputType: "number",
        label: "LifeExpectancy"
      },
      {
        id: "inflationRate",
        placeholder: "0%",
        inputType: "number",
        label: "Inflation Rate"
      },
      {
        id: "postFreedomReturn",
        placeholder: "0%",
        inputType: "number",
        label: "Post Freedom Return"
      },
    ];
  return (
    <Wrapper>
      <InputSection>
        <Header />
        <InputContainer onSubmit={freedomFundFormik.handleSubmit}>
          {
            freedomFundFormInputProperties.map(({ id, inputType, label, placeholder }) => {
              const isError = freedomFundFormik.touched[id] && (freedomFundFormik.errors[id] !== undefined);
              return (
                <LabeledInput key={id} idFor={id} showError={isError} errorMessage={freedomFundFormik.errors[id]} inputElement={<Input error={isError} type={inputType}
                  onBlur={freedomFundFormik.handleBlur} onFocus={freedomFundFormik.handleFocus} placeholder={placeholder} id={id} value={freedomFundFormik.currentValues[id]} onChange={freedomFundFormik.handleChange} />}>{label}</LabeledInput>
              )

            })
          }
          <Button type="submit" disabled={!freedomFundFormik.isValid}>Calculate</Button>
        </InputContainer>
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
