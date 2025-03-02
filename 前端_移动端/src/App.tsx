import { useRoutes } from 'react-router-dom'
import routes from './router/index.tsx'
import './App.css' //存放全局样式

function App() {
  let element = useRoutes(routes)

  return (
    <>
      {element}
    </>
  )
}

export default App
