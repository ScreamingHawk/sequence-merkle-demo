import React from "react"
import { useTheme } from "react-jss"
import { Link as RouterLink } from "react-router-dom"
import { ThemeProps } from "../../providers/ThemeProvider"
import useStyles from "./styles"

type LinkProps = {
  type?: "button"
  useRouter?: boolean
  href: string
}

export const Link: React.FC<React.PropsWithChildren<LinkProps>> = ({
  type,
  useRouter = false,
  href,
  children,
}) => {
  const theme = useTheme<ThemeProps>()
  const classes = useStyles(theme)
  const className = type === "button" ? classes.button : classes.link

  if (useRouter) {
    return (
      <RouterLink to={href} className={className}>
        {children}
      </RouterLink>
    )
  }

  return (
    <a className={className} href={href}>
      {children}
    </a>
  )
}
