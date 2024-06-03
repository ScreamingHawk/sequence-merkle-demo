import { createUseStyles } from "react-jss"
import { wrapperContainerWidth } from "../PageWrapper/styles"

export default createUseStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "1em",
    width: "100%",
    maxWidth: `${wrapperContainerWidth}px`,
    margin: "auto",
    fontSize: "0.75em",
  },
  spacer: {
    marginTop: "2.5em",
  },
})
