import { BsPlus } from 'react-icons/bs';

export default function ModalButton(props: any) {

    return (
        <>
            <button
                type="button"
                onClick={() => props.setShowModal(true)}
                className="
        flex items-center px-4 py-2 cursor-pointer rounded-lg
        bg-green-900 text-gray-100
        dark:bg-green-100 dark:text-gray-900"
            >
                <BsPlus size="15" />
                <span className="ml-3 text-sm font-medium"> Añadir nuevo </span>
            </button>
        </>
    );
}
