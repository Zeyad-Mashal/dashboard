import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';

const ButtonDropDown = styled(Button)(
    ({theme}) => `
    height: 36.5px;
    border-radius: .5em;
    border-color: ${theme.palette.divider};
    font-size: 12px
`)
export default ButtonDropDown;






