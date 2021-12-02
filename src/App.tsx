import styled from "styled-components";
import Button from "./components/Button/Button";
import LabeledInput from "./components/LabeledInput/LabeledInput";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1{
    font-weight: 600;
  }
`;
const InputContainer = styled.form`
  /* border: 1px solid black; */
  max-width: 300px;
  display: grid;
  gap:18px;
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
  return (
    <Wrapper>
      <h1>Financial Freedom Calculator</h1>
      <InputContainer >
        <LabeledInput id="expense" hint="Ex:50000" type="number">Monthly Expense</LabeledInput>
        <LabeledInput id="current-age" hint="Ex:20" type="number">Current Age</LabeledInput>
        <LabeledInput id="freedom-age" hint="Ex:40" type="number">Freedom Age</LabeledInput>
        <LabeledInput id="life-expentancy" hint="Ex:80" value="80" type="number">Life Expentancy</LabeledInput>
        <LabeledInput id="inflation-rate" hint="Ex: 6%" value="6" type="number">Inflation Rate</LabeledInput>
        <LabeledInput id="post-freedom-return" hint="Ex: 10%" value="10" type="number">Post Freedom Return</LabeledInput>
        <Button>Calculate</Button>
        <p>Total Fund Needed</p>
        <p className="total-fund">0</p>
      </InputContainer>
    </Wrapper>
  );
}

export default App;
