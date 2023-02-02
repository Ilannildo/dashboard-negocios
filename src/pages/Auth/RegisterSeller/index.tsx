import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  InputAdornment,
  Link,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { EnvelopeSimple, LockSimple, Phone, User } from "phosphor-react";
import { FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import BackgroundLoginImage from "../../../assets/images/background.png";
import Logo from "../../../assets/logo/logo.png";
import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../services/api";
import { maskPhoneNumber, removeMaskCpf } from "../../../utils/masks";
import { validateEmail } from "../../../utils/roles";

const PHONE_NUMBER_MAX_LENGTH = 11;
const PASSWORD_MIN_LENGTH = 8;

const RegisterSeller = () => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const [searchparams] = useSearchParams();
  const navigate = useNavigate();
  const { signIn } = useAuth();

  // states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // errors
  const [emailError, setEmailError] = useState(" ");
  const [nameError, setNameError] = useState(" ");
  const [phoneError, setPhoneError] = useState(" ");
  const [passwordError, setPasswordError] = useState(" ");
  const [confirmPasswordError, setConfirmPasswordError] = useState(" ");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setNameError(" ");
    setEmailError(" ");
    setPhoneError(" ");
    setPasswordError(" ");
    setConfirmPasswordError(" ");

    try {
      setIsRegistering(true);
      await api.post("/register", {
        step: 1,
        name,
        email,
        phone,
        password,
        type: 2,
        type_company: "company",
        accept_terms: acceptTerms,
      });

      const result = await signIn(email, password);
      setIsRegistering(false);

      if (result) {
        //verificar se existe parametro
        if (searchparams.get("callback-url")) {
          navigate(searchparams.get("callback-url") || "/", {
            replace: true,
          });
        } else {
          return navigate("/register-company", {
            replace: true,
          });
        }
      }
    } catch (error: any) {
      setIsRegistering(false);
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const onChangeName = (value: string) => {
    const regex = /^[a-zA-Z-À-Ÿà-ÿ][A-Za-zÀ-Ÿà-ÿ ,.']+$/;
    setName(value);
    setNameError(" ");
    if (!value) {
      return setNameError("O nome é obrigatório");
    }

    if (!regex.test(value)) {
      return setNameError("Revise esse dado");
    }
  };

  const onChangeEmail = (value: string) => {
    setEmail(value);
    setEmailError(" ");
    if (!value) {
      return setEmailError("O e-mail é obrigatório");
    }

    if (!validateEmail(email)) {
      return setEmailError("O e-mail é inválido");
    }
  };

  const onChangePhoneNumber = (value: string) => {
    value = removeMaskCpf(value);
    const regex = /^([0-9.-]+)+$/;
    if (value.length > PHONE_NUMBER_MAX_LENGTH) {
      return;
    }
    setPhone(value);
    setPhoneError(" ");

    if (!value) {
      return setPhoneError("O número de telefone é obrigatório");
    }

    if (!regex.test(value)) {
      return setPhoneError("Revise este dado");
    }
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
    setPasswordError(" ");

    if (!value) {
      return setPasswordError("A senha é obrigatório");
    }

    if (value.length < PASSWORD_MIN_LENGTH) {
      return setPasswordError("A senha deve ter no mínino 8 caracteres");
    }
  };

  const onChangeConfirmPassword = (value: string) => {
    setConfirmPassword(value);
    setConfirmPasswordError(" ");

    if (!value) {
      return setConfirmPasswordError("Confirme sua senha");
    }

    if (value !== password) {
      return setConfirmPasswordError("A senha é diferente");
    }
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
            maxWidth: 400,
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
                Cadastre-se como Fornecedor
              </Typography>
              <Typography
                fontSize={14}
                variant="h1"
                mt={1}
                sx={{
                  color: (theme) => theme.palette.text.disabled,
                }}
              >
                E faça parte também desse ambiente de oportunidades!
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" mt={2}>
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
                id="name"
                label="Nome"
                size="small"
                name="name"
                value={name}
                error={nameError !== " "}
                helperText={nameError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <User size={22} />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => onChangeName(e.target.value)}
              />
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
              <TextField
                margin="dense"
                fullWidth
                id="email"
                label="E-mail"
                size="small"
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
                onChange={(e) => onChangeEmail(e.target.value)}
              />
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
              <TextField
                margin="dense"
                fullWidth
                id="phone"
                label="Telefone"
                size="small"
                name="phone"
                autoComplete="phone"
                value={maskPhoneNumber(phone)}
                error={phoneError !== " "}
                helperText={phoneError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone size={22} />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => onChangePhoneNumber(e.target.value)}
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
                size="small"
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
                onChange={(e) => onChangePassword(e.target.value)}
                error={passwordError !== " "}
                helperText={passwordError}
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
                name="confirm-password"
                label="Confirme a senha"
                type="password"
                size="small"
                id="confirm-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockSimple size={22} />
                    </InputAdornment>
                  ),
                }}
                value={confirmPassword}
                onChange={(e) => onChangeConfirmPassword(e.target.value)}
                error={confirmPasswordError !== " "}
                helperText={confirmPasswordError}
              />
            </Grid>
            <Grid
              item
              lg={12}
              xl={12}
              xs={12}
              display="flex"
              justifyContent="center"
              flexDirection="column"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={acceptTerms}
                    onChange={(e, value) => setAcceptTerms(value)}
                  />
                }
                label={
                  <Typography
                    fontSize={14}
                    variant="h1"
                    sx={{
                      color: (theme) => theme.palette.onSurfaceVariant.main,
                    }}
                  >
                    Li e aceito os{" "}
                    <Link
                      href="/login"
                      fontSize={14}
                      variant="h1"
                      sx={{
                        color: (theme) => theme.palette.primary.main,
                      }}
                    >
                      termos de uso
                    </Link>{" "}
                    da plataforma
                  </Typography>
                }
              />
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
                disabled={isRegistering}
                size="large"
                color="primary"
                variant="contained"
                sx={{
                  mt: 1,
                }}
              >
                {isRegistering ? (
                  <CircularProgress color="inherit" size={26} />
                ) : (
                  `Registrar`
                )}
              </Button>
              <Link
                href="/login"
                fontSize={14}
                variant="h1"
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  mt: 2,
                }}
              >
                Já possui cadastro? Faça login aqui
              </Link>
              <Typography
                fontSize={14}
                variant="h1"
                mt={2}
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
export default RegisterSeller;
