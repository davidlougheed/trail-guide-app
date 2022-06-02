import React from "react";

import {APP_GITHUB_URL} from "../constants";
import CustomModal from "./CustomModal";

const htmlContent = `
<p>
    This application is powered by free software. See the below notice
    for more information. The source code for this application can be found at
    <a href="${APP_GITHUB_URL}">${APP_GITHUB_URL}</a>.
</p>
<p>
    An interactive trail guide mobile app with text, media, and more.
    Copyright (C) 2021-2022  David Lougheed
</p>
<p>
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
</p>
<p>
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
</p>
<p>
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see
    <a href="https://www.gnu.org/licenses/">https://www.gnu.org/licenses/</a>.
</p>
`;

const AppInfoModal = React.memo(({visible, onRequestClose}) => {
    return <CustomModal onRequestClose={onRequestClose} visible={visible} data={{content: htmlContent}} />;
});

export default AppInfoModal;
