import { Box, styled } from "@mui/material";
import headerImage from "../assets/header.png"
import SearchInputEl from "./SearchInputEl";

const Header = () => {

  const StyleHeader = styled(Box)(({theme}) => (
    {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: "100vh",
      backgroundImage: `url(${headerImage})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundColor: theme.palette.secondary.main,
    }
  ))

  return (
    <>
      <StyleHeader>
        {/*<SearchInputEl />*/}
      </StyleHeader>
    </>
  )
}

export default Header