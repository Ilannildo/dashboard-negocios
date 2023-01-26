import { Link } from "react-router-dom";

// material-ui
import { ButtonBase } from "@mui/material";
import {
  default as LogoDark,
  default as LogoWhite,
} from "../../assets/logo/logo.png";
import config from "../../config";
// ==============================|| MAIN LOGO ||============================== //

interface ILogoSection {
  dark?: boolean;
  mini?: boolean;
}

const LogoSection = ({ dark = false, mini = false }: ILogoSection) => (
  <ButtonBase disableRipple component={Link} to={config.defaultPath}>
    {mini ? (
      <img
        src={dark === true ? LogoDark : LogoWhite}
        width="200"
        alt="Logo + Negócios"
        draggable="false"
      />
    ) : (
      <img
        src={dark === true ? LogoDark : LogoWhite}
        width="200"
        alt="Logo + Negócios"
        draggable="false"
      />
    )}
  </ButtonBase>
);

export default LogoSection;
