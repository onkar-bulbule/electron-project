import { formatMinutes, formatSeconds } from "../utils/format-time";
import "../styles/RecorderControls.css";
import RecordPlayer from "../components/RecordPlayer";

export default function RecorderControls({ recorderState, handlers }) {
    const { recordingMinutes, recordingSeconds, initRecording, currentAudio } =
        recorderState;
    const { startRecording, cancelRecording, pauseRecording, stopRecording, saveRecording } =
        handlers;

    return (
        <>
            <div className="controls-container">
                <div className="recorder-display">
                    <div className="recording-time">
                        {initRecording && (
                            <div className="recording-indicator"></div>
                        )}
                        <span>{formatMinutes(recordingMinutes)}</span>
                        <span>:</span>
                        <span>{formatSeconds(recordingSeconds)}</span>
                    </div>
                    <div className="recorder-controls">
                        <button
                            className="recorder-control"
                            title="Start recording"
                            onClick={startRecording}
                        >
                            Start
                        </button>
                        <button
                            className="recorder-control"
                            title="Pause recording"
                            onClick={pauseRecording}
                        >
                            Pause
                        </button>
                        <button
                            className="recorder-control"
                            title="Stop recording"
                            onClick={stopRecording}
                        >
                            Stop
                        </button>
                    </div>
                </div>
            </div>

            <RecordPlayer src={currentAudio} saveRecording={saveRecording} inPreview={true}/>
        </>
    );
}
