import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon} from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display:flex;
  height: 12vh;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  justify-content: space-between;
  align-items: center;
  `;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 30px;
  text-transform: uppercase;
  font-size: 30px;
  font-family: 'Open Sans', sans-serif;
  font-style: italic;
  letter-spacing: -3px;
  line-height: 90%;
  font-weight: 800;
  span:first-child {
    color:${(props) => props.theme.accentColor};
    font-size: 40px;
  } 
`;

const ModeBtn = styled.div`
  font-size: 30px;
  margin: 0px 30px;
`;

function Header() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return(
    <Container>
      <Link to="/">
        <Logo>
          <span>coin</span>
          <span>tracker</span>
        </Logo>
      </Link>
      <ModeBtn>      
        <FontAwesomeIcon icon={isDark ? faSun : faMoon} onClick={toggleDarkAtom}/>
      </ModeBtn>
    </Container>
  )
}

export default Header;
