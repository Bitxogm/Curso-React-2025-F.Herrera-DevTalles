import { createBrowserRouter, Navigate } from "react-router";
import { lazy } from "react";

import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
import { HomePage } from "@/heroes/pages/home/HomePage";

const SearchPage = lazy(() => import("@/heroes/pages/search/SearchPage"));
const AdminPage = lazy(() => import("@/admin/pages/AdminPage"));
const HeroPage = lazy(() => import("@/heroes/pages/hero/HeroPage"));

export const appRouter: ReturnType<typeof createBrowserRouter> = createBrowserRouter([

  {
    path: '/',
    element: <HeroesLayout />,
    children: [

      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'heroes/:idSlug',
        element: <HeroPage />
      },
      {
        path: 'search',
        element: <SearchPage />
      },
      {
        path: '*',
        element: <Navigate to="/" />
      }

    ],
  },

  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />
      }
    ]
  },


])