"use client";

import { useTranslation } from "react-i18next";
import { Facebook } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  // Page path to share, e.g. "/miracles". Defaults to the current page.
  path?: string;
  className?: string;
}

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.43 9.44-9.43a9.43 9.43 0 0 1 9.43 9.44c0 5.2-4.23 9.43-9.44 9.43Zm8.03-17.47A11.28 11.28 0 0 0 12.05.7C5.79.7.7 5.79.7 12.05c0 2 .52 3.95 1.52 5.67L.6 23.3l5.7-1.5a11.33 11.33 0 0 0 5.74 1.47h.01c6.25 0 11.34-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02Z" />
  </svg>
);

const ShareButtons = ({ title, path, className = "" }: ShareButtonsProps) => {
  const { t } = useTranslation();

  // Build the URL at click time so it works on the deployed domain without hydration issues
  const getUrl = () =>
    path ? `${window.location.origin}${path}` : window.location.href;

  const shareWhatsApp = () => {
    const text = `${title}\n${getUrl()}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className={`flex items-center gap-2 ${className}`} onClick={(e) => e.stopPropagation()}>
      <span className="text-xs text-muted-foreground font-medium">{t("share.label")}</span>
      <button
        type="button"
        onClick={shareWhatsApp}
        aria-label={t("share.whatsapp")}
        title={t("share.whatsapp")}
        className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
      >
        <WhatsAppIcon className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={shareFacebook}
        aria-label={t("share.facebook")}
        title={t("share.facebook")}
        className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
      >
        <Facebook className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ShareButtons;
