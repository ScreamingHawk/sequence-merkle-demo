import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { PageWrapper } from "../components/PageWrapper"
import { AdminPage } from "./Admin"
import { HomePage } from "./Home"
import { MintPage } from "./Mint"

const wrapped = (element: React.ReactNode) => (
  <PageWrapper>{element}</PageWrapper>
)

const router = createBrowserRouter([
  {
    path: "/",
    element: wrapped(<HomePage />),
  },
  {
    path: "/admin",
    element: wrapped(<AdminPage />),
  },
  {
    path: "/mint",
    element: wrapped(<MintPage />),
  },
])

export const Router: React.FC = () => {
  return <RouterProvider router={router} />
}
