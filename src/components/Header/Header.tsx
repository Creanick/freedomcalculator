import styled from 'styled-components';
import logo from '../../assets/logo.svg';
const Logo = styled.img`
`;
const Wrapper = styled.header`
    /* border: 1px solid black; */
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px 30px 10px;
    @media screen and (min-width: 350px){
        flex-direction: row;
        text-align: left;
        ${Logo}{
            margin-right: 20px;
        }
    }
`;
const NameSection = styled.section`
`;
const SubTitle = styled.h2`
    font-size: 12px;
    font-weight: 600;
    margin: 0;
    color: grey;
`;
const Title = styled.h1`
    margin:0;
    font-size: 34px;
    color: #464646;
`;
const Header = () => {
    return (
        <Wrapper>
            <Logo src={logo} alt="" width={60} height={60} />
            <NameSection>
                <Title>FFC</Title>
                <SubTitle>Financial Freedom Calculator</SubTitle>
            </NameSection>
        </Wrapper>
    )
}

export default Header
