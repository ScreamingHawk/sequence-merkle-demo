import React from "react"
import useStyles from "./styles"

export const H1: React.FC<React.PropsWithChildren> = ({ children }) => {
  const classes = useStyles()
  return <h1 className={classes.h1}>{children}</h1>
}

export const H2: React.FC<React.PropsWithChildren> = ({ children }) => {
  const classes = useStyles()
  return <h2 className={classes.h2}>{children}</h2>
}
