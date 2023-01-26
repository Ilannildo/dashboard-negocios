import { forwardRef, useEffect } from "react";
import { Link } from "react-router-dom";

// material-ui
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useCustomization } from "../../../../hooks/useCustomization";

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("lg"));
  const { isOpen, menuOpen, setMenu, opened } = useCustomization();

  const Icon = item.icon;
  const itemIcon = item?.icon && (
    <Icon stroke={1.5} size={opened ? "1.3rem" : "1.5rem"} />
  );

  let itemTarget = "_self";
  if (item.target) {
    itemTarget = "_blank";
  }

  let listItemProps = {
    component: forwardRef((props, ref) => (
      <Link
        ref={ref}
        {...props}
        to={`/dashboard/${item.url}`}
        target={itemTarget}
      />
    )),
  };

  if (item?.external) {
    listItemProps = { component: "a", href: item.url, target: itemTarget };
  }

  const itemHandler = (id) => {
    menuOpen(id);

    if (matchesSM) setMenu(false);
  };

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split("/")
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      menuOpen(item.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        mb: 0.5,
        position: "relative",
        p: opened ? 1 : 2,
        alignItems: "flex-start",
        backgroundColor:
          isOpen.findIndex((id) => id === item.id) > -1
            ? `rgba(233,240,247,0.05) !important`
            : "transparent",
        pl: opened ? `${level * 12}px` : 2,
      }}
      selected={isOpen.findIndex((id) => id === item.id) > -1}
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon
        sx={{
          my: "auto",
          minWidth: !item?.icon ? 18 : 36,
          color:
            isOpen.findIndex((id) => id === item.id) > -1
              ? theme.palette.onPrimary.main
              : theme.palette.neutral.main,
        }}
      >
        {itemIcon}
      </ListItemIcon>
      {opened && (
        <ListItemText
          primary={
            <Typography
              color={
                isOpen.findIndex((id) => id === item.id) > -1
                  ? theme.palette.onPrimary.main
                  : theme.palette.neutral.main
              }
              fontSize={14}
            >
              {item.title}
            </Typography>
          }
          secondary={
            item.caption && (
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.6875rem",
                  fontWeight: 500,
                  color: "#9e9e9e",
                  textTransform: "capitalize",
                }}
                display="block"
                gutterBottom
              >
                {item.caption}
              </Typography>
            )
          }
        />
      )}
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

export default NavItem;
