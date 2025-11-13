"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/config";
import { DirectionProvider } from "@/components/DirectionProvider";

interface I18nProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <DirectionProvider>{children}</DirectionProvider>
    </I18nextProvider>
  );
}

