import { createUseStyles } from "react-jss"
import { buttonStyle } from "../Button/styles"

const selectStyle = {
  ...buttonStyle,
  margin: "1em 0",
  padding: "1em !important",
}

export default createUseStyles({
  select: selectStyle,
  disabled: {
    opacity: 0.5,
    cursor: "default",
  },
})
