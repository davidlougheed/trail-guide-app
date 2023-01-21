// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2023  David Lougheed
// See NOTICE for more information.

import React from "react";

import CustomModal from "./CustomModal";
import {localDataProvider} from "../dataSources";

const RenderModals = React.memo(({modalsVisible, setModalsVisible}) =>
    <>
        {Object.entries(localDataProvider.modals.itemsByID).map(([k, d]) => {
            const closeModal = () => setModalsVisible({...modalsVisible, [k]: undefined});
            return <CustomModal
                key={k}
                visible={modalsVisible[k] !== undefined}
                data={{content: d.content}}
                onRequestClose={closeModal}
                setModalsVisible={setModalsVisible}
            />;
        })}
    </>
);

export default RenderModals;
