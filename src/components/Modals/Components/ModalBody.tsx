export default function ModalBody(props: any) {
    return (
        <>
            <div
                className="
                justify-center items-center 
                flex overflow-x-hidden 
                overflow-y-auto fixed 
                inset-0 z-50 outline-none 
                focus:outline-none"
            >
                <div className="relative w-full h-full max-w-2xl md:h-auto">
                    {/*content*/}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/*header*/}
                        <div className="
                        flex items-start 
                        justify-between p-5 
                        border-b border-solid 
                        border-slate-200 rounded-t"
                        >
                            <h3 className="text-3xl dark:text-white text-black">
                                {props.title}
                            </h3>
                            <button
                                onClick={() => props.setShowModal(false)}
                                className="
                            text-gray-400 bg-transparent 
                            hover:bg-gray-200 hover:text-gray-900 
                            rounded-lg text-sm p-1.5 
                            ml-auto inline-flex items-center 
                            dark:hover:bg-gray-600 
                            dark:hover:text-white"
                                data-modal-hide="defaultModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>
                        {/*body*/}
                        {props.form}
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}
