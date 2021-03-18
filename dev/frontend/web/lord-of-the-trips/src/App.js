import CanvasExample from './canvas/canvasExample'
import CanvasStatic from './canvas/canvasStatic'
import CanvasClick from './canvas/canvasClick'

import KonvaExample from './konva/konvaExample'
import Konva from './konva/konva'

// Image
// https://www.encyclopedie-hp.org/wp-content/uploads/sites/4/2014/07/poudlard-valentin.jpg

const App = () => {

  return <div>
    <h1>Lord of the trips</h1>
    { /* <CanvasExample /> */ }
    { /* <CanvasStatic /> */ }
    { /* <CanvasClick /> */ }

    { /* <KonvaExample /> */ }
    <Konva />
  </div>
};

export default App;
