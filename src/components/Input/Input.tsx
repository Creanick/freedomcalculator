import styled from 'styled-components'
const Input = styled.input<{ error?: boolean }>`
    display: block;
    box-sizing: border-box;
    width: 100%;
    border: 1px solid ${props => props.error ? "red" : "#cdcdcd"};
    padding: 12px 16px;
    border-radius: 4px;
    &:focus{
        outline:none;
        border: 1px solid ${props => props.error ? "red" : "dodgerblue"};
    }
`;

export default Input
