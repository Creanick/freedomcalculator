import { FormikErrors, useFormik } from "formik";
import { useState } from "react";
import styled from "styled-components";
import Button from "./components/Button/Button";
import Fund, { FundPriority } from "./components/Fund/Fund";
import Header from "./components/Header/Header";
import Input from "./components/Input/Input";
import LabeledInput from "./components/LabeledInput/LabeledInput";
import calculateCompoundedFutureMonthlyExpense from "./domain/logic/calculators/calculate_compounded_future_monthly_expense";
import calculateImmortalFreedomFund from "./domain/logic/calculators/calculate_immortal_freedom_fund";
import calculateMortalFreedomFund from "./domain/logic/calculators/calculate_mortal_freedom_fund";

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
  max-width: 300px;
  display: grid;
  gap: 16px;
`;
interface FormValues {
  monthlyExpense: number
  currentAge: number
  freedomAge: number
  lifeExpectancy: number
  inflationRate: number
  postFreedomReturn: number
}
const App = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      monthlyExpense: 50000,
      currentAge: 20,
      freedomAge: 40,
      lifeExpectancy: 80,
      inflationRate: 6,
      postFreedomReturn: 10
    },
    validate: values => {
      const errors: FormikErrors<FormValues> = {};
      if (values.monthlyExpense < 0) {
        errors.monthlyExpense = "Monthly Expense must be greater than or equal to 0";
      }
      if (values.currentAge < 1) {
        errors.currentAge = "Current Age must be greater than 0";
      }
      if (values.freedomAge < 1) {
        errors.freedomAge = "Freedom Age must be greater than 0";
      }
      if (values.lifeExpectancy < 1) {
        errors.lifeExpectancy = "Life Expentancy must be greater than 0";
      }
      if (values.inflationRate < 0) {
        errors.inflationRate = "Inflation rate must be positive";
      }
      if (values.postFreedomReturn < 0) {
        errors.postFreedomReturn = "Post Freedom Return must be positive";
      }
      if ((values.freedomAge - values.currentAge) < 0) {
        errors.freedomAge = "Freedom Age must be greater or equal to current age";
      }
      if ((values.lifeExpectancy - values.freedomAge) < 0) {
        errors.lifeExpectancy = "Life Expectancy must be greater or equal to freedom age"
      }
      if (values.postFreedomReturn <= values.inflationRate) {
        errors.postFreedomReturn = "Post Freedom Return Rate must be greater than inflation rate";
      }
      return errors;
    },
    onSubmit: values => {
      try {
        setMonthlyExpenseAtFreedom(getMonthlyExpenseAtFreedom(values));
        setTotalImmortalFund(getTotalImmortalFund(values));
        setTotalMortalFund(getMortalFund(values));
        setSubmittedFreedomAge(values.freedomAge);
        setSubmittedLifeExpectancy(values.lifeExpectancy);
      } catch (error) {
        console.error("Freedom Fund Calculation failed");
      }
    }
  })
  const getMonthlyExpenseAtFreedom = (values: FormValues) => {
    return calculateCompoundedFutureMonthlyExpense({
      currentAge: values.currentAge,
      futureAge: values.freedomAge,
      currentMonthlyExpense: values.monthlyExpense,
      inflationRate: values.inflationRate
    });
  }
  const getTotalImmortalFund = (values: FormValues) => {
    return calculateImmortalFreedomFund({
      ...values,
      monthlyExpense: getMonthlyExpenseAtFreedom(values)
    });
  }
  const getMortalFund = (values: FormValues) => {
    return calculateMortalFreedomFund({
      inflationRate: values.inflationRate,
      monthlyExpense: getMonthlyExpenseAtFreedom(values),
      postFreedomReturn: values.postFreedomReturn,
      totalYears: values.lifeExpectancy - values.freedomAge
    });
  }
  const [submittedFreedomAge, setSubmittedFreedomAge] = useState(formik.initialValues.freedomAge);
  const [submittedLifeExpectancy, setSubmittedLifeExpectancy] = useState(formik.initialValues.lifeExpectancy);
  const [totalMortalFund, setTotalMortalFund] = useState(getMortalFund(formik.initialValues));
  const [monthlyExpenseAtFreedom, setMonthlyExpenseAtFreedom] = useState(getMonthlyExpenseAtFreedom(formik.initialValues));
  const [totalImmortalFund, setTotalImmortalFund] = useState(getTotalImmortalFund(formik.initialValues));

  return (
    <Wrapper>
      <InputSection>
        <Header />
        <InputContainer onSubmit={formik.handleSubmit}>

          <LabeledInput id="monthlyExpense" showError={formik.touched.monthlyExpense} errorMessage={formik.errors.monthlyExpense} inputElement={<Input type="number" onBlur={formik.handleBlur} placeholder="0" id="monthlyExpense" value={formik.values.monthlyExpense} onChange={formik.handleChange} />}>Monthly Expense</LabeledInput>

          <LabeledInput id="currentAge" showError={formik.touched.currentAge} errorMessage={formik.errors.currentAge} inputElement={<Input type="number" onBlur={formik.handleBlur} placeholder="0 year" id="currentAge" value={formik.values.currentAge} onChange={formik.handleChange} />}>Current Age</LabeledInput>

          <LabeledInput id="freedomAge" showError={formik.touched.freedomAge} errorMessage={formik.errors.freedomAge} inputElement={<Input type="number" onBlur={formik.handleBlur} placeholder="0 year" id="freedomAge" value={formik.values.freedomAge} onChange={formik.handleChange} />}>Freedom Age</LabeledInput>

          <LabeledInput id="lifeExpectancy" showError={formik.touched.lifeExpectancy} errorMessage={formik.errors.lifeExpectancy} inputElement={<Input type="number" onBlur={formik.handleBlur} placeholder="0 year" id="lifeExpectancy" value={formik.values.lifeExpectancy} onChange={formik.handleChange} />}>Life Expectancy</LabeledInput>

          <LabeledInput id="inflationRate" showError={formik.touched.inflationRate} errorMessage={formik.errors.inflationRate} inputElement={<Input type="number" onBlur={formik.handleBlur} placeholder="0%" id="inflationRate" value={formik.values.inflationRate} onChange={formik.handleChange} />}>Inflation Rate</LabeledInput>

          <LabeledInput id="postFreedomReturn" showError={formik.touched.postFreedomReturn} errorMessage={formik.errors.postFreedomReturn} inputElement={<Input type="number" onBlur={formik.handleBlur} placeholder="0%" id="postFreedomReturn" value={formik.values.postFreedomReturn} onChange={formik.handleChange} />}>Post Freedom Return</LabeledInput>

          <Button type="submit" disabled={!formik.isValid}>Calculate</Button>
        </InputContainer>
      </InputSection>
      <ResultSection>
        <FundContainer>
          <Fund priority={FundPriority.primary} amount={totalMortalFund}>Total Fund Needed At {submittedFreedomAge} years age for next {submittedLifeExpectancy - submittedFreedomAge} years</Fund>
          <Fund amount={monthlyExpenseAtFreedom}>Monthly expense at {submittedFreedomAge} years age</Fund>
          <Fund amount={totalImmortalFund}>Total fund needed At {submittedFreedomAge} years age to use forever</Fund>
        </FundContainer>
      </ResultSection>
    </Wrapper>
  );
}

export default App;
