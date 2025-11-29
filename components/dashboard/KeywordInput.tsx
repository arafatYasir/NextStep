import { KeyboardEvent } from "react";
import PlusIcon from "@/icons/PlusIcon";
import TrashIcon from "@/icons/TrashIcon";

interface KeywordInputProps {
    label: string;
    field: string;
    placeholder: string;
    description?: string;
    currentValue: string;
    keywords: string[];
    onInputChange: (value: string) => void;
    onAdd: () => void;
    onRemove: (index: number) => void;
    onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const KeywordInput = ({
    label,
    placeholder,
    description,
    currentValue,
    keywords,
    onInputChange,
    onAdd,
    onRemove,
    onKeyPress,
}: KeywordInputProps) => {
    return (
        <div className="space-y-3">
            <div>
                <label className="block text-sm font-semibold text-[rgb(var(--text-primary))] mb-1">
                    {label}
                </label>
                {description && (
                    <p className="text-xs text-[rgb(var(--text-muted))]">{description}</p>
                )}
            </div>

            {/* Input with Add Button */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={currentValue}
                    onChange={(e) => onInputChange(e.target.value)}
                    onKeyDown={onKeyPress}
                    placeholder={placeholder}
                    className="flex-1 bg-[rgb(var(--bg-input))] border border-[rgb(var(--border-default))] hover:border-[rgb(var(--border-hover))] focus:border-[rgb(var(--border-focus))] focus:ring-2 focus:ring-[rgba(var(--ring-focus),var(--alpha-ring))] rounded-lg px-4 py-2.5 text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-muted))] focus:outline-none transition-all duration-200"
                />
                <button
                    type="button"
                    onClick={onAdd}
                    className="px-4 py-2.5 bg-[rgb(var(--bg-primary))] hover:bg-[rgb(var(--bg-primary-hover))] text-white rounded-lg transition-all duration-200 flex items-center gap-2 font-medium shadow-sm hover:shadow-md active:scale-95"
                >
                    <PlusIcon />
                    Add
                </button>
            </div>

            {/* Tags Display */}
            {keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-[rgb(var(--bg-body))] rounded-lg border border-[rgb(var(--border-default))]">
                    {keywords.map((keyword, index) => (
                        <div
                            key={index}
                            className="group flex items-center gap-2 px-3 py-1.5 bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-default))] rounded-full text-sm text-[rgb(var(--text-primary))] hover:border-[rgb(var(--border-hover))] transition-all duration-200"
                        >
                            <span>{keyword}</span>
                            <button
                                type="button"
                                onClick={() => onRemove(index)}
                                className="text-[rgb(var(--text-muted))] hover:text-red-500 transition-colors duration-200"
                            >
                                <TrashIcon />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default KeywordInput;
