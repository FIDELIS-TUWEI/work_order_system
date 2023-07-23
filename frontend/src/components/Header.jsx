import { Box, styled } from "@mui/material";
import headerImage from "../assets/header.png"

const Header = () => {

  const StyleHeader = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: "100vh",
    backgroundImage: `url(${headerImage})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundColor: '#000',
  }));

  return (
    <>
      <StyleHeader />
    </>
  );
};

export default Header