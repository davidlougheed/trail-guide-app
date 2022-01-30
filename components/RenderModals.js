import React from "react";

import CustomModal from "./CustomModal";
import modalData from "../data/modals.json";

const RenderModals = ({modalsVisible, setModalsVisible}) =>
    <>
        {Object.entries(modalData).map(([k, d]) => {
            const closeModal = () => setModalsVisible({...modalsVisible, [k]: undefined});
            return <CustomModal
                key={k}
                visible={modalsVisible[k] !== undefined}
                data={{content: d.content}}
                onRequestClose={closeModal}
            />;
        })}
    </>;

export default RenderModals;
