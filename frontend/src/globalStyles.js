import { createGlobalStyle } from 'styled-components';

//to jest przykład
const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
        padding: 0;
        background: teal;
        font-family: Open-Sans, Helvetica, Sans-Serif; 
    }
`;

export default GlobalStyle;