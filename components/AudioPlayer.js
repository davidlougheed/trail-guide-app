// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2025  David Lougheed
// See NOTICE for more information.

import React, {useCallback, useEffect, useState} from "react";
import {StyleSheet, Text} from "react-native";
import {Audio} from "expo-av";

const styles = StyleSheet.create({
    mainText: {
        fontSize: 18,
    },
    linkText: {textDecorationLine: "underline", color: "rgb(0, 122, 255)"},
    progressText: {color: "#666"},
});

const toSeconds = s => (s / 1000).toFixed(0);

const AudioPlayer = ({linkText, src}) => {
    const [sound, setSound] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState("");

    const playSound = useCallback(async () => {
        let sound_ = sound;
        try {
            if (!sound_) {
                await Audio.setAudioModeAsync({playsInSilentModeIOS: true});

                const {sound: newSound} = await Audio.Sound.createAsync(src, {shouldPlay: true});
                newSound.setOnPlaybackStatusUpdate(status => {
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
            await sound_.setPositionAsync(0);
            await sound_.playAsync();
        } catch (err) {
            console.error(err);
        }
    }, [sound]);

    const stopSound = useCallback(async () => {
        try {
            if (!sound) return;
            await sound.stopAsync();
            // setPlaying(false);
        } catch (err) {
            console.error(err);
        }
    }, [sound]);

    // Clean-up function to free audio memory when component is unloaded
    useEffect(() => sound ? (() => sound.unloadAsync()) : undefined, [sound]);

    const toggleSound = useCallback(async () => {
        const status = sound ? (await sound.getStatusAsync()) : ({isPlaying: false});
        await (status.isPlaying ? stopSound : playSound)();
    }, [sound, stopSound, playSound]);

    if (linkText) linkText = linkText.trim();

    return <Text onPress={toggleSound} style={styles.mainText} numberOfLines={1}>
        <Text>{playing ? "⏹" : "▶️"} </Text>
        <Text style={styles.linkText}>{linkText ?? (playing ? "Stop Sound" : "Play Sound")}</Text>
        {progress ? <Text style={styles.progressText}>&nbsp;({progress})</Text> : null}
        <Text> 🔊</Text>
    </Text>
};

export default AudioPlayer;
