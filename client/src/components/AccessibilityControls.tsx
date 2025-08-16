import { Button } from "@/components/ui/button";
import { useAccessibilityStore } from "@/stores/accessibility";
import { Contrast, Type, Plus, Minus } from "lucide-react";

export default function AccessibilityControls() {
  const { fontSize, highContrast, setFontSize, toggleContrast } = useAccessibilityStore();

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleContrast}
        className={`flex items-center text-xs px-2 py-1 ${
          highContrast ? 'text-bigbasket-green bg-green-50' : 'text-bigbasket-gray'
        } hover:text-bigbasket-green transition-colors border border-gray-200 rounded`}
        data-testid="button-toggle-contrast"
      >
        <Contrast className="w-3 h-3 mr-1" />
        Contrast
      </Button>
      
      <div className="flex items-center border border-gray-200 rounded">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setFontSize(Math.max(12, fontSize - 1))}
          className="text-xs px-2 py-1 text-bigbasket-gray hover:text-bigbasket-green"
          data-testid="button-decrease-font"
        >
          <Minus className="w-3 h-3" />
        </Button>
        <div className="flex items-center px-2">
          <Type className="w-3 h-3 mr-1 text-bigbasket-gray" />
          <span className="text-xs text-bigbasket-gray">{fontSize}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setFontSize(Math.min(18, fontSize + 1))}
          className="text-xs px-2 py-1 text-bigbasket-gray hover:text-bigbasket-green"
          data-testid="button-increase-font"
        >
          <Plus className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
