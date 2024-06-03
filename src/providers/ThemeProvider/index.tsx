import React from "react"
import { ThemeProvider as JSSThemeProvider } from "react-jss"

const theme = {
  colors: {
    primary: "#B3BB8Aff",
    secondary: "#868871ff",
    accent: "#95A542ff",
    highlight: "#B3BB8Aff",
    lowlight: "#95A542ff",
    background: "#FDFEF9ff",
    lightBackground: "#EDEFDCff",
  },
}

export type ThemeProps = typeof theme

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => <JSSThemeProvider theme={theme}>{children}</JSSThemeProvider>
