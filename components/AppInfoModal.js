import { memo } from "react";

import {APP_GITHUB_URL} from "../constants";
import CustomModal from "./CustomModal";

const htmlContent = `
<h2>Privacy Policy</h2>
<p>
    <a href="/privacy-policy">Tap here</a> to see this app's privacy policy.
</p>

<h2>Legal Notice</h2>
<p>
    This application is powered by free software. See the below notice
    for more information. The source code for this application can be found at
    <a href="${APP_GITHUB_URL}">${APP_GITHUB_URL}</a>.
</p>
<p>
    An interactive trail guide mobile app with text, media, and more.
    Copyright (C) 2021-2024  David Lougheed
</p>
<p>
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
</p>
<p>
    <a href="https://www.apache.org/licenses/LICENSE-2.0">https://www.apache.org/licenses/LICENSE-2.0</a>
</p>
<p>
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
</p>
`;

const AppInfoModal = memo(({visible, onRequestClose}) => (
    <CustomModal onRequestClose={onRequestClose} visible={visible} data={{content: htmlContent}} />
));

export default AppInfoModal;
