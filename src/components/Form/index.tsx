import React from "react"
import useStyles from "./styles"
import { Button, ButtonProps } from "../Button"

export const Form: React.FC<React.FormHTMLAttributes<HTMLFormElement>> = ({
  children,
  ...props
}) => {
  const classes = useStyles()

  return (
    <form className={classes.container} {...props}>
      {children}
    </form>
  )
}

type FormLabelProps = {
  suffix?: "suffixETH" | "suffixGwei"
}

export const FormLabel: React.FC<React.PropsWithChildren<FormLabelProps>> = ({
  suffix,
  children,
}) => {
  const classes = useStyles()

  let className = classes.element

  if (suffix) {
    className += ` ${classes[suffix]}`
  }

  return <label className={className}>{children}</label>
}

export const FormButton: React.FC<ButtonProps> = ({
  extraClassName,
  ...props
}) => {
  const classes = useStyles()

  if (extraClassName) {
    // Wrap form class
    extraClassName = `${classes.button} ${extraClassName}`
  } else {
    extraClassName = classes.button
  }

  return <Button extraClassName={extraClassName} {...props}></Button>
}
