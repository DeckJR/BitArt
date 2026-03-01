import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { Home } from './components/Home/Home'
import { PageNotFound } from './components/Home/PageNotFound'
import TableObjeto from './components/Objeto/TableObjeto'
import { ListObjeto } from './components/Objeto/ListObjeto'
import { DetailObjeto } from './components/Objeto/DetailObjeto'
import { ListSubastaActiva } from './components/Subasta/ListSubastaActiva'
import { ListSubastafinalizada } from './components/Subasta/ListSubastafinalizada'
import { DetailSubasta } from './components/Subasta/DetailSubasta'


const rutas = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      // Ruta principal
      { index: true, element: <Home /> },

      // Ruta comodín (404)
      { path: "*", element: <PageNotFound /> },
       //Rutas componentes
      {path:"objeto/table", element: <TableObjeto/>},
      {path:"objeto", element: <ListObjeto/>},
      {path:"objeto/detalle/:id", element: <DetailObjeto />},
      {path:"subasta/activa", element: <ListSubastaActiva />},     
      {path:"subasta/finalizada", element: <ListSubastafinalizada />},     
      {path:"subasta/detalle/:id", element: <DetailSubasta />}


    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={rutas} />
  </StrictMode>,
)
