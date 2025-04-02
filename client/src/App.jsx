import Gantt from './components/Gantt'
import data from './services/data'


function App() {

  return <Gantt task={data()} />
}

export default App
