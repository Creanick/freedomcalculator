import styled from 'styled-components'
const StyledHeader = styled.header`
    .title{
    font-weight: 600;
    text-align: center;
    }
`;
const Header = () => {
    return (
        <StyledHeader>
            <h1 className="title">Financial Freedom Calculator</h1>
        </StyledHeader>
    )
}

export default Header
