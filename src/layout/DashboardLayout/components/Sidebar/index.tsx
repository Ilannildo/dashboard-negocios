import { Box, Drawer, useMediaQuery, useTheme } from "@mui/material";
import LogoSection from "../../../../components/LogoSection";
import { drawerWidth } from "../../../../utils/constant";
import MenuList from "../MenuList";

interface ISidebar {
  drawerOpen: boolean;
  drawerToggle: () => void;
  window?: any;
  items: any[];
}

export const DashboardPanelSidebar = ({
  drawerOpen,
  drawerToggle,
  window,
  items,
}: ISidebar) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 } }}>
      <Drawer
        container={container}
        variant={!matchesSM ? "permanent" : "temporary"}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        sx={{
          ...(drawerOpen && {
            width: drawerWidth,
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: "hidden",
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              background: theme.palette.secondary.main,
              color: theme.palette.text.primary,
              borderRight: "none",
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              overflowX: "hidden",
            },
          }),
          ...(!drawerOpen && {
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: "hidden",
            width: `calc(${theme.spacing(7)} + 1px)`,
            [theme.breakpoints.up("sm")]: {
              width: `calc(${theme.spacing(8)} + 1px)`,
            },
            "& .MuiDrawer-paper": {
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              background: theme.palette.secondary.main,
              color: theme.palette.text.primary,
              borderRight: "none",
              overflowX: "hidden",
              width: `calc(${theme.spacing(7)} + 1px)`,
              [theme.breakpoints.up("sm")]: {
                width: `calc(${theme.spacing(8)} + 1px)`,
              },
            },
          }),
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        <Box mb={2}>
          <Box
            sx={{
              display: "flex",
              p: 2,
              mx: "auto",
              backgroundColor: "rgba(0, 0, 21, 0.2)",
            }}
          >
            <LogoSection mini={!drawerOpen} />
          </Box>
        </Box>

        <Box
          component="div"
          style={{
            paddingRight: drawerOpen ? "16px" : 0,
          }}
        >
          <MenuList items={items} />
        </Box>
      </Drawer>
    </Box>
  );
};
