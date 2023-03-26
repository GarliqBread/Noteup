import ProsCons from "../../../models/ProsCons";
import { useState, useEffect } from "react";

import ItemsManager from "../../../managers/ItemsManager";
import { useParams, useLocation } from 'react-router-dom';


function TableRow(item: String, key: String) {
    return (
        <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item}
            </th>
            <td className="px-6 py-4 flex justify-end gap-4">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Save</a>
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
            </td>
        </tr>

    );
}

function Table(props: any) {
    return (
        <table className=" text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th colSpan={3} scope="col" className="px-6 py-3">
                        {props.title} - {props.items.length}
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.items.map((value, index) => {
                    return TableRow(value, index.toString())
                })}
                <tr key={0} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <input
                            type="text"
                            id={props.name}
                            name={props.name}
                            value={props.value}
                            onChange={props.handleChange}
                            className="
                    bg-gray-50 border border-gray-300 mb-4
                    text-gray-900 text-sm rounded-lg block w-full p-2.5  
                    "/>
                    </th>
                    <td className="px-6 py-4 flex justify-end gap-4">
                        <a href="#" onClick={props.handleSubmit} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Save</a>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}



export default function ProsConsContent() {
    const val = ItemsManager.getItem(useParams(), useLocation());
    const [newPros, setnewPros] = useState("")
    const [newCons, setnewCons] = useState("")
    const [Pros, setPros] = useState(val.pros)
    const [Cons, setCons] = useState(val.cons)
    const [inputs, setInputs] = useState(
        {
            title: val.title,
            content: val.content,
        }
    );

    useEffect(() => {
        if (inputs.title !== val.title) {
            setInputs({ title: val.title, content: val.content });
            setPros(val.pros);
            setCons(val.cons);
        }
    });

    const handleSubmit = (event: any) => {
        event.preventDefault();
        val.title = inputs.title
        val.content = inputs.content
        ItemsManager.saveItem(val);
        ItemsManager.updateItems(val);
        new ProsCons().update(val.id, { title: inputs.title, content: inputs.content, cons: Cons, pros: Pros });
    };

    function addNewPro(event: any) {
        event.preventDefault();
        const updatedPros = [...Pros];
        updatedPros.push(newPros);
        setPros(updatedPros);
        setnewPros("");
        val.pros = updatedPros;
        ItemsManager.saveItem(val);
    };
    function addNewCons(event: any) {
        event.preventDefault();
        const updatedCons = [...Cons];
        updatedCons.push(newCons);
        setCons(updatedCons);
        setnewCons("");
        val.cons = updatedCons;
        ItemsManager.saveItem(val);
    };
    function handleChangePros(event: any) {
        setnewPros(event.target.value);
    };
    function handleChangeCons(event: any) {
        setnewCons(event.target.value);
    };

    function handleChange(event: any) {
        const name = event.target.name;
        const value = event.target.value;
        // val.title = value;
        // ItemsManager.saveItem(val);
        setInputs(values => ({ ...values, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="
            shadow-lg ring-1 ring-black/10 
            relative flex flex-col 
            items-start p-4 mt-3 bg-white rounded-lg 
            bg-opacity-90 group hover:bg-opacity-100">
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={inputs.title}
                    onChange={handleChange}
                    className="input-styled" />
                <textarea
                    id="content"
                    name="content"
                    value={inputs.content}
                    onChange={handleChange}
                    className="textfield-styled"
                    placeholder="Write your thoughts here..."></textarea>

                <div className="container m-auto grid grid-cols-2 gap-1 mt-4 rounded-lg">
                    <Table title={"PROS"} items={Pros} handleSubmit={addNewPro} handleChange={handleChangePros} value={newPros} name={"pros"} />
                    <Table title={"CONS"} items={Cons} handleSubmit={addNewCons} handleChange={handleChangeCons} value={newCons} name={"cons"} />
                </div>

                <button
                    className="save-button"
                    type="submit">
                    Save Changes
                </button>

            </div >
        </form>
    )
};
