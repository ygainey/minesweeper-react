const AlertDialog = ({ open, children }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                {children}
            </div>
        </div>
    )
}

const AlertDialogContent = ({ children }) => <div>{children}</div>;
const AlertDialogHeader = ({ children }) => <div className="mb-4">{children}</div>;
const AlertDialogFooter = ({ children }) => <div className="mt-4 flex justify-end space-x-2">{children}</div>;
const AlertDialogTitle = ({ children }) => <h2 className="text-xl font-bold">{children}</h2>;
const AlertDialogDescription = ({ children }) => <p className="mt-2">{children}</p>;
const AlertDialogAction = ({ onClick, children }) => (
    <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={onClick}
    >
        {children}
    </button>
)

export { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction }