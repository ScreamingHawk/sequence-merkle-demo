import { createUseStyles } from "react-jss"

export default createUseStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1em",
    width: "100%",
    boxSizing: "border-box",
    fontSize: "0.8em",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    gap: "1em",
  },
  logo: {
    fontSize: "1.5em",
    textDecoration: "none",
  },
  smallText: {
    fontSize: "0.8em",
  },
})
