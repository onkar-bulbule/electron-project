import useAudio from "../hooks/useAudio.js";

export default function RecordPlayer({ src, inPreview, saveRecording, deleteAudio }) {
    const {
        ready,
        loading,
        error,
        playing,
        paused,
        duration,
        mute,
        loop,
        volume,
        seek,
        rate,
        onToggle,
        onPlay,
        onPause,
        onMute,
        onLoop,
        onVolume,
        onRate,
        onSeek,
    } = useAudio({
        src,
        preload: true,
        autoplay: false,
        volume: 0.5,
        mute: false,
        loop: false,
        rate: 1.0,
    });
    return (
        <div>
            <button onClick={onToggle}>Toggle</button>
            <button onClick={onPlay}>Play</button>
            <button onClick={onPause}>Pause</button>

            <div>
                <label>Seek: </label>
                <input
                    type="range"
                    min={0}
                    max={duration}
                    value={seek}
                    step={0.1}
                    onChange={onSeek}
                />
            </div>
            <div>
                <label>Volume: </label>
                <input
                    type="range"
                    min={0}
                    max={1}
                    value={volume}
                    step={0.1}
                    onChange={onVolume}
                />
            </div>
            <div>
                <label>Rate: </label>
                <input
                    type="range"
                    min={0.25}
                    max={5.0}
                    value={rate}
                    step={0.1}
                    onChange={onRate}
                />
            </div>
            {inPreview ? (
                <div>
                    <button onClick={saveRecording}>Save</button>
                </div>
            ) : (
                <button onClick={deleteAudio}>Delete</button>
            )}
        </div>
    );
}
