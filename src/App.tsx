import AnimatedOutlet from "@layout/AnimatedOutlet";
import Modal from "@components/Modal";
import '@/App.scss'

import HowerMicPlayer from "@components/HowerMicPlayer";
import { usePrevious } from "@hooks/index";



function App() {
  // const prev = usePrevious();
  // console.log(prev);

  return (
    <>
      <AnimatedOutlet />
      <Modal></Modal>
      <HowerMicPlayer></HowerMicPlayer>
    </>
  )
}
export default App
