import React from "react";
import KanbanTicket from "../../../models/KanbanTicket";
import SessionStorageManager from "../../../managers/SessionStorageManager";

export default function KanbanForm(props: any) {
    const [inputs, setInputs] = React.useState(
        {
            title: "",
            content: "",
            taskStatus: "todo",
        }
    );

    const handleSubmit = (event: any) => {
        event.preventDefault();
        props.setShowModal(false)
        let ticket = new KanbanTicket(inputs.title, inputs.content, inputs.taskStatus, new Date());
        // ticket.save();
        const localSto = new SessionStorageManager();
        localSto.setValue("model", JSON.stringify(ticket))
    };
    function handleChange(event: any) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="relative p-6 flex-auto">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={inputs.title}
                    onChange={handleChange}
                    className="
                                        bg-gray-50 border border-gray-300 
                                        text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                                        focus:border-blue-500 block w-full p-2.5  
                                        dark:bg-gray-700 
                                        dark:border-gray-600 
                                        dark:placeholder-gray-400 
                                        dark:text-white 
                                        dark:focus:ring-blue-500 
                                        dark:focus:border-blue-500" />

                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                <textarea
                    id="content"
                    name="content"
                    value={inputs.content}
                    onChange={handleChange}
                    className="
                                        block p-2.5 w-full text-sm 
                                        text-gray-900 bg-gray-50 rounded-lg border 
                                        border-gray-300 focus:ring-blue-500 
                                        focus:border-blue-500 
                                        dark:bg-gray-700 dark:border-gray-600 
                                        dark:placeholder-gray-400 dark:text-white 
                                        dark:focus:ring-blue-500 
                                        dark:focus:border-blue-500"
                ></textarea>

                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your country</label>
                <select
                    id="taskStatus"
                    name="taskStatus"
                    value={inputs.taskStatus}
                    onChange={handleChange}
                    required

                    className="
                                        bg-gray-50 border border-gray-300 
                                        text-gray-900 text-sm rounded-lg 
                                        focus:ring-blue-500 focus:border-blue-500 
                                        block w-full p-2.5 
                                        dark:bg-gray-700 
                                        dark:border-gray-600 
                                        dark:placeholder-gray-400 
                                        dark:text-white 
                                        dark:focus:ring-blue-500 
                                        dark:focus:border-blue-500">
                    <option value="todo">To Do</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                </select>

            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                    className="
                                            text-red-500 background-transparent 
                                            font-bold uppercase px-6 py-2 text-sm 
                                            outline-none focus:outline-none mr-1 mb-1 
                                            ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setShowModal(false)}
                >
                    Close
                </button>
                <input
                    className="
                                            bg-emerald-500 
                                            text-white active:bg-emerald-600 
                                            font-bold uppercase text-sm px-6 py-3 
                                            rounded shadow hover:shadow-lg outline-none 
                                            focus:outline-none mr-1 mb-1 ease-linear 
                                            transition-all duration-150"
                    type="submit"
                    value="Save Changes"
                />
            </div>
        </form>
    );
}
