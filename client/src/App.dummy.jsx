import Gauge from 'UI/Gauge';
import { ParentSize } from '@visx/responsive';

function App() {
  return (
    <div className="App">
      <div
        style={{
          height: '100vh',
          minWidth: '200px',
          maxWidth: '600px',
        }}
      >
        <ParentSize>
          {({ width, height }) => <Gauge width={width} height={height} value={100} />}
        </ParentSize>
      </div>
    </div>
  );
}

export default App;
