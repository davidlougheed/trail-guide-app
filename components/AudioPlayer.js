import React, {useEffect, useState} from "react";
import {Text} from "react-native";
import {Audio} from "expo-av";

const toSeconds = s => (s / 1000).toFixed(0);

const AudioPlayer = ({linkText, src}) => {
    const [sound, setSound] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState("");

    const playSound = async () => {
        let sound_ = sound;
        try {
            if (!sound_) {
                const {sound: newSound} = await Audio.Sound.createAsync({uri: src});
                newSound.setOnPlaybackStatusUpdate(status => {
                    console.log(status, playing, status.isPlaying);
                    setPlaying(status.isPlaying);
                    if (!status.isPlaying) {
                        setProgress("");
                    } else {
                        setProgress(
                            `${toSeconds(status.positionMillis)}s / ${toSeconds(status.durationMillis)}s`);
                    }
                });
                setSound(newSound);
                sound_ = newSound;
            }
            await sound_.playAsync();
        } catch (err) {
            console.error(err);
        }
    };

    const stopSound = async () => {
        try {
            if (!sound) return;
            await sound.stopAsync();
            // setPlaying(false);
        } catch (err) {
            console.error(err);
        }
    };

    // Clean-up function to free audio memory when component is unloaded
    useEffect(() => sound ? (() => sound.unloadAsync()) : undefined, [sound]);

    const toggleSound = async () => {
        const status = sound ? (await sound.getStatusAsync()) : ({isPlaying: false});
        await (status.isPlaying ? stopSound : playSound)();
    };

    return <Text onPress={toggleSound} style={{fontSize: 16}}>
        <Text style={{marginRight: "0.5em"}}>{playing ? "⏹" : "▶️"}</Text>
        <Text style={{textDecorationLine: "underline", color: "rgb(0, 122, 255)"}}>
            {linkText ?? (playing ? "Stop Sound" : "Play Sound")}</Text>
        {progress ? (
            <Text style={{color: "#666"}}>&nbsp;({progress})</Text>
        ) : null}
        <Text style={{marginLeft: "0.5em"}}>🔊</Text>
    </Text>
};

export default AudioPlayer;
