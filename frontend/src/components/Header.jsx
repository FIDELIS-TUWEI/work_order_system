import { Box, styled } from "@mui/material";
import headerImage from "../assets/header.png"

const Header = () => {

  const StyleHeader = styled(Box)(({theme}) => (
    {
      display: 'flex',
      justifyContent: 'center',
      minHeight: 400,
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

      </StyleHeader>
    </>
  )
}

export default Header