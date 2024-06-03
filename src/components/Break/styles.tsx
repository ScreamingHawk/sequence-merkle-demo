import { createUseStyles } from "react-jss"
import { ThemeProps } from "../../providers/ThemeProvider"

export default createUseStyles({
  container: {
    display: "block",
    margin: "0.5em auto",
    maxWidth: "100%",
    backgroundColor: (theme: ThemeProps) => theme.colors.accent,
  },
  thin: {
    maxHeight: "50px",
    overflow: "hidden",
  },
  inner: {
    width: "100%",
    maxWidth: "100%",
    objectFit: "cover",
  },
})
