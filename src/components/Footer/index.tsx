import React from "react"
import useStyles from "./styles"
import { Link } from "../Link"
import { Break } from "../Break"

export const Footer: React.FC = () => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.spacer} />
      <Break type="thin" />
      <footer className={classes.container}>
        <span>
          Built with ❤️ by <Link href="https://sequence.xyz">Sequence</Link>
        </span>
        <Link href="https://horizon.io">Horizon</Link>
      </footer>
    </>
  )
}
