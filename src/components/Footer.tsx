import styled from "styled-components";

const Container = styled.div`
  line-height: 12vh;
  background-color: ${(props) => props.theme.bgColor};
  text-align: center;
  `;


function Footer() {
  return (
    <Container>&copy; 2022, s0ojin All rights reserved.</Container>
  )
}

export default Footer;