interface TeamWidgetProps {
    name: string;
    role: string;
}
export default function TeamWidget({name, role}: TeamWidgetProps) {
    return (
        <div className="flex flex-col items-center justify-center align-middle text-xl font-bold mb-4 text-blue-900 bg-white bg-opacity-90 p-2 shadow-xl rounded-xl w-fit">
            <p>{name}</p>
            <p className="text-sm italic">{role}</p>
        </div>
    )
}