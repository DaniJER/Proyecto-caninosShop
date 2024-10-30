'use client';

import { createTheme } from "@mui/material";
import typography from "./typography";

const themeOptions = {
    typography,

}

const theme = createTheme(themeOptions);

export default theme;
