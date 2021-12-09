import { FormikErrors, useFormik } from "formik";
import { useState } from "react";
import styled from "styled-components";
import Button from "./components/Button/Button";
import Fund from "./components/Fund/Fund";
import Header from "./components/Header/Header";
import Input from "./components/Input/Input";
import LabeledInput from "./components/LabeledInput/LabeledInput";
import calculateCompoundedFutureMonthlyExpense from "./domain/logic/calculators/calculate_compounded_future_monthly_expense";
import calculateImmortalFreedomFund from "./domain/logic/calculators/calculate_immortal_freedom_fund";
import calculateMortalFreedomFund from "./domain/logic/calculators/calculate_mortal_freedom_fund";

const Wrapper = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center; */
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
const ResultSection = styled.section`
  background-color: dodgerblue;
  padding: 80px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FundContainer = styled.div`
border-radius: 4px;
  background-color: white;
  padding: 24px;
  max-width: 300px;
  display: grid;
  gap: 16px;
`;
const App = () => {
  const formik = useFormik({
    initialValues: {
      monthlyExpense: 50000,
      currentAge: 20,
      freedomAge: 40,
      lifeExpectancy: 80,
      inflationRate: 6,
      postFreedomReturn: 10
    },
    validate: values => {
      const errors: FormikErrors<{
        monthlyExpense: string;
        currentAge: string;
        freedomAge: string;
        lifeExpectancy: string;
        inflationRate: string;
        postFreedomReturn: string;
      }> = {};
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
      const params = { ...values };
      try {
        const monthlyExpenseAtFreedom = calculateCompoundedFutureMonthlyExpense({
          currentAge: params.currentAge,
          futureAge: params.freedomAge,
          currentMonthlyExpense: params.monthlyExpense,
          inflationRate: params.inflationRate
        });
        const totalImmortalFreedomFund = calculateImmortalFreedomFund({
          inflationRate: params.inflationRate,
          postFreedomReturn: params.postFreedomReturn,
          monthlyExpense: monthlyExpenseAtFreedom
        });
        const totalMortalFreedomFund = calculateMortalFreedomFund({
          inflationRate: params.inflationRate,
          monthlyExpense: monthlyExpenseAtFreedom,
          postFreedomReturn: params.postFreedomReturn,
          totalYears: params.lifeExpectancy - params.freedomAge
        })
        setMonthlyExpenseAtFreedom(monthlyExpenseAtFreedom);
        setTotalImmortalFund(totalImmortalFreedomFund);
        setTotalMortalFund(totalMortalFreedomFund);
        setSubmittedFreedomAge(values.freedomAge);
        setSubmittedLifeExpectancy(values.lifeExpectancy);
      } catch (error) {
        console.error("Total Fund Calculation Error");
      }
    }
  })
  const { currentAge, monthlyExpense, freedomAge, inflationRate, lifeExpectancy, postFreedomReturn } = formik.values;
  const [submittedFreedomAge, setSubmittedFreedomAge] = useState(formik.initialValues.freedomAge);
  const [submittedLifeExpectancy, setSubmittedLifeExpectancy] = useState(formik.initialValues.lifeExpectancy);
  const [totalMortalFund, setTotalMortalFund] = useState(0);
  const [monthlyExpenseAtFreedom, setMonthlyExpenseAtFreedom] = useState(0);
  const [totalImmortalFund, setTotalImmortalFund] = useState(0);

  return (
    <Wrapper>
      <section className="input-section">
        <Header />
        <InputContainer onSubmit={formik.handleSubmit}>

          <LabeledInput id="monthlyExpense" showError={formik.touched.monthlyExpense} errorMessage={formik.errors.monthlyExpense} inputElement={<Input type="number" onBlur={formik.handleBlur} placeholder="0" id="monthlyExpense" value={monthlyExpense} onChange={formik.handleChange} />}>Monthly Expense</LabeledInput>

          <LabeledInput id="currentAge" showError={formik.touched.currentAge} errorMessage={formik.errors.currentAge} inputElement={<Input type="number" onBlur={formik.handleBlur} placeholder="0 year" id="currentAge" value={currentAge} onChange={formik.handleChange} />}>Current Age</LabeledInput>

          <LabeledInput id="freedomAge" showError={formik.touched.freedomAge} errorMessage={formik.errors.freedomAge} inputElement={<Input type="number" onBlur={formik.handleBlur} placeholder="0 year" id="freedomAge" value={freedomAge} onChange={formik.handleChange} />}>Freedom Age</LabeledInput>

          <LabeledInput id="lifeExpectancy" showError={formik.touched.lifeExpectancy} errorMessage={formik.errors.lifeExpectancy} inputElement={<Input type="number" onBlur={formik.handleBlur} placeholder="0 year" id="lifeExpectancy" value={lifeExpectancy} onChange={formik.handleChange} />}>Life Expectancy</LabeledInput>

          <LabeledInput id="inflationRate" showError={formik.touched.inflationRate} errorMessage={formik.errors.inflationRate} inputElement={<Input type="number" onBlur={formik.handleBlur} placeholder="0%" id="inflationRate" value={inflationRate} onChange={formik.handleChange} />}>Inflation Rate</LabeledInput>

          <LabeledInput id="postFreedomReturn" showError={formik.touched.postFreedomReturn} errorMessage={formik.errors.postFreedomReturn} inputElement={<Input type="number" onBlur={formik.handleBlur} placeholder="0%" id="postFreedomReturn" value={postFreedomReturn} onChange={formik.handleChange} />}>Post Freedom Return</LabeledInput>

          <Button type="submit" disabled={!formik.isValid}>Calculate</Button>
        </InputContainer>
      </section>
      <ResultSection>
        <FundContainer>
          <Fund amount={totalMortalFund}>Total Fund Needed At {submittedFreedomAge} years age for next {submittedLifeExpectancy - submittedFreedomAge} years</Fund>
          <Fund amount={monthlyExpenseAtFreedom}>Monthly expense at {submittedFreedomAge} years age</Fund>
          <Fund amount={totalImmortalFund}>Total fund needed At {submittedFreedomAge} years age to use forever</Fund>
        </FundContainer>
      </ResultSection>
    </Wrapper>
  );
}

export default App;
