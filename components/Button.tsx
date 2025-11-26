interface props {
    text: string
}

const Button = ({text} : props) => {
    return (
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95 cursor-pointer">{text}</button>
    )
}

export default Button;