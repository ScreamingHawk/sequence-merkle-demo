import React from "react"
import { useTheme } from "react-jss"
import { ThemeProps } from "../../providers/ThemeProvider"
import useStyles from "./styles"

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  extraClassName?: string
}

export const Button: React.FC<ButtonProps> = ({
  extraClassName,
  disabled,
  ...props
}) => {
  const theme = useTheme<ThemeProps>()
  const classes = useStyles(theme)

  let className = classes.button

  if (extraClassName) {
    className += ` ${extraClassName}`
  }
  if (disabled) {
    className += ` ${classes.disabled}`
  }

  return <button className={className} {...props}></button>
}
