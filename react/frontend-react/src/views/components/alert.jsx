const Alert = ({ type, message, onClose }) => {
    const baseStyle = "p-2 mb-4 rounded-lg flex items-center justify-between text-sm";
    let alertStyle = "";

    switch (type) {
        case 'success':
            alertStyle = "bg-green-100 text-green-800 border border-green-200";
            break;
        case 'error':
            alertStyle = "bg-red-100 text-red-800 border border-red-200";
            break;
        case 'warning':
            alertStyle = "bg-yellow-100 text-yellow-800 border border-yellow-200";
            break;
        case 'info':
            alertStyle = "bg-blue-100 text-blue-800 border border-blue-200";
            break;
        default:
            alertStyle = "bg-gray-100 text-gray-800 border border-gray-200";
            break;
    }

    return (
        <div className={`${baseStyle} ${alertStyle}`}>
            <span>{message}</span>
            <button
                onClick={onClose}
                className="text-xl font-bold ml-4 focus:outline-none">
                &times;
            </button>
        </div>
    );
}

export default Alert;
