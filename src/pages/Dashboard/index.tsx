import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { ChartPie, EnvelopeSimple, Phone } from "phosphor-react";

import UserAvatar from "../../assets/images/avatar.png";

export const Dashboard = () => {
  const theme = useTheme();

  return (
    <Grid container>
      <Grid item lg={12}>
        <Grid container spacing={2}>
          {/* {isLoadingEventInfomations && (
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Grid container spacing={2}>
                <Grid item lg={4} md={4} sm={4} xs={6}>
                  <Card variant="elevation" elevation={0}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item lg={10} md={10} sm={10} xs={10}>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onSurfaceVariant.main,
                              fontWeight: 500,
                            }}
                          >
                            Eventos criados
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          lg={2}
                          md={2}
                          sm={2}
                          xs={2}
                          justifyContent="end"
                          alignItems="center"
                          display="flex"
                        >
                          <CalendarPlus
                            size={32}
                            color={theme.palette.success.main}
                          />
                        </Grid>
                      </Grid>
                      <Grid container mt={1}>
                        <Grid item>
                          <Skeleton
                            variant="rectangular"
                            width={75}
                            height={21}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={6}>
                  <Card variant="elevation" elevation={0}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item lg={10} md={10} sm={10} xs={10}>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onSurfaceVariant.main,
                              fontWeight: 500,
                            }}
                          >
                            Eventos encerrados
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          lg={2}
                          md={2}
                          sm={3}
                          xs={4}
                          justifyContent="end"
                          alignItems="center"
                          display="flex"
                        >
                          <CalendarX
                            size={32}
                            color={theme.palette.error.light}
                          />
                        </Grid>
                      </Grid>
                      <Grid container mt={1}>
                        <Grid item>
                          <Skeleton
                            variant="rectangular"
                            width={50}
                            height={21}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={6}>
                  <Card variant="elevation" elevation={0}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item lg={10} md={10} sm={10} xs={10}>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onSurfaceVariant.main,
                              fontWeight: 500,
                            }}
                          >
                            Eventos disponíveis
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          lg={2}
                          md={2}
                          sm={2}
                          xs={2}
                          justifyContent="end"
                          alignItems="center"
                          display="flex"
                        >
                          <CalendarCheck
                            size={32}
                            color={theme.palette.primary.main}
                          />
                        </Grid>
                      </Grid>
                      <Grid container mt={1}>
                        <Grid item>
                          <Skeleton
                            variant="rectangular"
                            width={100}
                            height={21}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          )} */}
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Card variant="elevation" elevation={0}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid
                        item
                        lg={6}
                        md={6}
                        sm={12}
                        xs={12}
                        display="flex"
                        alignItems="center"
                      >
                        <Stack
                          direction="row"
                          spacing={2}
                          display="flex"
                          alignItems="center"
                        >
                          <Avatar
                            src={UserAvatar}
                            variant="circular"
                            alt="Profile"
                            sx={{ width: 56, height: 56 }}
                          />
                          <Stack spacing={1}>
                            <Typography
                              fontSize={14}
                              sx={{
                                color: (theme) =>
                                  theme.palette.onSurfaceVariant.main,
                                fontWeight: 700,
                              }}
                            >
                              Ilannildo Viana da Cruz
                            </Typography>
                            <Typography
                              fontSize={14}
                              sx={{
                                color: (theme) =>
                                  theme.palette.onSurfaceVariant.main,
                              }}
                            >
                              Redes FIEPA
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid
                        item
                        lg={4}
                        md={4}
                        sm={6}
                        xs={6}
                        display="flex"
                        alignItems="center"
                      >
                        <Stack spacing={1}>
                          <Stack
                            spacing={1}
                            direction="row"
                            alignItems="center"
                          >
                            <EnvelopeSimple
                              size={20}
                              color={theme.palette.onSurfaceVariant.main}
                            />
                            <Typography
                              fontSize={14}
                              sx={{
                                color: (theme) =>
                                  theme.palette.onSurfaceVariant.main,
                              }}
                            >
                              devcomprador2@fiepa.com.br
                            </Typography>
                          </Stack>
                          <Stack
                            spacing={1}
                            direction="row"
                            alignItems="center"
                          >
                            <Phone
                              size={20}
                              color={theme.palette.onSurfaceVariant.main}
                            />
                            <Typography
                              fontSize={14}
                              sx={{
                                color: (theme) =>
                                  theme.palette.onSurfaceVariant.main,
                              }}
                            >
                              (91) 98787-9898
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid
                        item
                        lg={2}
                        md={2}
                        sm={6}
                        xs={6}
                        justifyContent="end"
                        alignItems="center"
                        display="flex"
                      >
                        <Stack spacing={2} direction="row" alignItems="center">
                          <ChartPie
                            size={38}
                            color={theme.palette.onSurfaceVariant.main}
                          />
                          <Stack spacing={1}>
                            <Typography
                              fontSize={16}
                              sx={{
                                color: (theme) => theme.palette.success.main,
                              }}
                            >
                              1
                            </Typography>
                            <Typography
                              fontSize={10}
                              sx={{
                                color: (theme) =>
                                  theme.palette.onSurfaceVariant.main,
                              }}
                            >
                              DEMANDAS LANÇADAS
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Card variant="elevation" elevation={0}>
                  <CardHeader
                    sx={{
                      backgroundColor: theme.palette.neutral.main,
                    }}
                    title={
                      <Typography
                        fontSize={14}
                        sx={{
                          color: (theme) => theme.palette.onSurfaceVariant.main,
                          fontWeight: 500,
                        }}
                      >
                        Demandas na plataforma
                      </Typography>
                    }
                  />
                  <CardContent>
                    <Box
                      sx={{
                        mb: 2,
                      }}
                    >
                      <Tabs
                        value={1}
                        onChange={() => {}}
                        aria-label="basic tabs example"
                      >
                        <Tab label="Demandas abertas" value={1} />
                        <Tab label="Minhas demandas" value={2} />
                      </Tabs>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Card variant="outlined">
                          <Box
                            sx={{
                              backgroundColor: theme.palette.primary.main,
                              height: 2,
                              width: "100%",
                            }}
                          />
                          <CardContent>
                            <Typography
                              fontSize={14}
                              sx={{
                                color: (theme) =>
                                  theme.palette.onSurfaceVariant.main,
                                fontWeight: 500,
                              }}
                            >
                              Título da demanda
                            </Typography>
                            <Typography
                              fontSize={14}
                              sx={{
                                color: (theme) =>
                                  theme.palette.onSurfaceVariant.main,
                              }}
                            >
                              <b>Município:</b> Cametá
                            </Typography>
                            <Typography
                              fontSize={14}
                              sx={{
                                color: (theme) =>
                                  theme.palette.onSurfaceVariant.main,
                              }}
                            >
                              <b>Prazo de inscrição:</b> 01/02/2023
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
