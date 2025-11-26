export const Error = ({ message = "An unexpected error occurred" }) =>
    <div className="flex items-center justify-center h-full">
        <p className="text-red-500">{message}</p>
    </div>
