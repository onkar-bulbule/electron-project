import { useState } from "react";
import RecorderControls from "./components/RecorderControls";
import RecordingsList from "./components/RecordingsList";
import useRecorder from "./hooks/useRecorder";
import "./styles/App.css";

export default function App() {
    const { recorderState, ...handlers } = useRecorder();
    const [currentTab, setCurrentTab] = useState("voice-recorder");
    console.log(recorderState.audios);
    console.log('Ths is from app');

    const onNavClick = (e) => {
        setCurrentTab(e.target.id);
    };

    return (
        <section>
            <nav onClick={onNavClick}>
                <div id="voice-recorder" className={`tab-header ${currentTab === 'voice-recorder' ? "active" : ""}`}>
                    Voice Recorder
                </div>
                <div id="prev-recordings" className={`tab-header ${currentTab === 'prev-recordings' ? "active" : ""}`}>
                    My Previous Recordings
                </div>
            </nav>
            <div className="container-wrap">
            {currentTab === "voice-recorder" && (
                <div className="recorder-container">
                    <RecorderControls
                        recorderState={recorderState}
                        handlers={handlers}
                    />
                </div>
            )}
            {currentTab === "prev-recordings" && (
                <div className="previous-records-container">
                    <RecordingsList recorderState={recorderState} handlers={handlers} />
                </div>
            )}</div>
        </section>
    );
}
