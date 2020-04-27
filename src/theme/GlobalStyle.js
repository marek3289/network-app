import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html {
        background-color: hsl(228, 56%, 98%);
        font-size: 62.5%;
    }

    body {
        font-size: 1.6rem;
        font-family: 'Montserrat', sans-serif;
        overflow-y: scroll;
    }

    button {
        border-color: transparent;
    }

    button::-moz-focus-inner {
        border: 0;
    }
`;

export default GlobalStyle;
