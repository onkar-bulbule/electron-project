import generateKey from "../utils/generate-key.js";

export async function startRecording(setRecorderState) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });

        setRecorderState((prevState) => {
            return {
                ...prevState,
                initRecording: true,
                mediaStream: stream,
            };
        });
    } catch (err) {
        console.log(err);
    }
}

export function stopRecording(recorder, setRecorderState) {
    if (recorder.state !== "inactive") recorder.stop();
    setRecorderState((prevState) => {
        return {
            ...prevState,
            inPreview: true,
        };
    });
}

export function pauseRecording(recorder) {
    if (recorder.state === "recording") recorder.pause();
    else if (recorder.state === "paused") recorder.resume();
}

export function saveRecording(recorderState, setRecorderState) {
    // const blobStr = await recorderState.currentBlob.text();
    // window.blobStr = blobStr;
    // let result = await window.electronAPI.saveIntoFile(blobStr);
    console.log(recorderState.audios);
    setRecorderState((prevState) => {
        return {
            ...prevState,
            audios: [
                ...prevState.audios,
                {
                    key: generateKey(),
                    audio: prevState.currentAudio,
                },
            ],
        };
    });
}

export function deleteAudio(key, setRecorderState) {
    setRecorderState((prevState) => {
        return {
            ...prevState,
            audios: prevState.audios.filter(audio => audio.key !== key),
        }
    })
}
