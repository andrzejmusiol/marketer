export const Error = ({ message = "An unexpected error occurred" }) =>
    <div className="flex items-center justify-center h-full my-5">
        <p className="text-red-300">{message}</p>
    </div>
