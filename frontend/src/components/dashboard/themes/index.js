'use client';

import { createTheme } from "@mui/material";
import typography from "./typography";
import palette from "./palette";
import shadows from "./shadows";
import customShadows from "./customShadows";

const themeOptions = {
    typography,
    palette,
    shadows: shadows(),
    customShadows: customShadows(),
    shape: { borderRadius: 6 },
}

const theme = createTheme(themeOptions);

export default theme;
