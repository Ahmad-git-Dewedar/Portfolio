"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui";
import { cn } from "@/lib/cn";
import styles from "./ContactSection.module.css";

interface CopyEmailButtonProps {
  email: string;
  label: string;
  copiedLabel: string;
}

const RESET_AFTER_MS = 2400;

/** Copies the address to the clipboard and confirms it visually and to screen readers. */
export function CopyEmailButton({ email, label, copiedLabel }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), RESET_AFTER_MS);
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={cn(styles.copyButton, copied && styles.copied)}
        aria-label={label}
        title={label}
      >
        <Icon name={copied ? "check" : "copy"} size={18} />
      </button>
      <span className="visually-hidden" role="status">
        {copied ? copiedLabel : ""}
      </span>
    </>
  );
}
