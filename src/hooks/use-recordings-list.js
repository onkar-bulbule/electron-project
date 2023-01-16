import { useState, useEffect } from "react";
import { deleteAudio } from "../utils/recordings-list";

export default async function useRecordingsList() {
    const [recordings, setRecordings] = useState([]);
    
    // useEffect(() => {
    //     (async () => {
    //         let fileNames = await window.electronAPI.getAllFilenames();
    //         setRecordings(fileNames.split(","));
    //     })();
    // }, []);

    useEffect(() => {
        if (audio)
            setRecordings((prevState) => {
                return [...prevState, { key: generateKey(), audio }];
            });
    }, [audio]);

    return {
        recordings: recordings,
        deleteAudio: (audioKey) => deleteAudio(audioKey, setRecordings),
    };
}
