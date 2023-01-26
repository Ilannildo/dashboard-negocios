import PropTypes from "prop-types";

// material-ui
import { Avatar, Box, ButtonBase, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { List } from "phosphor-react";
import { useCustomization } from "../../../../hooks/useCustomization";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

interface IHeader {
  handleLeftDrawerToggle: () => void;
}

const Header = ({ handleLeftDrawerToggle }: IHeader) => {
  const theme = useTheme();
  const { opened } = useCustomization();

  return (
    <>
      <Box
        sx={{
          marginLeft: opened ? 30 : 12,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
          <Avatar
            variant="rounded"
            sx={{
              transition: "all .2s ease-in-out",
              background: theme.palette.background.default,
              color: theme.palette.primary.main,
              "&:hover": {
                background: theme.palette.neutral.main,
                color: theme.palette.secondary.main,
              },
            }}
            onClick={handleLeftDrawerToggle}
            color="primary"
          >
            <List size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>
      <Box
        sx={{
          marginLeft: 2,
          display: "flex",
          flexDirection: "column",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography
            fontWeight={600}
            fontSize={16}
            color={theme.palette.onPrimaryContainer.main}
          >
            Bem vindo (a)!
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* <ProfileSection /> */}
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
