import { FormikErrors, useFormik } from "formik";
import { useState } from "react";
import styled from "styled-components";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import LabeledInput from "./components/LabeledInput/LabeledInput";
import calculateCompoundedFutureMonthlyExpense from "./domain/logic/calculators/calculate_compounded_future_monthly_expense";
import calculateImmortalFreedomFund from "./domain/logic/calculators/calculate_immortal_freedom_fund";
import calculateMortalFreedomFund from "./domain/logic/calculators/calculate_mortal_freedom_fund";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .title{
    font-weight: 600;
    text-align: center;
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
  .total-fund-container {
    p{
      font-weight: 600;
      margin:0;
      text-align: center;
    }
    p.total-fund{
      color: seagreen;
    }
  }
`;
const App = () => {
  const formik = useFormik({
    initialValues: {
      expense: 50000,
      currentAge: 20,
      freedomAge: 40,
      lifeExpectancy: 80,
      inflationRate: 6,
      postFreedomReturn: 10
    },
    validate: values => {
      const errors: FormikErrors<{
        expense: string;
        currentAge: string;
        freedomAge: string;
        lifeExpectancy: string;
        inflationRate: string;
        postFreedomReturn: string;
      }> = {};
      if (values.expense < 0) {
        errors.expense = "Expense must be greater than or equal to 0";
      }
      if (values.currentAge < 1) {
        errors.currentAge = "Current Age must be greater than 0";
      } else if (values.currentAge >= values.freedomAge) {
        errors.currentAge = "Current Age must be less than freedom age";
      } else if (values.currentAge >= values.lifeExpectancy) {
        errors.currentAge = "Current Age must be less than life expentancy";
      }
      if (values.freedomAge < 1) {
        errors.freedomAge = "Freedom Age must be greater than 0";
      } else if (values.freedomAge <= values.currentAge) {
        errors.freedomAge = "Freedom Age must be greater than current age";
      } else if (values.freedomAge > values.lifeExpectancy) {
        errors.freedomAge = "Freedom age must be less than or equal to life expectancy";
      }
      if (values.lifeExpectancy < 1) {
        errors.lifeExpectancy = "Life Expentancy must be greater than 0";
      } else if (values.lifeExpectancy <= values.currentAge) {
        errors.lifeExpectancy = "Life Expectancy must be greater than current age";
      } else if (values.lifeExpectancy < values.freedomAge) {
        errors.lifeExpectancy = "Life Expectancy must greater than or equal to freedom age";
      }
      if (values.postFreedomReturn < values.inflationRate) {
        errors.postFreedomReturn = "Post Freedom Return Rate must be greater than or equals to inflation rate";
      }
      return errors;
    },
    onSubmit: values => {
      const params = { ...values, monthlyExpense: values.expense };
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
        setTotalFund(totalMortalFreedomFund);
      } catch (error) {
        console.error("Total Fund Calculation Error");
      }
    }
  })
  const { currentAge, expense, freedomAge, inflationRate, lifeExpectancy, postFreedomReturn } = formik.values;
  const [totalFund, setTotalFund] = useState(0);
  const [monthlyExpenseAtFreedom, setMonthlyExpenseAtFreedom] = useState(0);
  const [totalImmortalFund, setTotalImmortalFund] = useState(0);
  return (
    <Wrapper>
      <h1 className="title">Financial Freedom Calculator</h1>
      <InputContainer onSubmit={formik.handleSubmit}>

        <LabeledInput id="expense" showError={formik.touched.expense} errorMessage={formik.errors.expense} inputElement={<Input type="number" onBlur={formik.handleBlur} placeholder="0" id="expense" value={expense} onChange={formik.handleChange} />}>Monthly Expense</LabeledInput>

        <LabeledInput id="currentAge" showError={formik.touched.currentAge} errorMessage={formik.errors.currentAge} inputElement={<Input type="number" onBlur={formik.handleBlur} placeholder="0 year" id="currentAge" value={currentAge} onChange={formik.handleChange} />}>Current Age</LabeledInput>

        <LabeledInput id="freedomAge" showError={formik.touched.freedomAge} errorMessage={formik.errors.freedomAge} inputElement={<Input type="number" onBlur={formik.handleBlur} placeholder="0 year" id="freedomAge" value={freedomAge} onChange={formik.handleChange} />}>Freedom Age</LabeledInput>

        <LabeledInput id="lifeExpectancy" showError={formik.touched.lifeExpectancy} errorMessage={formik.errors.lifeExpectancy} inputElement={<Input type="number" onBlur={formik.handleBlur} placeholder="0 year" id="lifeExpectancy" value={lifeExpectancy} onChange={formik.handleChange} />}>Life Expectancy</LabeledInput>

        <LabeledInput id="inflationRate" showError={formik.touched.inflationRate} errorMessage={formik.errors.inflationRate} inputElement={<Input type="number" onBlur={formik.handleBlur} placeholder="0%" id="inflationRate" value={inflationRate} onChange={formik.handleChange} />}>Inflation Rate</LabeledInput>

        <LabeledInput id="postFreedomReturn" showError={formik.touched.postFreedomReturn} errorMessage={formik.errors.postFreedomReturn} inputElement={<Input type="number" onBlur={formik.handleBlur} placeholder="0%" id="postFreedomReturn" value={postFreedomReturn} onChange={formik.handleChange} />}>Post Freedom Return</LabeledInput>

        <Button type="submit">Calculate</Button>
        <div className="total-fund-container">
          <p>Monthly Expense At Freedom Age</p>
          <p className="total-fund">{Math.round(monthlyExpenseAtFreedom)}</p>
          <p>Total Fund Needed without Life Expectancy</p>
          <p className="total-fund">{Math.round(totalImmortalFund)}</p>
          <p>Total Fund Needed</p>
          <p className="total-fund">{Math.round(totalFund)}</p>
        </div>
      </InputContainer>
    </Wrapper>
  );
}

export default App;
