import styled from "styled-components";
const Header = () => {
    return ( 
        <HeaderElement>
			<Logo>The<Strong>Anime</Strong>Database</Logo>
		</HeaderElement>
     );
}


const HeaderElement = styled.header`
    padding-top: 50px;
	padding-bottom: 50px;
`

const Logo = styled.h1`
    color: #AAA;
	font-size: 36px;
	font-weight: 400;
	text-align: center;
`

const Strong = styled.strong`
    color: #313131;
`
 
export default Header;