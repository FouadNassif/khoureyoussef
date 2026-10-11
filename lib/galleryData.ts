export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

export const galleryImages: GalleryImage[] = [
  // Church Images
  {
    src: "/assets/hero-church.webp",
    alt: "Khoury Youssef Church at Sunset",
    category: "Church",
  },
  {
    src: "/assets/church-interior.webp",
    alt: "Church Interior",
    category: "Church",
  },

  // Icon Images
  {
    src: "/assets/saint-icon.webp",
    alt: "Saint Icon",
    category: "Icon",
  },

  // Village/Sereel Images
  {
    src: "/assets/Church/img1.webp",
    alt: "Church Interior",
    category: "Church",
  },
  {
    src: "/assets/Church/img2.webp",
    alt: "Church Interior",
    category: "Church",
  },
  {
    src: "/assets/Church/img3.webp",
    alt: "Church Interior",
    category: "Church",
  },
  {
    src: "/assets/Church/img4.webp",
    alt: "Church Interior",
    category: "Church",
  },
  {
    src: "/assets/Church/img5.webp",
    alt: "Church Interior",
    category: "Church",
  },
  {
    src: "/assets/Church/img6.webp",
    alt: "Church Interior",
    category: "Church",
  },
  {
    src: "/assets/Church/img7.webp",
    alt: "Church Interior",
    category: "Church",
  },


  {
    src: "/assets/Sereel/img1.webp",
    alt: "",
    category: "Sereel",
  },
  {
    src: "/assets/Sereel/img2.webp",
    alt: "",
    category: "Sereel",
  },
  {
    src: "/assets/Sereel/img3.webp",
    alt: "",
    category: "Sereel",
  },
  {
    src: "/assets/Sereel/img4.webp",
    alt: "",
    category: "Sereel",
  },
  {
    src: "/assets/Sereel/img5.webp",
    alt: "",
    category: "Sereel",
  },
  {
    src: "/assets/Sereel/img6.webp",
    alt: "",
    category: "Sereel",
  },
  {
    src: "/assets/Sereel/img7.webp",
    alt: "",
    category: "Sereel",
  },
  {
    src: "/assets/Sereel/img8.webp",
    alt: "",
    category: "Sereel",
  },
  {
    src: "/assets/Sereel/img9.webp",
    alt: "",
    category: "Sereel",
  },
  {
    src: "/assets/Sereel/img10.webp",
    alt: "",
    category: "Sereel",
  },


  // Add more images as needed
  // To add a new category, simply add images with a new category value
  // The category filter will automatically detect and display the new category
];

/**
 * Get all unique categories from gallery images
 * @returns Array of unique category names
 */
export const getCategories = (): string[] => {
  const categories = galleryImages.map((img) => img.category);
  return Array.from(new Set(categories));
};
