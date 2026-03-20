import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { Home } from './components/Home/Home'
import { PageNotFound } from './components/Home/PageNotFound'
import TableObjeto from './components/Objeto/TableObjeto'
import { ListObjeto } from './components/Objeto/ListObjeto'
import TablePuja from './components/Puja/TablePuja'
import TableUsuario from './components/Usuario/TableUsuario'
import TableSubastaByObjeto from './components/Subasta/TablesSubastaByObjeto'
import TableSubasta from './components/Subasta/TableSubasta'
import { DetailObjeto } from './components/Objeto/DetailObjeto'
import { ListSubastaActiva } from './components/Subasta/ListSubastaActiva'
import { ListSubastafinalizada } from './components/Subasta/ListSubastafinalizada'
import { DetailSubasta } from './components/Subasta/DetailSubasta'
import { DetailUsuario } from './components/Usuario/DetailUsuario'
import { CreateUsuario } from './components/Usuario/CreateUsuario'
import { CreateObjeto } from './components/Objeto/CreateObjeto'
import { UpdateObjeto } from './components/Objeto/UpdateObjeto'
import { UpdateUsuario} from './components/Usuario/UpdateUsuario'
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
      {path:"objeto/detalle/:id", element: <DetailObjeto />},
      {path:"subasta/activa", element: <ListSubastaActiva />},     
      {path:"subasta/finalizada", element: <ListSubastafinalizada />},
      {path:"objeto/list", element: <ListObjeto />},  
      {path:"subasta/detalle/:id", element: <DetailSubasta />},
      {path:"puja/detalle/:id", element: <TablePuja/>},
      {path:"usuario/table", element: <TableUsuario/>},
      {path:"subasta/objeto/:id", element: <TableSubastaByObjeto/>},
      {path:"usuario/detalle/:id", element: <DetailUsuario />},
      {path:"usuario/create/", element: <CreateUsuario />},
      {path:"objeto/create/", element: <CreateObjeto />},
      {path:"objeto/update/:id", element: <UpdateObjeto />},      
      {path:"usuario/update/:id", element: <UpdateUsuario />},
      {path:"subasta/table", element: <TableSubasta/>},
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={rutas} />
  </StrictMode>,
)
