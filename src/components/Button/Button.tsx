import styled from 'styled-components'
const Button = styled.button`
    padding: 12px 18px;
    border: none;
    font-weight: bold;
    border-radius: 4px;
    background-color: dodgerblue;
    color:white;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    &:hover{
        background-color: #0281ff;
    }
    &:active{
        transform: scale(0.98);
    }
    &:disabled{
        background-color: grey;
        cursor: not-allowed;
    }
`;

export default Button
