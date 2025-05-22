export default function Unauthorized() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <h2 className="text-2xl text-red-600 font-bold">
                🚫 You are not authorized to access this page.
            </h2>
        </div>
    );
}
