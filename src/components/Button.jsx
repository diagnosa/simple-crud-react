export default function Button({
    className = "bg-yellow-500", 
    children, 
    ...props
}) {
    return (
        <button {...props} className={`${className} px-4 py-2`}>{children}</button>
    )
}
