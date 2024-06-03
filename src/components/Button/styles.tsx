import { createUseStyles } from "react-jss"
import { buttonStyle as linkButtonStyle } from "../Link/styles"

// Re-export buttonStyle
const buttonStyle = {
  ...linkButtonStyle,
  margin: "1em 0",
  padding: "1em !important",
}
export { buttonStyle }

export default createUseStyles({
  button: buttonStyle,
  disabled: {
    opacity: 0.5,
    cursor: "default",
  },
})
