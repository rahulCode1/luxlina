export const inputFields = [
  {
    id: "name",
    name: "name",
    label: "Product Name",
    type: "text",
    placeholder: "Enter product name",
  },
  {
    id: "shortDescription",
    name: "shortDescription",
    label: "Short Description",
    type: "text",
    placeholder: "Enter short description",
  },
  {
    id: "price",
    name: "price",
    label: "Price",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    id: "discountPrice",
    name: "discountPrice",
    label: "Discount / Sale Price",
    type: "number",
    placeholder: "Enter discount price",
  },
  {
    id: "costPrice",
    name: "costPrice",
    label: "Cost Price",
    type: "number",
    placeholder: "Enter cost price",
  },
  {
    id: "length",
    name: "length",
    label: "Length",
    type: "number",
    placeholder: "Enter product length",
  },
  {
    id: "width",
    name: "width",
    label: "Width",
    type: "number",
    placeholder: "Enter product width",
  },
  {
    id: "height",
    name: "height",
    label: "Height",
    type: "number",
    placeholder: "Enter product height",
  },
  {
    id: "weight",
    name: "weight",
    label: "Weight",
    type: "number",
    placeholder: "Enter product weight",
  },
];

export const tagsArray = [
  { value: "GodStatues", label: "God/Goddess Statues" },
  { value: "AnimalFigurines", label: "Animal Figurines" },
  { value: "BuddhaStatues", label: "Buddha Statues" },
  { value: "ModernSculptures", label: "Modern Sculptures" },
  { value: "MortarPestle", label: "Mortar & Pestle" },
  { value: "CuttingBoards", label: "Cutting Boards" },
  { value: "FruitBowls", label: "Fruit Bowls" },
  { value: "PenHolders", label: "Pen Holders" },
  { value: "Paperweights", label: "Paperweights" },
  { value: "Trophies", label: "Trophies" },
  { value: "TempleMandir", label: "Temple/Mandir" },
  { value: "PoojaThalis", label: "Pooja Thalis" },
  { value: "IncenseHolders", label: "Incense Holders" },
  { value: "PrayerItems", label: "Prayer Items" },
];

export const seoInputs = [
  {
    id: "metaTitle",
    name: "metaTitle",
    label: "Meta Title",
    type: "text",
    placeholder: "Enter SEO title (max 60 characters)",
  },
  {
    id: "keywords",
    name: "keywords",
    label: "Keywords",
    type: "text",
    placeholder: "Enter keywords separated by commas",
  },
];

export const ratingField = {
  id: "rating",
  name: "rating",
  label: "Rating",
  placeholder: "Select Product Rating",
  options: [
    { value: 5, label: "⭐⭐⭐⭐⭐ (5 Stars)" },
    { value: 4, label: "⭐⭐⭐⭐ (4 Stars)" },
    { value: 3, label: "⭐⭐⭐ (3 Stars)" },
    { value: 2, label: "⭐⭐ (2 Stars)" },
    { value: 1, label: "⭐ (1 Star)" },
  ],
};

export const materialTypeField = {
  id: "materialType",
  name: "materialType",
  label: "Material Type",
  placeholder: "Select Material Type",
  options: [
    { value: "WhiteMarble", label: "White Marble" },
    { value: "BlackMarble", label: "Black Marble" },
    { value: "GreenMarble", label: "Green Marble" },
    { value: "PinkMarble", label: "Pink Marble" },
    { value: "Granite", label: "Granite" },
    { value: "Sandstone", label: "Sandstone" },
  ],
};

export const categoryField = {
  id: "category",
  name: "category",
  label: "Select Category",
  placeholder: "Select Category",
  options: [
    { value: "StatuesIdols", label: "Statues & Idols" },
    { value: "HomeDecor", label: "Home Decor" },
    { value: "KitchenDining", label: "Kitchen & Dining" },
    { value: "GardenOutdoor", label: "Garden & Outdoor" },
    { value: "CorporateGifts", label: "Corporate Gifts" },
    { value: "ReligiousItems", label: "Religious Items" },
    { value: "New Arrivals", label: "New Arrivals" },
    { value: "Garden Outdoor", label: "Garden Outdoor" },
    { value: "Marble Candles", label: "Marble Candles" },
  ],
};
