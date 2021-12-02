import { useState } from "react";
import styled from "styled-components";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import LabeledInput from "./components/LabeledInput/LabeledInput";
import FreedomCalculatorEntity from "./domain/entity/freedom_calculator_entity";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1{
    font-weight: 600;
    text-align: center;
  }
`;
const inputContainerWidth = "300px";
const InputContainer = styled.form`
  /* border: 1px solid black; */
  box-sizing: border-box;
  width: ${inputContainerWidth};
  max-width: ${inputContainerWidth};
  padding: 20px;
  display: grid;
  gap:18px;
  @media screen and (max-width:${inputContainerWidth}){
    width:100%;
  }
  p{
    font-weight: 600;
    margin:0;
    text-align: center;
    &.total-fund{
      color: seagreen;
    }
  }
`;
const App = () => {
  const [expense, setExpense] = useState("");
  const [currentAge, setCurrentAge] = useState("");
  const [freedomAge, setFreedomAge] = useState("");
  const [lifeExpectancy, setLifeExpectancy] = useState("80");
  const [inflationRate, setInflationRate] = useState("6");
  const [postFreedomReturn, setPostFreedomReturn] = useState("10");
  const [totalFund, setTotalFund] = useState(0);
  const onCalculate = () => {
    const expenseValue = Number(expense);
    const currentAgeValue = Number(currentAge);
    const freedomAgeValue = Number(freedomAge);
    const lifeExpectancyValue = Number(lifeExpectancy);
    const inflationRateValue = Number(inflationRate);
    const postFreedomReturnValue = Number(postFreedomReturn);
    if (isNaN(expenseValue) || isNaN(currentAgeValue) || isNaN(freedomAgeValue) || isNaN(lifeExpectancyValue) || isNaN(inflationRateValue) || isNaN(postFreedomReturnValue)) {
      return;
    }
    const totalFundValue = FreedomCalculatorEntity.calculateTotalFund({
      currentAge: currentAgeValue,
      freedomAge: freedomAgeValue,
      inflationRate: inflationRateValue,
      lifeExpectancy: lifeExpectancyValue,
      monthlyExpense: expenseValue,
      postFreedomReturn: postFreedomReturnValue
    });
    setTotalFund(totalFundValue);
  }
  return (
    <Wrapper>
      <h1>Financial Freedom Calculator</h1>
      <InputContainer onSubmit={e => { e.preventDefault(); onCalculate(); }}>
        <LabeledInput id="expense" inputElement={<Input type="number" placeholder="Ex:50000" id="expense" value={expense} onChange={e => setExpense(e.target.value)} />}>Monthly Expense</LabeledInput>
        <LabeledInput id="current-age" inputElement={<Input type="number" placeholder="Ex:20" id="current-age" value={currentAge} onChange={e => setCurrentAge(e.target.value)} />}>Current Age</LabeledInput>
        <LabeledInput id="freedom-age" inputElement={<Input type="number" placeholder="Ex:40" id="freedom-age" value={freedomAge} onChange={e => setFreedomAge(e.target.value)} />}>Freedom Age</LabeledInput>
        <LabeledInput id="life-expectancy" inputElement={<Input type="number" placeholder="Ex:80" id="life-expectancy" value={lifeExpectancy} onChange={e => setLifeExpectancy(e.target.value)} />}>Life Expectancy</LabeledInput>
        <LabeledInput id="inflation-rate" inputElement={<Input type="number" placeholder="Ex:6%" id="inflation-rate" value={inflationRate} onChange={e => setInflationRate(e.target.value)} />}>Inflation Rate</LabeledInput>
        <LabeledInput id="post-freedom-return" inputElement={<Input type="number" placeholder="Ex:10%" id="post-freedom-return" value={postFreedomReturn} onChange={e => setPostFreedomReturn(e.target.value)} />}>Post Freedom Return</LabeledInput>
        <Button>Calculate</Button>
        <p>Total Fund Needed</p>
        <p className="total-fund">{totalFund}</p>
      </InputContainer>
    </Wrapper>
  );
}

export default App;
