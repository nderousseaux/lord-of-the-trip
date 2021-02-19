import CanvasExample from './canvas/canvasExample'
import CanvasStatic from './canvas/canvasStatic'
import CanvasClick from './canvas/canvasClick'

// Liens Canvas
// https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutoriel_canvas/Utilisation_d'images
// https://developer.mozilla.org/fr/docs/Apprendre/JavaScript/Client-side_web_APIs/Drawing_graphics
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

const App = () => {

  return <div>
    <h1>Lord of the trips</h1>
    { /* <CanvasExample /> */ }
    { /* <CanvasStatic /> */ }
    <CanvasClick />
  </div>
};

export default App;
