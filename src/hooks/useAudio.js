import { useState, useCallback, useEffect, useRef } from "react";
const useAudio = ({
    src,
    preload = true,
    autoplay = false,
    volume = 0.5,
    mute = false,
    loop = false,
    rate = 1.0,
}) => {
    const [audio, setAudio] = useState(undefined);
    const [audioReady, setAudioReady] = useState(false);
    const [audioLoading, setAudioLoading] = useState(true);
    const [audioError, setAudioError] = useState("");
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [audioPaused, setAudioPaused] = useState(false);
    const [audioDuration, setAudioDuration] = useState(0);
    const [audioMute, setAudioMute] = useState(false);
    const [audioLoop, setAudioLoop] = useState(false);
    const [audioVolume, setAudioVolume] = useState(volume);
    const [audioSeek, setAudioSeek] = useState(rate);
    const [audioRate, setAudioRate] = useState(0);

    const audioSeekRef = useRef();

    const newAudio = useCallback(
        ({
            src,
            autoplay = false,
            volume = 0.5,
            mute = false,
            loop = false,
            rate = 1.0,
        }) => {
            const audioElement = new Audio(src);
            audioElement.autoplay = autoplay;
            audioElement.volume = volume;
            audioElement.muted = mute;
            audioElement.loop = loop;
            audioElement.playbackRate = rate;
            return audioElement;
        },
        []
    );

    const load = useCallback(
        ({ src, preload, autoplay, volume, mute, loop, rate }) => {
            const newAudioElement = newAudio({
                src,
                preload,
                autoplay,
                volume,
                mute,
                loop,
                rate,
            });
            newAudioElement.addEventListener("abort", () =>
                setAudioError("Error!")
            );
            newAudioElement.addEventListener("error", () =>
                setAudioError("Error!")
            );
            newAudioElement.addEventListener("loadeddata", () => {
                if (autoplay) {
                    setAudioLoading(false);
                    setAudioReady(true);
                    setAudioDuration(newAudioElement.duration);
                    setAudioMute(mute);
                    setAudioLoop(loop);
                    setAudioPlaying(true);
                } else {
                    setAudioLoading(false);
                    setAudioReady(true);
                    setAudioDuration(newAudioElement.duration);
                    setAudioMute(mute);
                    setAudioLoop(loop);
                }
            });
            newAudioElement.addEventListener("play", () => {
                setAudioPlaying(true);
                setAudioPaused(false);
            });
            newAudioElement.addEventListener("pause", () => {
                setAudioPlaying(false);
                setAudioPaused(true);
            });
            newAudioElement.addEventListener("ended", () => {
                setAudioPlaying(false);
                setAudioPaused(false);
                setAudioSeek(0);
                setAudioLoading(false);
                setAudioError("");
            });
            setAudio(newAudioElement);
        },
        [newAudio]
    );

    useEffect(() => {
        if (!src) return;
        if (!preload) return;
        load({ src, autoplay, volume, mute, loop, rate });
    }, [src, preload, autoplay, volume, mute, loop, rate, load]);

    const onToggle = () => {
        if (!audio) return;
        if (audioReady) audio.play();
        if (audioPlaying) audio.pause();
    };

    const onPlay = () => {
        if (!audio) return;
        audio.play();
    };
    const onPause = () => {
        if (!audio) return;
        audio.pause();
    };

    const onMute = () => {
        if (!audio) return;
        audio.muted = !audioMute;
        setAudioMute(!audioMute);
    };
    const onLoop = () => {
        if (!audio) return;
        audio.loop = !audioLoop;
        setAudioLoop(!audioLoop);
    };

    const onVolume = (e) => {
        if (!audio) return;
        const volume = parseFloat(e.target.value);
        setAudioVolume(volume);
        audio.volume = volume;
    };
    const onRate = (e) => {
        if (!audio) return;
        const rate = parseFloat(e.target.value);
        setAudioRate(rate);
        audio.playbackRate = rate;
    };
    const onSeek = (e) => {
        if (!audio) return;
        const seek = parseFloat(e.target.value);
        setAudioSeek(seek);
        audio.currentTime = seek;
    };

    useEffect(() => {
        const animate = () => {
            const seek = audio?.currentTime;
            setAudioSeek(seek);
            audioSeekRef.current = requestAnimationFrame(animate);
        };
        if (audio && audioPlaying) {
            audioSeekRef.current = requestAnimationFrame(animate);
        }
        return () => {
            if (audioSeekRef.current) {
                window.cancelAnimationFrame(audioSeekRef.current);
            }
        };
    }, [audio, audioPlaying, audioPaused]);

    return {
        ready: audioReady,
        loading: audioLoading,
        error: audioError,
        playing: audioPlaying,
        paused: audioPaused,
        duration: audioDuration,
        mute: audioMute,
        loop: audioLoop,
        volume: audioVolume,
        seek: audioSeek,
        rate: audioRate,
        onToggle,
        onPlay,
        onPause,
        onMute,
        onLoop,
        onVolume,
        onRate,
        onSeek,
    };
};
export default useAudio;
