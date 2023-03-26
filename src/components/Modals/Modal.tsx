import React from "react";
import ModalButton from "./Components/ModalButton"
import ModalBody from "./Components/ModalBody"
import KanbanForm from "./Forms/Kanban";
import NewSimpleItemForm from "./Forms/NewSimpleItem"
import { kanban, notes, alias, settings, schedule } from "../../constants/Apps"



export default function Modal(props: any) {
    const [showModal, setShowModal] = React.useState(false);

    function displayForm(app: string) {
        let FormComponent = NewSimpleItemForm;
        if (app === kanban || app === alias) { FormComponent = KanbanForm; }
        return <FormComponent model={props.model} setShowModal={setShowModal} />;
    }

    return (
        <>
            <ModalButton setShowModal={setShowModal} />
            {showModal ? (
                <ModalBody
                    title={`Add a new ${props.app}`}
                    setShowModal={setShowModal}
                    form={displayForm(props.app)} />
            ) : null}
        </>
    );
}
