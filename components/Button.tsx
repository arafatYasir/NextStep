interface props {
    text: string,
    paddingX?: string,
    paddingY?: string,
    disabled?: boolean,
    onClick?: () => void
}

const Button = ({ text, paddingX = "16px", paddingY = "12px", disabled, onClick }: props) => {
    return (
        <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:bg-indigo-600"
            style={{
                padding: `${paddingY} ${paddingX}`
            }}
            disabled={disabled}
            onClick={onClick}
        >{text}</button>
    )
}

export default Button;