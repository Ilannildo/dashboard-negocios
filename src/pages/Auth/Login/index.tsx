import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  InputAdornment,
  Link,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { EnvelopeSimple, LockSimple } from "phosphor-react";
import { FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import BackgroundLoginImage from "../../../assets/images/background.png";
import Logo from "../../../assets/logo/logo.png";
import { useAuth } from "../../../hooks/useAuth";
import { UserType } from "../../../models/user";
import { validateEmail } from "../../../utils/roles";

const Login = () => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const [searchparams] = useSearchParams();
  const navigate = useNavigate();
  const { signIn, isLoading } = useAuth();

  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // errors
  const [emailError, setEmailError] = useState(" ");
  const [passwordError, setPasswordError] = useState(" ");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setEmailError(" ");
    setPasswordError(" ");
    if (email === "") {
      return setEmailError("e-mail é obrigatório");
    }

    if (!validateEmail(email)) {
      return setEmailError("e-mail inválido");
    }

    if (password === "") {
      return setPasswordError("senha é obrigatório");
    }

    try {
      const result = await signIn(email, password);

      if (result) {
        //verificar se existe parametro
        if (searchparams.get("callback-url")) {
          navigate(searchparams.get("callback-url") || "/", {
            replace: true,
          });
        } else {
          if (result.is_education) {
            return navigate("/education/albums", {
              replace: true,
            });
          }

          if (result.user.verify_register === "false") {
            return navigate("/verify-email");
          }

          if (result.user.type === UserType.BUYER) {
            return navigate("/dashboard");
          }

          if (result.user.type === UserType.SELLER) {
            if (
              result.company.first_login === null ||
              result.company.first_login === 0
            ) {
              return navigate("/first-login");
            }

            if (result.status_payment === 0) {
              return navigate("/register-payment");
            }

            return navigate("/dashboard");
          }
        }
      }
    } catch (error: any) {
      console.log("Error", error);
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const goToRegisterPage = () => {
    navigate("/welcome");
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
          onSubmit={handleSubmit}
          component="form"
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
              flexDirection="column"
            >
              <Typography fontSize={22} variant="h1" fontWeight="500" mt={2}>
                Sentimos sua falta por aqui! =D
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
                Seja bem vindo (a) de volta!
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" mt={4}>
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
              <TextField
                margin="dense"
                fullWidth
                id="email"
                label="E-mail"
                size="medium"
                name="email"
                autoComplete="email"
                value={email}
                error={emailError !== " "}
                helperText={emailError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EnvelopeSimple size={22} />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
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
              <TextField
                margin="dense"
                fullWidth
                name="password"
                label="Senha"
                type="password"
                size="medium"
                id="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockSimple size={22} />
                    </InputAdornment>
                  ),
                }}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError !== " "}
                helperText={passwordError}
              />
              <Link
                href="/forgot-password"
                fontSize={14}
                variant="h1"
                sx={{
                  color: (theme) => theme.palette.primary.main,
                }}
              >
                Esqueci minha senha
              </Link>
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
              <Button
                type="submit"
                fullWidth
                disabled={isLoading}
                size="large"
                color="primary"
                variant="contained"
                sx={{
                  mt: 3,
                }}
              >
                {isLoading ? (
                  <CircularProgress color="inherit" size={26} />
                ) : (
                  `Entrar`
                )}
              </Button>
              <Divider
                sx={{
                  mt: 3,
                  mb: 3,
                  width: "100%",
                }}
              />
              <Button
                variant="outlined"
                fullWidth
                size="large"
                color="primary"
                onClick={() => goToRegisterPage()}
              >
                Registre-se
              </Button>
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
export default Login;
