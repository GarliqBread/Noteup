import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../store/manager";


export default function NewSimpleItemForm(props: any) {
    const [inputs, setInputs] = React.useState({ title: "", });

    function createNewObj(props:any):void{
        const obj = props.obj
        obj.id = props.id
        useDispatch()(addItem(obj))
    }
    const handleSubmit = (event: any) => {
        event.preventDefault();
        props.setShowModal(false)
        const newObj = new props.model(inputs.title);
        newObj.create()
            .then((newId: number) => { createNewObj({id: newId, obj:newObj}) })
            .catch((error: any) => {
                console.error(error);
            });


    };
    function handleChange(event: any) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="relative p-6 flex-auto">
                <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
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
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                    className="
                    bg-red-500 
                    text-white active:bg-red-600 
                    font-bold uppercase text-sm px-6 py-3 
                    rounded shadow hover:shadow-lg outline-none 
                    focus:outline-none mr-1 mb-1 ease-linear 
                    transition-all duration-150"
                    type="button"
                    onClick={() => props.setShowModal(false)}
                >
                    Close
                </button>
                <button
                    className="
                        bg-emerald-500 
                        text-white active:bg-emerald-600 
                        font-bold uppercase text-sm px-6 py-3 
                        rounded shadow hover:shadow-lg outline-none 
                        focus:outline-none mr-1 mb-1 ease-linear 
                        transition-all duration-150"
                    type="submit"

                >
                    Save Changes
                </button>
            </div>
        </form>
    );
}
