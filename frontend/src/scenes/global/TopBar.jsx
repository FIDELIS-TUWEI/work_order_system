import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { colorModeContext, tokens } from "theme";
import InputBase from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonModeOutlined";
import SearchIcon from "@mui/icons-material/Search";


const TopBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(colorModeContext);
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="search" />
          <IconButton type="button" sx={{p: 1 }}>
            <SearchIcon />
          </IconButton>
      </Box>

      {/* ICONS */}
      
    </Box>
  )
}

export default TopBar;