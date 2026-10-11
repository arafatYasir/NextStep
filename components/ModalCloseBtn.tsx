"use client";

import { X } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
    onClick: () => void;
    disabled: boolean;
}

const ModalCloseBtn = ({ onClick, disabled }: Props) => {
    return (
        <Button
            type="button"
            onClick={onClick}
            disabled={disabled}
            variant="secondary"
            className="border border-[rgb(var(--border-default))] text-foreground/80 hover:text-foreground active:text-foreground has-[>svg]:p-1.5 xs:has-[>svg]:p-2 shrink-0"
            aria-label="Close Modal"
        >
            <X className="size-4 xs:size-5 sm:size-6" />
        </Button>
    )
}

export default ModalCloseBtn