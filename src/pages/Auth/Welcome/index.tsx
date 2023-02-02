import {
  Box,
  Button,
  Grid,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import BackgroundLoginImage from "../../../assets/images/background.png";
import Logo from "../../../assets/logo/logo.png";

const Welcome = () => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const goToRegisterPage = () => {
    navigate("/register");
  };
  const goToRegisterBuyerPage = () => {
    navigate("/register-buyer");
  };
  const goToRegisterEducationPage = () => {
    navigate("/register-education");
  };

  return (
    <Grid container component="main" minHeight="100vh">
      {matchesSM && (
        <Grid
          item
          xs={false}
          sm={12}
          md={6}
          lg={6}
          xl={7}
          p={2}
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            background: `url(${BackgroundLoginImage})`,
            backgroundSize: "cover",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <img src={Logo} width="50%" alt="logo +Negócios" />
        </Grid>
      )}
      <Grid
        item
        xs={12}
        md={6}
        lg={6}
        xl={5}
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          p: 2,
          maxWidth: 640,
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            maxWidth: 375,
          }}
        >
          <Grid container justifyContent="center" spacing={2}>
            <Grid
              item
              sx={{ userSelect: "none" }}
              lg={12}
              xl={12}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Typography fontSize={22} variant="h1" fontWeight="500" mt={2}>
                Bem vindo(a) ao +Negócios
              </Typography>
              <Typography
                fontSize={14}
                variant="h1"
                fontWeight="500"
                mt={1}
                sx={{
                  color: (theme) => theme.palette.text.disabled,
                }}
              >
                A plataforma de negócios do Hub Redes
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" mt={4} spacing={2}>
            <Grid
              item
              lg={12}
              xl={12}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="end"
              flexDirection="column"
            >
              <Button
                variant="outlined"
                fullWidth
                size="large"
                color="primary"
                onClick={() => goToRegisterPage()}
              >
                QUERO VENDER
              </Button>
            </Grid>
            <Grid
              item
              lg={12}
              xl={12}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="end"
              flexDirection="column"
            >
              <Button
                variant="outlined"
                fullWidth
                size="large"
                color="primary"
                onClick={() => goToRegisterBuyerPage()}
              >
                QUERO COMPRAR
              </Button>
            </Grid>
            <Grid
              item
              lg={12}
              xl={12}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="end"
              flexDirection="column"
            >
              <Button
                variant="outlined"
                fullWidth
                size="large"
                color="primary"
                onClick={() => goToRegisterEducationPage()}
              >
                QUERO APRENDER
              </Button>
            </Grid>
            <Grid
              item
              lg={12}
              xl={12}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Link
                href="/login"
                fontSize={14}
                variant="h1"
                sx={{
                  color: (theme) => theme.palette.primary.main,
                }}
              >
                Já possui cadastro ? Faça login
              </Link>
              <Typography
                fontSize={14}
                variant="h1"
                mt={3}
                sx={{
                  color: (theme) => theme.palette.onSurfaceVariant.main,
                }}
              >
                Emperium @ {new Date().getFullYear()}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {!matchesSM && (
        <Grid
          item
          xs={false}
          sm={12}
          md={6}
          lg={6}
          xl={7}
          p={2}
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            background: `url(${BackgroundLoginImage})`,
            backgroundSize: "cover",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <img src={Logo} width="50%" alt="logo +Negócios" />
        </Grid>
      )}
    </Grid>
  );
};
export default Welcome;
