import React from "react"
import { useTheme } from "react-jss"
import { ThemeProps } from "../../providers/ThemeProvider"
import useStyles from "./styles"

type AccentProps = {
  loud?: boolean
  extraClassName?: string
}

export const Accent: React.FC<React.PropsWithChildren<AccentProps>> = ({
  loud = false,
  extraClassName,
  children,
}) => {
  const theme = useTheme<ThemeProps>()
  const classes = useStyles(theme)
  let className = loud ? classes.loud : classes.accent
  if (extraClassName) {
    className += ` ${extraClassName}`
  }
  return <span className={className}>{children}</span>
}
