import { createUseStyles } from "react-jss"
import { ThemeProps } from "../../providers/ThemeProvider"

export default createUseStyles({
  pageButtons: {
    display: "flex",
    gap: "1em",
  },
  note: {
    backgroundColor: (theme: ThemeProps) => theme.colors.lightBackground,
    fontSize: "0.5em",
    padding: "0.5em",
    marginBottom: "1em",
  },
})
