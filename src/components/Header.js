import React from "react";
import "./Header.css";

import styled from "styled-components";

const Header = React.memo((props) => {
  // const dispatch = useDispatch();
  // const [show, handleShow] = useState(false);

  const headerChange = () => {
    const navbox = document.querySelector(".nav");

    if (window.scrollY > 105) {
      navbox.style.position = "fixed";
      navbox.style.zIndex = "1500";
      navbox.style.backgroundColor = "black";
    } else {
      navbox.style.backgroundColor = "transparent";
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", headerChange);

    return () => window.removeEventListener("scroll", headerChange);
  }, []);

  return <HeaderWrap></HeaderWrap>;
});

const HeaderWrap = styled.div`
  height: 50px;
  width: 100%;
  position: fixed;
  z-index: 1500;
  padding: 10px;
  display: flex;
  flex-direction: row;

  //Animation
  transition-timing-function: ease-in-out;
  transition: all 0.5s;
`;

export default Header;
