import React from "react"
import useStyles from "./styles"
import { ThemeProps } from "../../providers/ThemeProvider"
import { useTheme } from "react-jss"

type BreakProps = {
  type?: "thin" | "normal"
}

export const Break: React.FC<BreakProps> = ({ type = "normal" }) => {
  const theme = useTheme<ThemeProps>()
  const classes = useStyles(theme)

  let className = classes.container
  if (type === "thin") {
    className += ` ${classes.thin}`
  }
  return (
    <div className={className}>
    </div>
  )
}
