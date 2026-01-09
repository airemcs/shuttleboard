import { useState } from "react";

interface Tab {
  label: string;
  count?: number;
  value: string;
}

interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export default function Tab({ tabs, defaultValue, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);

  const handleTabClick = (value: string) => {
    setActiveTab(value);
    onChange?.(value);
  };

  return (
    <div className="flex w-full bg-[#F3F4F6] rounded-lg p-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleTabClick(tab.value)}
          className={`flex-1 px-3.5 py-2 text-sm font-sf-medium rounded-md transition-all duration-200 cursor-pointer whitespace-nowrap ${
            activeTab === tab.value
              ? "bg-white text-primary-black shadow-sm"
              : "text-[#6B7280] hover:text-primary-black"
          }`}
        >
          {tab.label}{tab.count !== undefined && ` (${tab.count})`}
        </button>
      ))}
    </div>
  );
}