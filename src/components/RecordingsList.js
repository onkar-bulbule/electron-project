import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrashAlt,
    faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
// import useRecordingsList from "../hooks/use-recordings-list";
import "../styles/RecordingsList.css";
import RecordPlayer from "../components/RecordPlayer";

export default function RecordingsList({ recorderState, handlers }) {
    const { deleteAudio } = handlers;

    // const { recordings, deleteAudio } = useRecordingsList(recorderState.audios);
    const audios = recorderState.audios;
    // useEffect(() => {
    //     (async () => {
    //         let fileNames = await window.electronAPI.getAllFilenames();
    //         setRecordings(fileNames.split(","));
    //     })();
    // }, []);

    return (
        <>
            <div className="recordings-container">
                {(recorderState.audios || []).length > 0 ? (
                    <>
                        <h1>Your recordings</h1>
                        <div className="recordings-list">
                            {recorderState.audios.map((record) => (
                                <RecordPlayer
                                    key={record.key}
                                    src={record.audio}
                                    deleteAudio={() => deleteAudio(record.key)}
                                />
                            ))}

                            {/* {recordings.map((recording) => (
                                <div>
                                    <span>{recording}</span>
                                    <button
                                        onClick={async () => {
                                            let song =
                                                await window.electronAPI.getSongURL(
                                                    recording
                                                );
                                            const song2 = new Blob([song], { type: "audio/ogg; codecs=opus" });
                                            setCurrentAudio(song2);
                                        }}
                                    >
                                        Play
                                    </button>
                                </div>
                            ))} */}
                        </div>
                    </>
                ) : (
                    <div className="no-records">
                        <FontAwesomeIcon
                            icon={faExclamationCircle}
                            size="2x"
                            color="#f2ea02"
                        />
                        <span>You don't have records</span>
                    </div>
                )}
            </div>
            {/* <RecordPlayer src={currentAudio} /> */}
        </>
    );
}
