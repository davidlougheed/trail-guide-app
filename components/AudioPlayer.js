// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2026  David Lougheed
// See NOTICE for more information.

import React, { useCallback } from "react";
import { StyleSheet, Text } from "react-native";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

const styles = StyleSheet.create({
    mainText: {
        fontSize: 18,
    },
    linkText: {textDecorationLine: "underline", color: "rgb(0, 122, 255)"},
    progressText: {color: "#666"},
});

const fmtSeconds = s => `${s.toFixed(0)}s`;

const AudioPlayer = ({linkText, src}) => {
    const player = useAudioPlayer(src);
    const status = useAudioPlayerStatus(player);

    const playSound = useCallback(() => {
        player.play();
    }, [player]);

    const stopSound = useCallback(async () => {
        player.pause();
    }, [player]);

    const playing = status.playing;
    const toggleSound = playing ? stopSound : playSound;

    const progress = playing ? `${fmtSeconds(status.currentTime)} / ${fmtSeconds(status.duration)}` : "";

    if (linkText) linkText = linkText.trim();

    return <Text onPress={toggleSound} style={styles.mainText} numberOfLines={1}>
        <Text>{playing ? "⏹" : "▶️"} </Text>
        <Text style={styles.linkText}>{linkText ?? (playing ? "Stop Sound" : "Play Sound")}</Text>
        {progress ? <Text style={styles.progressText}>&nbsp;({progress})</Text> : null}
        <Text> 🔊</Text>
    </Text>
};

export default AudioPlayer;
