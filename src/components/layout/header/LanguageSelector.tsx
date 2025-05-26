
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages } from "lucide-react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ro", name: "Română", flag: "🇲🇩" },
  { code: "uk", name: "Українська", flag: "🇺🇦" },
];

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState("en");

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    // TODO: Implement language switching logic
    console.log("Language changed to:", value);
  };

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  return (
    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-auto border-none bg-transparent hover:bg-gray-100 focus:ring-0 focus:ring-offset-0">
        <div className="flex items-center gap-2">
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage?.flag}</span>
          <span className="hidden md:inline">{currentLanguage?.name}</span>
        </div>
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray-200 shadow-lg">
        {languages.map((language) => (
          <SelectItem 
            key={language.code} 
            value={language.code}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50"
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
