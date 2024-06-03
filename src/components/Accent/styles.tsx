import { createUseStyles } from "react-jss"
import { ThemeProps } from "../../providers/ThemeProvider"

export default createUseStyles({
  accent: {
    fontWeight: "bold",
    color: (theme: ThemeProps) => theme.colors.lowlight,
  },
  loud: {
    fontWeight: "bolder",
    color: (theme: ThemeProps) => theme.colors.highlight,
  },
})
