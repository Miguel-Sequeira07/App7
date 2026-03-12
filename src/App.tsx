import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Menu from './Component/Menu'
import Home from './Component/Home'
import Animais from './Component/Animais'
import Exercicios from './Component/Exercicios'

const App = () => {
  const rotas = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Menu/>}>
        <Route index element={<Home/>}></Route>
        <Route path="/animais" element={<Animais/>}></Route>
        <Route path="/exercicios/:id" element={<Exercicios/>}></Route>
      </Route>
    )
  )
  return (
    <RouterProvider router={rotas}/>
    
  )
}

export default App
