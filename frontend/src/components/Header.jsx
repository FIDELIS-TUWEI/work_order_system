import { Box, styled } from "@mui/material";
import headerImage from "../assets/workOrder.png"

const Header = () => {

  const StyleHeader = styled(Box)(({theme}) => (
    {
      display: 'flex',
      justifyContent: 'center',
      minHeight: 400,
      backgroundImage: `url(${headerImage})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'none',
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