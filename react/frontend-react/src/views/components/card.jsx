export const Card = ({ children }) => {
    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center">
            <div className="px-6 py-4 text-center">
                { children }
            </div>
        </div>
    )
}
