import { AppBar, Box, styled, Toolbar, useTheme } from "@mui/material";
import {
  Calendar,
  Chats,
  Gauge,
  GraduationCap,
  ListBullets,
  Medal,
  Ticket,
  UserCircle,
  Users,
} from "phosphor-react";
import { Outlet } from "react-router-dom";
import { useCustomization } from "../../hooks/useCustomization";
import { useAuthenticatedUser } from "../../stores/user";
import { drawerWidth } from "../../utils/constant";
import Header from "./components/Header";
import { DashboardPanelSidebar } from "./components/Sidebar";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open: boolean;
}>(({ theme, open }) => ({
  backgroundColor: "rgba(221,227,234, 0.5)",
  width: "100%",
  minHeight: "calc(100vh - 70px)",
  flexGrow: 1,
  padding: "16px",
  marginTop: "70px",
  ...(!open && {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
  ...(open && {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.down("md")]: {
      marginLeft: "20px",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "10px",
    },
  }),
}));

const DashboardLayout = () => {
  const theme = useTheme();
  const { opened, setMenu } = useCustomization();
  const { data } = useAuthenticatedUser();

  const sidebarItemsEducation = {
    id: "pages",
    type: "group",
    children: [
      {
        id: "education",
        title: "+Educação",
        type: "item",
        url: "/education/albums",
        icon: GraduationCap,
        breadcrumbs: false,
      },
      {
        id: "inscricoes",
        title: "Minhas inscrições",
        type: "item",
        url: "inscricoes",
        icon: Ticket,
        breadcrumbs: false,
      },
      {
        id: "minha-conta",
        title: "Minha conta",
        type: "item",
        url: "minha-conta",
        icon: UserCircle,
        breadcrumbs: false,
      },
    ],
  };

  const sidebarItemsAdmin = {
    id: "pages",
    type: "group",
    children: [
      {
        id: "",
        title: "Meus eventos",
        type: "item",
        url: "",
        icon: Calendar,
        breadcrumbs: false,
      },
      {
        id: "inscricoes",
        title: "Minhas inscrições",
        type: "item",
        url: "inscricoes",
        icon: Ticket,
        breadcrumbs: false,
      },
      {
        id: "minha-conta",
        title: "Minha conta",
        type: "item",
        url: "minha-conta",
        icon: UserCircle,
        breadcrumbs: false,
      },
    ],
  };
  const sidebarItemsBuyer = [
    {
      id: "pages",
      type: "group",
      children: [
        {
          id: "",
          title: "Dashboard",
          type: "item",
          url: "",
          icon: Gauge,
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "buyer",
      type: "group",
      title: "Comprador",
      children: [
        {
          id: "demands",
          title: "Minhas Demandas",
          type: "item",
          url: "demands",
          icon: ListBullets,
          breadcrumbs: false,
        },
        {
          id: "approved-suppliers",
          title: "Fornecedores Homologados",
          type: "item",
          url: "approved-suppliers",
          icon: Medal,
          breadcrumbs: false,
        },
        {
          id: "search",
          title: "Fornecedores Comuns",
          type: "item",
          url: "search",
          icon: Users,
          breadcrumbs: false,
        },
        {
          id: "messages",
          title: "Mensagens",
          type: "item",
          url: "messages/inbox",
          icon: Chats,
          breadcrumbs: false,
        },
      ],
    },
  ];

  const sidebarItemsSeller = {
    id: "pages",
    type: "group",
    children: [
      {
        id: "",
        title: "Meus eventos",
        type: "item",
        url: "",
        icon: Calendar,
        breadcrumbs: false,
      },
      {
        id: "inscricoes",
        title: "Minhas inscrições",
        type: "item",
        url: "inscricoes",
        icon: Ticket,
        breadcrumbs: false,
      },
      {
        id: "minha-conta",
        title: "Minha conta",
        type: "item",
        url: "minha-conta",
        icon: UserCircle,
        breadcrumbs: false,
      },
    ],
  };

  const handleLeftDrawerToggle = () => {
    setMenu(!opened);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        color="inherit"
        elevation={0}
        position="fixed"
        sx={{
          bgcolor: theme.palette.background.default,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),

          ...(opened && {
            // marginLeft: drawerWidth,
            width: `calc(100% - ${theme.spacing(7)} + 1px)`,
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
          ...(!opened && {
            // marginLeft: `calc(${theme.spacing(7)} + 1px)`,
            width: `100%`,
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }),
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>
      {data && (
        <DashboardPanelSidebar
          drawerOpen={opened}
          drawerToggle={handleLeftDrawerToggle}
          items={sidebarItemsBuyer}
        />
      )}
      <Main theme={theme} open={opened}>
        <Outlet />
      </Main>
    </Box>
  );
};

export default DashboardLayout;
