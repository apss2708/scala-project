import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from '@/pages/dashboard'
import Authentication from '@/pages/authentication'
import PrivacyPolicy from '@/pages/privacy-policy'
import TermsOfService from '@/pages/terms-of-service'
import RefundPolicy from '@/pages/refund-policy'
import Page404 from '@/pages/404'
import Evidence from '@/pages/evidence'
import Echo from '@/pages/echo'
import Mosaic from '@/pages/mosaic'
import Timeglass from '@/pages/timeglass'
import Chatbot from '@/pages/chatbot'
import Reports from '@/pages/reports'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    errorElement: <Page404 />,
  },
  {
    path: '/login',
    element: <Authentication />,
  },
  {
    path '/register',
    element: <Authentication />,
  },
  {
    path '/reset-password',
    element: <Authentication />,
  },
  {
    path '/privacy-policy',
    element: <PrivacyPolicy />,
  },
  {
    path '/terms-of-service',
    element: <TermsOfService />,
  },
  {
    path '/refund-policy',
    element: <RefundPolicy />,
  },
  {
    path '/evidence',
    element: <Evidence />,
    errorElement: <Page404 />,
  },
  {
    path '/echo',
    element: <Echo />,
    errorElement: <Page404 />,
  },
  {
    path '/mosaic',
    element: <Mosaic />,
    errorElement: <Page404 />,
  },
  {
    path '/timeglass',
    element: <Timeglass />,
    errorElement: <Page404 />,
  },
  {
    path '/chatbot',
    element: <Chatbot />,
    errorElement: <Page404 />,
  },
  {
    path '/reports',
    element: <Reports />,
    errorElement: <Page404 />,
  },
  {
    path '*',
    element: <Page404 />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App