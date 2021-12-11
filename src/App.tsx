import { FormikErrors, useFormik } from "formik";
import { useRef, useState } from "react";
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
  display: grid;
  gap: 16px;
  max-width: 380px;
  box-sizing: border-box;
  overflow: auto;
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
  const fundContainerRef = useRef<HTMLDivElement>();
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
      if (values.monthlyExpense < 0 || values.monthlyExpense > 999999999) {
        errors.monthlyExpense = "Monthly Expense is out of normal range";
      }
      if (values.currentAge < 1 || values.currentAge > 200) {
        errors.currentAge = "Current Age must be between 1 and 200";
      }
      if (values.freedomAge < 1 || values.freedomAge > 200) {
        errors.freedomAge = "Freedom Age must be between 1 and 200";
      }
      if (values.lifeExpectancy < 1 || values.lifeExpectancy > 200) {
        errors.lifeExpectancy = "Life Expentancy must be between 1 and 200";
      }
      if (values.inflationRate < 0) {
        errors.inflationRate = "Inflation rate must be positive";
      }
      if (values.postFreedomReturn < 0) {
        errors.postFreedomReturn = "Post Freedom Return must be positive";
      }
      if ((values.freedomAge - values.currentAge) < 0) {
        errors.freedomAge = "Freedom Age must be greater or equal to current age";
        errors.currentAge = "Current Age must be less than or equal to freedom age";
      }
      if ((values.lifeExpectancy - values.freedomAge) < 0) {
        errors.freedomAge = "Freedom Age must be less than or equals to life expectancy";
        errors.lifeExpectancy = "Life Expectancy must be greater or equal to freedom age"
      }
      if (values.postFreedomReturn <= values.inflationRate) {
        errors.inflationRate = "Inflation rate must be less than post freedom return";
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
        if (fundContainerRef) {
          fundContainerRef.current?.scrollIntoView();
        }

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
  const labelInputLists: {
    id: keyof FormValues,
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
  const handleFocus = (id: keyof FormValues) => {
    formik.setFieldTouched(id);
  }
  return (
    <Wrapper>
      <InputSection>
        <Header />
        <InputContainer onSubmit={formik.handleSubmit}>
          {
            labelInputLists.map(({ id, inputType, label, placeholder }) => {
              const isError = formik.touched[id] && (formik.errors[id] !== undefined);
              return (
                <LabeledInput key={id} id={id} showError={isError} errorMessage={formik.errors[id]} inputElement={<Input error={isError} type={inputType}
                  onBlur={formik.handleBlur} onFocus={() => handleFocus(id)} placeholder={placeholder} id={id} value={formik.values[id]} onChange={formik.handleChange} />}>{label}</LabeledInput>
              )
            })
          }
          <Button type="submit" disabled={!formik.isValid}>Calculate</Button>
        </InputContainer>
      </InputSection>
      <ResultSection>
        <FundContainer ref={fundContainerRef as any}>
          <Fund priority={FundPriority.primary} amount={totalMortalFund}>Total Fund Needed At {submittedFreedomAge} years age for next {submittedLifeExpectancy - submittedFreedomAge} years</Fund>
          <Fund amount={monthlyExpenseAtFreedom}>Monthly expense at {submittedFreedomAge} years age</Fund>
          <Fund amount={totalImmortalFund}>Total fund needed At {submittedFreedomAge} years age to use forever</Fund>
        </FundContainer>
      </ResultSection>
    </Wrapper>
  );
}

export default App;
