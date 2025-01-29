import AnimatedOutlet from "@layout/AnimatedOutlet";
import Modal from "@components/Modal";
import '@/App.scss'

import HowerMicPlayer from "@components/HowerMicPlayer";


function App() {
  return (
    <>
      <AnimatedOutlet />
      <Modal></Modal>
      <HowerMicPlayer></HowerMicPlayer>
    </>
  )
}
export default App
