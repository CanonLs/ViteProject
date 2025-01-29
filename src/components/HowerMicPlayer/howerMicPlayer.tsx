import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ReactHowler from "react-howler";
import { getUserAgent } from "@utils/utils";

import styles from "./index.module.scss";
import micOn from "@assets/micOn.png";
import micOff from "@assets/micOff.png";
import bgMic from "@assets/audios/bgMic.mp3";

interface IProps {
	refs: React.Ref<HTMLAudioElement>;
}

const HowerMicPlayer = () => {
	const AniRefBox = useRef<HTMLDivElement | null>(null);
	const AudioRef: any = useRef(null);
	const AniRef: any = useRef(null);
	const [audioPlay, setAudioPlay] = useState(true);
	useGSAP(
		() => {
			AniRef.current = gsap.to(AniRefBox.current, { rotate: 360, duration: 2, repeat: -1, ease: "linear", paused: false });
		},
		{ scope: AniRefBox }
	);
	useEffect(() => {
		AudioLoaded();
	}, []);
	useEffect(() => {
		const playOrPause = audioPlay ? "play" : "pause";
		AniRef.current[playOrPause]();
		AudioRef.current[playOrPause]();
	}, [audioPlay]);

	const AudioLoaded = () => {
		window.WeixinJSBridge && window.WeixinJSBridge.invoke("getNetworkType", {}, () => AudioRef.current["play"](), false);
	};
	return (
		<>
			<div
				className={styles.howerMicPlayer}
				ref={AniRefBox}
				onClick={() => setAudioPlay(!audioPlay)}
				style={{
					backgroundSize: "100% 100%",
					backgroundImage: `url(${audioPlay ? micOn : micOff})`,
				}}>
				{getUserAgent() == "Android" ? <AndroidAudioCop refs={AudioRef} /> : <IosAudioCop refs={AudioRef} />}
			</div>
		</>
	);
};

const IosAudioCop = ({ refs }: IProps) => {
	return <audio ref={refs} src={bgMic} loop></audio>;
};
const AndroidAudioCop = ({ refs }: IProps) => {
	return (
		<ReactHowler ref={refs} src={bgMic} playing={true} preload={true} html5={false}
			// onLoad={AudioLoaded}
			// onPlay={() => setAudioPlay(true)}
			onLoadError={() => console.log("加载出现问题")} onPlayError={() => console.log("播放出现问题")} />
	);
};
export default HowerMicPlayer;
