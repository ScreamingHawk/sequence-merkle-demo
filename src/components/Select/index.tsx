import React from "react"
import { useTheme } from "react-jss"
import { ThemeProps } from "../../providers/ThemeProvider"
import useStyles from "./styles"

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  extraClassName?: string
}

export const Select: React.FC<SelectProps> = ({
  extraClassName,
  disabled,
  ...props
}) => {
  const theme = useTheme<ThemeProps>()
  const classes = useStyles(theme)

  let className = classes.select

  if (extraClassName) {
    className += ` ${extraClassName}`
  }
  if (disabled) {
    className += ` ${classes.disabled}`
  }

  return <select className={className} {...props}></select>
}
