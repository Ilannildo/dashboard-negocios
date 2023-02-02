import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../../assets/logo/logo.png";
import { ICategory } from "../../../models/category";
import { ISubcategory } from "../../../models/subcategory";
import { api } from "../../../services/api";
import { useCategory } from "../../../stores/category";
import { useAuthenticatedUser } from "../../../stores/user";
import {
  formatCNPJ,
  formatCurrency,
  maskZipCode,
  removeCurrencyMask,
  removeMaskCpf,
} from "../../../utils/masks";
import { validateCNPJ, verifyRevenue } from "../../../utils/roles";
import "./styles.css";

type ITypeSell = "serviços" | "produtos";
const MAX_SELECTION_SUBCATEGORIES = 5;
const ZIPCODE_MAX_LENGTH = 11;
const ZIPCODE_MIN_LENGTH = 8;

const RegisterCompany = () => {
  // states
  const [document, setDocument] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [tradingName, setTradingName] = useState("");
  const [cnae, setCnae] = useState("");
  const [typePort, setTypePort] = useState("");
  const [revenue, setRevenue] = useState(0);
  const [validDocument, setValidDocument] = useState(false);
  const [typeSell, setTypeSell] = useState<ITypeSell>("serviços");
  const [typeBuy, setTypeBuy] = useState<ITypeSell>("serviços");
  const [categorySell, setCategorySell] = useState<ICategory | null>(null);
  const [subcategorySell, setSubcategorySell] = useState<ISubcategory[]>([]);
  const [categoryBuy, setCategoryBuy] = useState<ICategory | null>(null);
  const [subcategoryBuy, setSubcategoryBuy] = useState<ISubcategory[]>([]);
  const [serviceRegion, setServiceRegion] = useState("");
  const [typeEstablishment, setTypeEstablishment] = useState("");
  const [contactName, setContactName] = useState("");
  const [shareCapital, setShareCapital] = useState(0);
  const [shareCapitalText, setShareCapitalText] = useState("");
  const [avarageRevenue, setAvarageRevenue] = useState(0);
  const [avarageRevenueText, setAvarageRevenueText] = useState("");
  const [collaborators, setCollaborators] = useState(0);
  const [mainClient, setMainClient] = useState("");
  const [mainEquipment, setMainEquipment] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [addressNumber, setAddressNumber] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [complement, setComplement] = useState<string>("");

  const [isFetchingZipCode, setIsFetchingZipCode] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // errors
  const [documentError, setDocumentError] = useState(" ");
  const [companyNameError, setCompanyNameError] = useState(" ");
  const [tradingNameError, setTradingNameError] = useState(" ");
  const [typePortError, setTypePortError] = useState(" ");
  const [cnaeError, setCnaeError] = useState(" ");
  const [typeSellError, setTypeSellError] = useState(" ");
  const [categorySellError, setCategorySellError] = useState(" ");
  const [subcategorySellError, setSubcategorySellError] = useState(" ");
  const [typeBuyError, setTypeBuyError] = useState(" ");
  const [categoryBuyError, setCategoryBuyError] = useState(" ");
  const [subcategoryBuyError, setSubcategoryBuyError] = useState(" ");
  const [serviceRegionError, setServiceRegionError] = useState(" ");
  const [typeEstablishmentError, setTypeEstablishmentError] = useState(" ");
  const [contactNameError, setContactNameError] = useState(" ");
  const [shareCapitalError, setShareCapitalError] = useState(" ");
  const [avarageRevenueError, setAvarageRevenueError] = useState(" ");
  const [collaboratorsError, setCollaboratorsError] = useState(" ");
  const [mainClientError, setMainClientError] = useState(" ");
  const [mainEquipmentError, setMainEquipmentError] = useState(" ");
  const [companyWebsiteError, setCompanyWebsiteError] = useState(" ");
  const [linkedinError, setLinkedinError] = useState(" ");
  const [facebookError, setFacebookError] = useState(" ");
  const [instagramError, setInstagramError] = useState(" ");
  const [zipCodeError, setZipCodeError] = useState<string>(" ");
  const [addressError, setAddressError] = useState<string>(" ");
  const [stateError, setStateError] = useState<string>(" ");
  const [addressNumberError, setAddressNumberError] = useState<string>(" ");
  const [districtError, setDistrictError] = useState<string>(" ");
  const [cityError, setCityError] = useState<string>(" ");
  const [complementError, setComplementError] = useState<string>(" ");

  const { data: user } = useAuthenticatedUser();
  const { isLoading: isLoadingCategories, data: categories } = useCategory({
    enabled: !!user,
  });
  const navigate = useNavigate();

  const onChangeDocument = (value: string) => {
    const regex = /^([0-9 ]+)+$/;
    value = removeMaskCpf(value);
    setDocument(value);
    setDocumentError(" ");
    if (!value) {
      return setDocumentError("O CNPJ é obrigatório");
    }

    if (!regex.test(value)) {
      return setDocumentError("Revise esse dado");
    }

    if (!validateCNPJ(value)) {
      setValidDocument(false);
      return setDocumentError("Este CNPJ é inválido");
    } else {
      setValidDocument(true);
    }
  };

  const onChangeCompanyName = (value: string) => {
    setCompanyName(value);
    setCompanyNameError(" ");
    if (!value) {
      return setCompanyNameError("A Razão Social é obrigatório");
    }
  };

  const onChangeTradingName = (value: string) => {
    setTradingName(value);
    setTradingNameError(" ");
    if (!value) {
      return setTradingNameError("A Nome Fantasia é obrigatório");
    }
  };

  const onChangeCnae = (value: string) => {
    setCnae(value);
    setCnaeError(" ");
    if (!value) {
      return setCnaeError("A CNAE é obrigatório");
    }
  };

  const onChangeTypePort = (value: string) => {
    setTypePort(value);
    setTypePortError(" ");
    setRevenue(verifyRevenue(value));

    if (!value) {
      return setTypePortError("A Porte é obrigatório");
    }
  };

  const onChangeTypeSell = (value: ITypeSell) => {
    setTypeSell(value);
    setTypeSellError(" ");

    if (!value) {
      return setTypeSellError("Esse campo é obrigatório");
    }
  };

  const onChangeCategorySell = (value: ICategory | null) => {
    setCategorySell(value);
    setCategorySellError(" ");
    setSubcategorySell([]);
    setSubcategorySellError(" ");

    if (!value) {
      return setCategorySellError("Esse campo é obrigatório");
    }
  };

  const onChangeSubcategorySell = (value: ISubcategory[]) => {
    setSubcategorySellError(" ");
    setSubcategorySell(value);

    if (value.length === 0) {
      return setSubcategorySellError("Esse campo é obrigatório");
    }
  };

  const onChangeTypeBuy = (value: ITypeSell) => {
    setTypeBuy(value);
    setTypeBuyError(" ");

    if (!value) {
      return setTypeBuyError("Esse campo é obrigatório");
    }
  };

  const onChangeCategoryBuy = (value: ICategory | null) => {
    setCategoryBuy(value);
    setCategoryBuyError(" ");
    setSubcategoryBuy([]);
    setSubcategoryBuyError(" ");

    if (!value) {
      return setCategoryBuyError("Esse campo é obrigatório");
    }
  };

  const onChangeSubcategoryBuy = (value: ISubcategory[]) => {
    setSubcategoryBuyError(" ");
    setSubcategoryBuy(value);

    if (value.length === 0) {
      return setSubcategoryBuyError("Esse campo é obrigatório");
    }
  };

  const onChangeServiceRegion = (value: string) => {
    setServiceRegion(value);
    setServiceRegionError(" ");

    if (!value) {
      return setServiceRegionError("A Região de atendimento é obrigatório");
    }
  };

  const onChangeTypeEstablishment = (value: string) => {
    setTypeEstablishment(value);
    setTypeEstablishmentError(" ");

    if (!value) {
      return setTypeEstablishmentError("Esse campo é obrigatório");
    }
  };

  const onChangeContactName = (value: string) => {
    setContactName(value);
    setContactNameError(" ");

    if (!value) {
      return setContactNameError("O nome do responsável é obrigatório");
    }
  };

  const onChangeShareCapital = (value: string) => {
    value = removeCurrencyMask(value);
    setShareCapital(parseFloat(value));
    setShareCapitalText(
      value
        .replace(/\D/g, "")
        .replace(/(\d)(\d{2})$/, "$1,$2")
        .replace(/(?=(\d{3})+(\D))\B/g, "")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
    setShareCapitalError(" ");

    if (!value) {
      return setShareCapitalError("O capital social é obrigatório");
    }
  };

  const onChangeAvarageRevenue = (value: string) => {
    value = removeCurrencyMask(value);
    setAvarageRevenue(parseFloat(value));
    setAvarageRevenueText(
      value
        .replace(/\D/g, "")
        .replace(/(\d)(\d{2})$/, "$1,$2")
        .replace(/(?=(\d{3})+(\D))\B/g, "")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
    setAvarageRevenueError(" ");

    if (!value) {
      return setAvarageRevenueError(
        "A média de faturamento anual é obrigatório"
      );
    }
  };

  const onChangeCollaborators = (value: string) => {
    const regex = /^([0-9 ]+)+$/;
    value = removeMaskCpf(value);
    setCollaborators(Number(value));
    setCollaboratorsError(" ");

    if (!value) {
      return setCollaboratorsError("O número de colaboradores é obrigatório");
    }

    if (!regex.test(value)) {
      return setCollaboratorsError("Revise esse dado");
    }
  };

  const onChangeMainClient = (value: string) => {
    setMainClient(value);
    setMainClientError(" ");

    if (!value) {
      return setMainClientError("Esse campo é obrigatório");
    }
  };

  const onChangeMainEquipment = (value: string) => {
    setMainEquipment(value);
    setMainEquipmentError(" ");

    if (!value) {
      return setMainEquipmentError("Esse campo é obrigatório");
    }
  };

  const onChangeInstagram = (value: string) => {
    setInstagram(value);
    setInstagramError(" ");

    if (!value) {
      return setInstagramError("Esse campo é obrigatório");
    }
  };

  const onChangeFacebook = (value: string) => {
    setFacebook(value);
    setFacebookError(" ");

    if (!value) {
      return setFacebookError("Esse campo é obrigatório");
    }
  };

  const onChangeLinkedin = (value: string) => {
    setLinkedin(value);
    setLinkedinError(" ");

    if (!value) {
      return setLinkedinError("Esse campo é obrigatório");
    }
  };

  const onChangeCompanyWebsite = (value: string) => {
    setCompanyWebsite(value);
    setCompanyWebsiteError(" ");

    if (!value) {
      return setCompanyWebsiteError("Esse campo é obrigatório");
    }
  };

  const onChangeZipCode = (value: string) => {
    if (value.length > ZIPCODE_MAX_LENGTH) {
      return;
    }

    value = value.replace("-", "");

    const regex = /^([0-9 ]+)+$/;

    setZipCode(value);
    setZipCodeError(" ");
    if (!value) {
      return setZipCodeError("O CEP é obrigatório");
    }

    if (!regex.test(value)) {
      return setZipCodeError("Revise esse dado");
    }

    if (value.length < ZIPCODE_MIN_LENGTH) {
      return setZipCodeError("A quantidade de caracteres digitados é inválida");
    }
  };

  const onChangeAddress = (value: string) => {
    const regex = /^[a-zA-Z-À-Ÿà-ÿ][A-Za-zÀ-Ÿà-ÿ ,.']+$/;
    setAddress(value);
    setAddressError(" ");
    if (!value) {
      return setAddressError("O endereço é obrigatório");
    }

    if (!regex.test(value)) {
      return setAddressError("Revise esse dado");
    }
  };

  const onChangeState = (value: string) => {
    const regex = /^[a-zA-Z-À-Ÿà-ÿ][A-Za-zÀ-Ÿà-ÿ ,.']+$/;
    setState(value);
    setStateError(" ");
    if (!value) {
      return setStateError("O estado (UF) é obrigatório");
    }

    if (!regex.test(value)) {
      return setStateError("Revise esse dado");
    }
  };

  const onChangeCity = (value: string) => {
    const regex = /^[a-zA-Z-À-Ÿà-ÿ][A-Za-zÀ-Ÿà-ÿ ,.']+$/;
    setCity(value);
    setCityError(" ");
    if (!value) {
      return setCityError("A cidade é obrigatório");
    }

    if (!regex.test(value)) {
      return setCityError("Revise esse dado");
    }
  };

  const onChangeAddressNumber = (value: string) => {
    const regex = /^([0-9 ]+)+$/;
    setAddressNumber(value);
    setAddressNumberError(" ");

    if (!value) {
      return setAddressNumberError("O número é obrigatório");
    }

    if (!regex.test(value)) {
      return setAddressNumberError("Revise esse dado");
    }
  };

  const onChangeDistrict = (value: string) => {
    const regex = /^[a-zA-Z-À-Ÿà-ÿ][A-Za-zÀ-Ÿà-ÿ ,.']+$/;
    setDistrict(value);
    setDistrictError(" ");
    if (!value) {
      return setDistrictError("O bairro é obrigatório");
    }

    if (!regex.test(value)) {
      return setDistrictError("Insira somente o bairro");
    }
  };

  const onChangeComplement = (value: string) => {
    setComplement(value);
    setComplementError(" ");
    if (!value) {
      return setComplementError("O complemento é obrigatório");
    }
  };

  const handleGetZipCode = async (zipCode: string) => {
    try {
      setIsFetchingZipCode(true);
      const res = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
      setCity(res.data.localidade);
      setState(res.data.uf);
      setIsFetchingZipCode(false);
    } catch (error) {
      setIsFetchingZipCode(false);
      console.log(error);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsRegistering(true);

      let subSell: any[] = [];
      let subBuy: any[] = [];

      let valueSell = subSell.concat(
        subcategorySell.map((item) => {
          return { id: item.id, name: item.name };
        })
      );
      var valueBuy = subBuy.concat(
        subcategoryBuy.map((item) => {
          return { id: item.id, name: item.name };
        })
      );

      const company_interest = {
        sell: {
          type_action: typeSell, // o q que vende
          data: {
            id_category: categorySell?.id,
            subcategories: valueSell,
          },
        },
        buy: {
          type_action: typeBuy, // o que compra
          data: {
            id_category: categoryBuy?.id,
            subcategories: valueBuy,
          },
        },
      };

      await api.post("/register", {
        type: 2,
        step: 2,
        company_name: companyName,
        document,
        trading_name: tradingName,
        cnae,
        revenue,
        type_port: typePort,
        address,
        zipcode: zipCode,
        number: addressNumber,
        neighborhood: district,
        complement,
        region: district,
        city,
        uf: state,
        company_interest,
        type_company: "company",
        id_user: user?.user.id,
        id_company: user?.user.id_company,
        service_region: serviceRegion,
        main_client: mainClient,
        main_equipment: mainEquipment,
        collaborators,
        average_revenue: avarageRevenue,
        type_establishment: typeEstablishment,
        company_website: companyWebsite,
        share_capital: shareCapital,
        contact_name: contactName,
        linkedin,
        facebook,
        instagram,
      });
      setIsRegistering(false);
      navigate(`/register-payment?type-port=${typePort}`, {
        state: {
          typePort,
        },
      });
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Ocorreu um erro ao cadastrar a empresa");
      }
      setIsRegistering(false);
    }
  };

  useEffect(() => {
    if (zipCode.length >= ZIPCODE_MIN_LENGTH) {
      handleGetZipCode(zipCode);
    }
  }, [zipCode]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: (theme) => theme.palette.onSurface.dark,
        py: 3,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container>
        <Grid
          container
          mt={2}
          spacing={2}
          justifyContent="center"
          display="flex"
        >
          <Grid item lg={8} md={10} sm={12} xs={12}>
            <Typography
              fontSize={20}
              variant="h1"
              fontWeight="500"
              mb={3}
              textAlign="center"
              sx={{
                color: (theme) => theme.palette.onPrimary.main,
              }}
            >
              Complete sua inscrição na plataforma +Negócios
            </Typography>
            <ul className="progress-indicator">
              <li className="completed">
                <span className="bubble"></span> Informações Iniciais
              </li>
              <li className="completed">
                <span className="bubble"></span> Dados da Empresa
              </li>
              <li>
                <span className="bubble"></span> Habilitação
              </li>
              <li>
                <span className="bubble"></span> Finalização!
              </li>
            </ul>
          </Grid>
        </Grid>

        <Grid container mt={4}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card elevation={0}>
              <CardContent
                sx={{
                  p: 4,
                }}
                onSubmit={onSubmit}
                component="form"
              >
                <Grid container>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Typography
                      fontSize={14}
                      variant="h1"
                      fontWeight="700"
                      mb={1}
                    >
                      Dados da empresa
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item lg={4} xl={4} xs={12}>
                        <TextField
                          margin="dense"
                          fullWidth
                          id="cnpj"
                          label="CNPJ da Empresa"
                          size="small"
                          required
                          name="cnpj"
                          value={formatCNPJ(document)}
                          error={documentError !== " "}
                          helperText={documentError}
                          onChange={(e) => onChangeDocument(e.target.value)}
                        />
                      </Grid>
                      <Grid item lg={4} xl={4} xs={12}>
                        <TextField
                          margin="dense"
                          fullWidth
                          id="company_name"
                          required
                          label="Razão Social"
                          size="small"
                          name="company_name"
                          value={companyName}
                          error={companyNameError !== " "}
                          helperText={companyNameError}
                          onChange={(e) => onChangeCompanyName(e.target.value)}
                        />
                      </Grid>
                      <Grid item lg={4} xl={4} xs={12}>
                        <TextField
                          margin="dense"
                          fullWidth
                          id="trading_name"
                          label="Nome Fantasia"
                          required
                          size="small"
                          name="trading_name"
                          value={tradingName}
                          error={tradingNameError !== " "}
                          helperText={tradingNameError}
                          onChange={(e) => onChangeTradingName(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item lg={4} xl={4} xs={12}>
                        <TextField
                          margin="dense"
                          fullWidth
                          id="cnae"
                          required
                          label="CNAE Principal"
                          size="small"
                          name="cnae"
                          value={cnae}
                          error={cnaeError !== " "}
                          helperText={cnaeError}
                          onChange={(e) => onChangeCnae(e.target.value)}
                        />
                      </Grid>
                      <Grid item lg={4} xl={4} xs={12}>
                        <FormControl fullWidth margin="dense" size="small">
                          <InputLabel id="demo-simple-select-label">
                            Porte da empresa
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            required
                            value={typePort}
                            label="Porte da empresa"
                            onChange={(e) =>
                              onChangeTypePort(e.target.value as string)
                            }
                            error={typePortError !== " "}
                          >
                            <MenuItem value="">Selecione uma opção</MenuItem>
                            <MenuItem value="Microempreendedor Individual">
                              Microempreendedor Individual
                            </MenuItem>
                            <MenuItem value="Microempresa">
                              Microempresa
                            </MenuItem>
                            <MenuItem value="Pequena empresa">
                              Pequena empresa
                            </MenuItem>
                            <MenuItem value="Média empresa">
                              Média empresa
                            </MenuItem>
                            <MenuItem value="Grande empresa">
                              Grande empresa
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item lg={4} xl={4} xs={12}>
                        <TextField
                          margin="dense"
                          fullWidth
                          required
                          id="revenue"
                          label="Faturamento Anual - Igual ou superior"
                          size="small"
                          disabled
                          name="revenue"
                          value={formatCurrency(revenue)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider
                  sx={{
                    width: "100%",
                  }}
                />
                <Grid container mt={2}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Typography fontSize={14} variant="h1" mb={1}>
                      Estes dados não são compartilhados. Usaremos essa
                      informação para qualificarmos nossa indicação de
                      fornecedores.
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item lg={3} xl={3} xs={12}>
                        <FormControl fullWidth margin="dense" size="small">
                          <InputLabel id="demo-simple-select-label">
                            O que você vende?
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={typeSell}
                            label="O que você vende?"
                            required
                            onChange={(e) =>
                              onChangeTypeSell(e.target.value as ITypeSell)
                            }
                            error={typeSellError !== " "}
                          >
                            <MenuItem value="serviços">Serviços</MenuItem>
                            <MenuItem value="produtos">Produtos</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item lg={3} xl={3} xs={12}>
                        <Autocomplete
                          id="category"
                          options={categories !== undefined ? categories : []}
                          getOptionLabel={(value) => value.name}
                          loading={isLoadingCategories}
                          onChange={(event, newValue) =>
                            onChangeCategorySell(newValue)
                          }
                          value={categorySell}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Selecione sua categoria"
                              variant="outlined"
                              required
                              size="small"
                              margin="dense"
                              fullWidth
                              error={categorySellError !== " "}
                              helperText={categorySellError}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item lg={6} xl={6} xs={12}>
                        <Autocomplete
                          id="subcategory"
                          multiple
                          getOptionDisabled={(option) =>
                            subcategorySell.length ===
                              MAX_SELECTION_SUBCATEGORIES ||
                            subcategorySell.includes(option)
                              ? true
                              : false
                          }
                          options={
                            categorySell ? categorySell.subcategories : []
                          }
                          getOptionLabel={(value) => value.name}
                          loading={isLoadingCategories}
                          onChange={(event, newValue) =>
                            onChangeSubcategorySell(newValue)
                          }
                          value={subcategorySell || null}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Subcategorias (até 5 itens)"
                              variant="outlined"
                              size="small"
                              margin="dense"
                              fullWidth
                              error={subcategorySellError !== " "}
                              helperText={subcategorySellError}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item lg={3} xl={3} xs={12}>
                        <FormControl fullWidth margin="dense" size="small">
                          <InputLabel id="demo-simple-select-label">
                            O que você compra?
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={typeBuy}
                            label="O que você compra?"
                            required
                            onChange={(e) =>
                              onChangeTypeBuy(e.target.value as ITypeSell)
                            }
                            error={typeBuyError !== " "}
                          >
                            <MenuItem value="serviços">Serviços</MenuItem>
                            <MenuItem value="produtos">Produtos</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item lg={3} xl={3} xs={12}>
                        <Autocomplete
                          id="category"
                          options={categories !== undefined ? categories : []}
                          getOptionLabel={(value) => value.name}
                          loading={isLoadingCategories}
                          onChange={(event, newValue) =>
                            onChangeCategoryBuy(newValue)
                          }
                          value={categoryBuy}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Selecione sua categoria"
                              variant="outlined"
                              required
                              size="small"
                              margin="dense"
                              fullWidth
                              error={categoryBuyError !== " "}
                              helperText={categoryBuyError}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item lg={6} xl={6} xs={12}>
                        <Autocomplete
                          id="subcategory"
                          multiple
                          getOptionDisabled={(option) =>
                            subcategoryBuy.length ===
                              MAX_SELECTION_SUBCATEGORIES ||
                            subcategoryBuy.includes(option)
                              ? true
                              : false
                          }
                          options={categoryBuy ? categoryBuy.subcategories : []}
                          getOptionLabel={(value) => value.name}
                          loading={isLoadingCategories}
                          onChange={(event, newValue) =>
                            onChangeSubcategoryBuy(newValue)
                          }
                          value={subcategoryBuy || null}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Subcategorias (até 5 itens)"
                              variant="outlined"
                              size="small"
                              margin="dense"
                              fullWidth
                              error={subcategoryBuyError !== " "}
                              helperText={subcategoryBuyError}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider
                  sx={{
                    width: "100%",
                  }}
                />
                <Grid container mt={2}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Grid container spacing={2}>
                      <Grid item lg={4} xl={4} xs={12}>
                        <FormControl fullWidth margin="dense" size="small">
                          <InputLabel id="demo-simple-select-label">
                            Região de atendimento
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            required
                            value={serviceRegion}
                            label="Região de atendimento"
                            onChange={(e) =>
                              onChangeServiceRegion(e.target.value)
                            }
                            error={serviceRegionError !== " "}
                          >
                            <MenuItem value="" disabled>
                              Selecione uma região
                            </MenuItem>
                            <MenuItem value="Norte">Norte</MenuItem>
                            <MenuItem value="Nordeste">Nordeste</MenuItem>
                            <MenuItem value="Centro-Oeste">
                              Centro-Oeste
                            </MenuItem>
                            <MenuItem value="Sul">Sul</MenuItem>
                            <MenuItem value="Sudeste">Sudeste</MenuItem>
                            <MenuItem value="Região Metropolitana de Belém">
                              Região Metropolitana de Belém
                            </MenuItem>
                            <MenuItem value="Nordeste Paraense">
                              Nordeste Paraense
                            </MenuItem>
                            <MenuItem value="Sudeste Paraense">
                              Sudeste Paraense
                            </MenuItem>
                            <MenuItem value="Sul Paraense">
                              Sul Paraense
                            </MenuItem>
                            <MenuItem value="Baixo Amazonas">
                              Baixo Amazonas
                            </MenuItem>
                            <MenuItem value="Outros Estados">
                              Outros Estados
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item lg={4} xl={4} xs={12}>
                        <FormControl fullWidth margin="dense" size="small">
                          <InputLabel id="demo-simple-select-label">
                            Empresa (tipo)
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={typeEstablishment}
                            label="Empresa (tipo)"
                            required
                            onChange={(e) =>
                              onChangeTypeEstablishment(e.target.value)
                            }
                            error={typeEstablishmentError !== " "}
                          >
                            <MenuItem value="" disabled>
                              Selecione uma opção
                            </MenuItem>
                            <MenuItem value="Filial">Filial</MenuItem>
                            <MenuItem value="Matriz">Matriz</MenuItem>
                            <MenuItem value="Não tenho">Não tenho</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item lg={4} xl={4} xs={12}>
                        <TextField
                          margin="dense"
                          fullWidth
                          id="contact_name"
                          label="Nome do responsável"
                          size="small"
                          required
                          name="contact_name"
                          value={contactName}
                          error={contactNameError !== " "}
                          helperText={contactNameError}
                          onChange={(e) => onChangeContactName(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item lg={4} xl={4} xs={12}>
                        <TextField
                          margin="dense"
                          fullWidth
                          id="share_capital"
                          label="Capital social"
                          size="small"
                          required
                          name="share_capital"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                R$
                              </InputAdornment>
                            ),
                          }}
                          value={shareCapitalText}
                          error={shareCapitalError !== " "}
                          helperText={shareCapitalError}
                          onChange={(e) => onChangeShareCapital(e.target.value)}
                        />
                      </Grid>
                      <Grid item lg={4} xl={4} xs={12}>
                        <TextField
                          margin="dense"
                          fullWidth
                          id="average_revenue"
                          label="Média de faturamento anual"
                          size="small"
                          required
                          name="average_revenue"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                R$
                              </InputAdornment>
                            ),
                          }}
                          value={avarageRevenueText}
                          error={avarageRevenueError !== " "}
                          helperText={avarageRevenueError}
                          onChange={(e) =>
                            onChangeAvarageRevenue(e.target.value)
                          }
                        />
                      </Grid>

                      <Grid item lg={4} xl={4} xs={12}>
                        <TextField
                          margin="dense"
                          fullWidth
                          id="collaborators"
                          label="Número de colaboradores"
                          size="small"
                          required
                          name="collaborators"
                          type="number"
                          value={collaborators}
                          error={collaboratorsError !== " "}
                          helperText={collaboratorsError}
                          onChange={(e) =>
                            onChangeCollaborators(e.target.value)
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item lg={6} xl={6} xs={12}>
                        <TextField
                          id="outlined-multiline-static"
                          label="Principais clientes:"
                          variant="outlined"
                          multiline
                          required
                          rows={2}
                          size="small"
                          fullWidth
                          color="primary"
                          onChange={(e) => onChangeMainClient(e.target.value)}
                          value={mainClient}
                          error={mainClientError !== " "}
                          helperText={mainClientError}
                        />
                      </Grid>
                      <Grid item lg={6} xl={6} xs={12}>
                        <TextField
                          id="outlined-multiline-static"
                          label="Principais equipamentos:"
                          variant="outlined"
                          multiline
                          rows={2}
                          required
                          size="small"
                          fullWidth
                          color="primary"
                          onChange={(e) =>
                            onChangeMainEquipment(e.target.value)
                          }
                          value={mainEquipment}
                          error={mainEquipmentError !== " "}
                          helperText={mainEquipmentError}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item lg={12} xl={12} xs={12}>
                        <Typography
                          fontSize={14}
                          variant="h1"
                          fontWeight="700"
                          mt={2}
                        >
                          Redes sociais
                        </Typography>
                      </Grid>
                      <Grid item lg={3} xl={3} xs={12}>
                        <TextField
                          id="outlined-multiline-static"
                          label="Linkedin"
                          variant="outlined"
                          size="small"
                          fullWidth
                          color="primary"
                          onChange={(e) => onChangeLinkedin(e.target.value)}
                          value={linkedin}
                          error={linkedinError !== " "}
                          helperText={linkedinError}
                        />
                      </Grid>
                      <Grid item lg={3} xl={3} xs={12}>
                        <TextField
                          id="outlined-multiline-static"
                          label="Facebook"
                          variant="outlined"
                          size="small"
                          fullWidth
                          color="primary"
                          onChange={(e) => onChangeFacebook(e.target.value)}
                          value={facebook}
                          error={facebookError !== " "}
                          helperText={facebookError}
                        />
                      </Grid>
                      <Grid item lg={3} xl={3} xs={12}>
                        <TextField
                          id="outlined-multiline-static"
                          label="Instagram"
                          variant="outlined"
                          size="small"
                          fullWidth
                          color="primary"
                          onChange={(e) => onChangeInstagram(e.target.value)}
                          value={instagram}
                          error={instagramError !== " "}
                          helperText={instagramError}
                        />
                      </Grid>
                      <Grid item lg={3} xl={3} xs={12}>
                        <TextField
                          id="outlined-multiline-static"
                          label="Website"
                          variant="outlined"
                          size="small"
                          fullWidth
                          color="primary"
                          onChange={(e) =>
                            onChangeCompanyWebsite(e.target.value)
                          }
                          value={companyWebsite}
                          error={companyWebsiteError !== " "}
                          helperText={companyWebsiteError}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider
                  sx={{
                    width: "100%",
                  }}
                />
                <Grid container mt={2}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Grid container spacing={2}>
                      <Grid item lg={12} xl={12} xs={12}>
                        <Typography fontSize={14} variant="h1" fontWeight="700">
                          Endereço
                        </Typography>
                      </Grid>
                      <Grid item lg={2} xl={3} xs={12}>
                        <TextField
                          id="zipcode"
                          margin="dense"
                          label="CEP"
                          variant="outlined"
                          required
                          size="small"
                          InputProps={{
                            endAdornment: isFetchingZipCode ? (
                              <CircularProgress color="inherit" size={24} />
                            ) : null,
                          }}
                          disabled={isFetchingZipCode}
                          fullWidth
                          color="primary"
                          onChange={(e) => onChangeZipCode(e.target.value)}
                          value={maskZipCode(zipCode)}
                          error={zipCodeError !== " "}
                          helperText={zipCodeError}
                        />
                      </Grid>
                      <Grid item lg={8} xl={6} xs={12}>
                        <TextField
                          id="outlined-multiline-static"
                          margin="dense"
                          label="Logradouro"
                          variant="outlined"
                          required
                          size="small"
                          fullWidth
                          color="primary"
                          onChange={(e) => onChangeAddress(e.target.value)}
                          value={address}
                          error={addressError !== " "}
                          helperText={
                            addressError !== " "
                              ? addressError
                              : "Digite a rua, avenida ou similar"
                          }
                        />
                      </Grid>
                      <Grid item lg={2} xl={3} xs={12}>
                        <TextField
                          id="outlined-multiline-static"
                          label="Número"
                          margin="dense"
                          variant="outlined"
                          size="small"
                          fullWidth
                          required
                          type="tel"
                          color="primary"
                          onChange={(e) =>
                            onChangeAddressNumber(e.target.value)
                          }
                          value={addressNumber}
                          error={addressNumberError !== " "}
                          helperText={addressNumberError}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item lg={2} xl={3} xs={12}>
                        <TextField
                          id="uf"
                          margin="dense"
                          required
                          label="Estado (UF)"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            endAdornment: isFetchingZipCode ? (
                              <CircularProgress color="inherit" size={24} />
                            ) : null,
                          }}
                          disabled={isFetchingZipCode}
                          fullWidth
                          color="primary"
                          onChange={(e) => onChangeState(e.target.value)}
                          value={state}
                          error={stateError !== " "}
                          helperText={stateError}
                        />
                      </Grid>
                      <Grid item lg={2} xl={3} xs={12}>
                        <TextField
                          id="city"
                          margin="dense"
                          label="Município"
                          variant="outlined"
                          required
                          size="small"
                          fullWidth
                          color="primary"
                          onChange={(e) => onChangeCity(e.target.value)}
                          value={city}
                          error={cityError !== " "}
                          helperText={cityError}
                        />
                      </Grid>
                      <Grid item lg={4} xl={3} xs={12}>
                        <TextField
                          margin="dense"
                          id="region"
                          label="Bairro"
                          required
                          variant="outlined"
                          size="small"
                          fullWidth
                          color="primary"
                          onChange={(e) => onChangeDistrict(e.target.value)}
                          value={district}
                          error={districtError !== " "}
                          helperText={districtError}
                        />
                      </Grid>
                      <Grid item lg={4} xl={3} xs={12}>
                        <TextField
                          margin="dense"
                          id="complement"
                          label="Complemento"
                          required
                          variant="outlined"
                          size="small"
                          fullWidth
                          color="primary"
                          onChange={(e) => onChangeComplement(e.target.value)}
                          value={complement}
                          error={complementError !== " "}
                          helperText={complementError}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      display="flex"
                      alignItems="center"
                      justifyContent="end"
                    >
                      <Grid item lg={4} xl={3} xs={12}>
                        <Button
                          type="submit"
                          fullWidth
                          disabled={isRegistering || !validDocument}
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
                            `Avançar`
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            mt={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <img src={Logo} width="20%" alt="logo +Negócios" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RegisterCompany;
