export const Card = ({ children }) => {
    return (
        <div className="max-w-4xl  mx-auto bg-white shadow-lg rounded-sm overflow-hidden ">
            <div className="px-6 py-4">
            { children }
            </div>
        </div>
    )
}
