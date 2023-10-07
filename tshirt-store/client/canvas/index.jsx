import { Canvas } from '@react-three/fiber'
import { Environment, Center, PivotControls, OrbitControls} from '@react-three/drei';

import Shirt from './shirt';
import Backdrop from './backdrop';
//import CameraRig from './camerarig';

const CanvasModel = () => {
  return (
    <Canvas
    shadows
      camera={{position:[0,0,0.5],fov:80}}
    >
      <ambientLight intensity={0.4} />
      <Environment preset="city" />
      {/* <OrbitControls/> */}
       <Backdrop/> 
        <Center>
          <Shirt />
        </Center>
        
    </Canvas>
  )
}

export default CanvasModel


