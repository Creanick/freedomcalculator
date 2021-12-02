import styled from "styled-components";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
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
        <LabeledInput id="expense" inputElement={<Input type="number" placeholder="Ex:50000" id="expense" />}>Monthly Expense</LabeledInput>
        <LabeledInput id="current-age" inputElement={<Input type="number" placeholder="Ex:20" id="current-age" />}>Current Age</LabeledInput>
        <LabeledInput id="freedom-age" inputElement={<Input type="number" placeholder="Ex:40" id="freedom-age" value={40} />}>Freedom Age</LabeledInput>
        <LabeledInput id="life-expentancy" inputElement={<Input type="number" placeholder="Ex:80" id="life-expentancy" value={80} />}>Life Expentancy</LabeledInput>
        <LabeledInput id="inflation-rate" inputElement={<Input type="number" placeholder="Ex:6%" id="inflation-rate" value={6} />}>Inflation Rate</LabeledInput>
        <LabeledInput id="post-freedom-return" inputElement={<Input type="number" placeholder="Ex:10%" id="post-freedom-return" value={10} />}>Post Freedom Return</LabeledInput>
        <Button>Calculate</Button>
        <p>Total Fund Needed</p>
        <p className="total-fund">0</p>
      </InputContainer>
    </Wrapper>
  );
}

export default App;
