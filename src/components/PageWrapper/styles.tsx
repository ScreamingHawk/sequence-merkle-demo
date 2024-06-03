import { createUseStyles } from "react-jss"

export const wrapperContainerWidth = 920

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: `${wrapperContainerWidth}px`,
    margin: "auto",
    flex: 1,
  },
}

export default createUseStyles(styles)
