import { createUseStyles } from "react-jss"
import { ThemeProps } from "../../providers/ThemeProvider"

export default createUseStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: "2em",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "1em",
  },
  img: {
    width: "100%",
    objectFit: "cover",
  },
  accent: {
    fontWeight: "bold",
    color: (theme: ThemeProps) => theme.colors.accent,
  },
})
