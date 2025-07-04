// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2024  David Lougheed
// See NOTICE for more information.

import LocalAudioRenderer from "../LocalAudioRenderer";
import LocalImageRenderer from "../LocalImageRenderer";
import LocalVideoRenderer from "../LocalVideoRenderer";

export default {
    ["tgcs-audio"]: LocalAudioRenderer,
    audio: LocalAudioRenderer,
    img: LocalImageRenderer,
    video: LocalVideoRenderer,
};
