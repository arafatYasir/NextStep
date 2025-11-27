interface props {
    label: string,
    ref: React.RefObject<HTMLDivElement | null>,
    options: Array<string>,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const Dropdown = ({ label, ref, options, isOpen, setIsOpen, value, setValue }: props) => {
    return (
        <div className="mb-6">
            <label
                className="block text-base font-semibold text-slate-900 mb-2">
                {label}
            </label>

            <div
                className="relative"
                ref={ref}
            >
                <div
                    onClick={() => setIsOpen((prev: boolean) => !prev)}
                    className={`w-full bg-slate-50 border ${isOpen ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-200'} ${!isOpen ? "hover:border-indigo-300" : ""} rounded-xl px-4 py-3 text-slate-900 cursor-pointer flex items-center justify-between transition-all`}
                >
                    <span className={!value ? "text-slate-400" : "font-medium"}>
                        {value || "Select a job category..."}
                    </span>

                    {/* ---- Angle Icon ---- */}
                    <svg className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {isOpen && (
                    <div className="absolute z-20 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                        {options.map((option) => (
                            <div
                                key={option}
                                onClick={() => {
                                    setValue(option);
                                    setIsOpen(false);
                                }}
                                className={`px-4 py-3 ${option === value ? "bg-indigo-600 text-slate-50" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600 hover:border-slate-200 border-b border-slate-100"} cursor-pointer transition-colors last:border-0`}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dropdown