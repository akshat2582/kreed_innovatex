import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const categoryTabs = [
  { id: "fruits", label: "Exotic Fruits & Vegetables" },
  { id: "tea", label: "Tea" },
  { id: "ghee", label: "Ghee" },
  { id: "dairy", label: "Nandhini" },
  { id: "vegetables", label: "Fresh Vegetables" },
  { id: "snacks", label: "Smart Basket" },
  { id: "offers", label: "BB Royal" }
];

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="bg-bigbasket-light-gray border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-8 overflow-x-auto py-3">
          {categoryTabs.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              onClick={() => onCategoryChange(category.id)}
              className={`whitespace-nowrap text-sm font-medium pb-2 border-b-2 transition-colors ${
                activeCategory === category.id
                  ? 'text-bigbasket-green border-bigbasket-green'
                  : 'text-bigbasket-gray border-transparent hover:text-bigbasket-green'
              }`}
              data-testid={`button-category-${category.id}`}
            >
              {category.label}
            </Button>
          ))}
          <ChevronRight className="w-4 h-4 text-bigbasket-gray cursor-pointer hover:text-bigbasket-green" />
        </div>
      </div>
    </div>
  );
}
