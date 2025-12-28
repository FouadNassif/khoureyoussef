export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

export const galleryImages: GalleryImage[] = [
  // Church Images
  {
    src: "/assets/hero-church.jpg",
    alt: "Khoury Youssef Church at Sunset",
    category: "Church",
  },
  {
    src: "/assets/church-interior.jpg",
    alt: "Church Interior",
    category: "Church",
  },

  // Icon Images
  {
    src: "/assets/saint-icon.jpg",
    alt: "Saint Icon",
    category: "Icon",
  },

  // Village/Sereel Images
  {
    src: "/assets/Church/img1.jpg",
    alt: "Church Interior",
    category: "Church",
  },
  {
    src: "/assets/Church/img2.jpg",
    alt: "Church Interior",
    category: "Church",
  },
  {
    src: "/assets/Church/img3.jpg",
    alt: "Church Interior",
    category: "Church",
  },
  {
    src: "/assets/Church/img4.jpg",
    alt: "Church Interior",
    category: "Church",
  },
  {
    src: "/assets/Church/img5.jpg",
    alt: "Church Interior",
    category: "Church",
  },
  {
    src: "/assets/Church/img6.jpg",
    alt: "Church Interior",
    category: "Church",
  },
  {
    src: "/assets/Church/img7.jpg",
    alt: "Church Interior",
    category: "Church",
  },


  {
    src: "/assets/Sereel/img1.jpg",
    alt: "",
    category: "Sereel",
  },
  {
    src: "/assets/Sereel/img2.jpg",
    alt: "",
    category: "Sereel",
  },
  {
    src: "/assets/Sereel/img3.jpg",
    alt: "",
    category: "Sereel",
  },
  {
    src: "/assets/Sereel/img4.jpg",
    alt: "",
    category: "Sereel",
  },
  {
    src: "/assets/Sereel/img5.jpg",
    alt: "",
    category: "Sereel",
  },
  {
    src: "/assets/Sereel/img6.jpg",
    alt: "",
    category: "Sereel",
  },
  {
    src: "/assets/Sereel/img7.jpg",
    alt: "",
    category: "Sereel",
  },
  {
    src: "/assets/Sereel/img8.jpg",
    alt: "",
    category: "Sereel",
  },
  {
    src: "/assets/Sereel/img9.jpg",
    alt: "",
    category: "Sereel",
  },
  {
    src: "/assets/Sereel/img10.jpg",
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
