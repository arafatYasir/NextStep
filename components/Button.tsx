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
            className="w-full bg-[rgb(var(--bg-primary))] hover:bg-[rgb(var(--bg-primary-hover))] text-[rgb(var(--text-on-primary))] font-semibold rounded-lg shadow-lg shadow-[rgba(var(--shadow-primary),var(--alpha-shadow-primary))] active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:bg-[rgb(var(--bg-primary))] transition-all"
            style={{
                padding: `${paddingY} ${paddingX}`
            }}
            disabled={disabled}
            onClick={onClick}
        >{text}</button>
    )
}

export default Button;