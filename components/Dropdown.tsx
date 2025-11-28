interface props {
    label: string,
    ref: React.RefObject<HTMLDivElement | null>,
    options: Array<string>,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    anyDependency: boolean,
    dependency?: string
}

const Dropdown = ({ label, ref, options, isOpen, setIsOpen, value, setValue, anyDependency, dependency }: props) => {
    return (
        <div className="mb-6">
            <label
                className="block text-base font-semibold text-[rgb(var(--text-primary))] mb-2">
                {label}
            </label>

            <div
                className="relative"
                ref={ref}
            >
                <div
                    onClick={
                        (anyDependency && dependency) ? () => setIsOpen((prev: boolean) => !prev) : !anyDependency ? () => setIsOpen((prev: boolean) => !prev) : () => {console.log("HELLo") }
                    }
                    className={`w-full bg-[rgb(var(--bg-input))] border ${isOpen ? 'border-[rgb(var(--border-focus))] ring-2 ring-[rgba(var(--ring-focus),var(--alpha-ring))]' : 'border-[rgb(var(--border-default))]'} ${!isOpen ? "hover:border-[rgb(var(--border-hover))]" : ""} rounded-xl px-4 py-3 text-[rgb(var(--text-primary))] cursor-pointer flex items-center justify-between`}
                >
                    <span className={!value ? "text-[rgb(var(--text-muted))]" : "font-medium"}>
                        {value || "Select a job category..."}
                    </span>

                    {/* ---- Angle Icon ---- */}
                    <svg className={`w-5 h-5 text-[rgb(var(--text-muted))] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {isOpen && (
                    <div className="absolute z-20 w-full mt-2 bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-default))] rounded-xl shadow-xl max-h-60 overflow-y-auto scrollbar-custom">
                        {options.map((option) => (
                            <div
                                key={option}
                                onClick={() => {
                                    setValue(option);
                                    setIsOpen(false);
                                }}
                                className={`px-4 py-3 ${option === value ? "bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-on-primary))]" : "text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-hover))] hover:text-[rgb(var(--text-accent))] hover:border-[rgb(var(--border-default))] border-b border-[rgb(var(--border-light))]"} cursor-pointer transition-colors last:border-0`}
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