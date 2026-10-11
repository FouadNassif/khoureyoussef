"use client";

import { useTranslation } from "react-i18next";
import { Navigation as NavigationIcon } from "lucide-react";

// Mar Mikhael Church, Sereel (same place as the map embed on the contact page)
const CHURCH_LAT = 34.28938687221933;
const CHURCH_LNG = 35.91068943537858;

const GOOGLE_MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${CHURCH_LAT},${CHURCH_LNG}`;

const DirectionsButtons = ({ className = "" }: { className?: string }) => {
  const { t } = useTranslation();

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-divine text-primary-foreground glow-divine font-medium text-sm hover:scale-105 transition-transform"
      >
        <NavigationIcon className="w-4 h-4" />
        {t("contact.getDirections")}
      </a>
    </div>
  );
};

export default DirectionsButtons;
