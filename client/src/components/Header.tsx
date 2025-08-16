import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/stores/cart";
import AccessibilityControls from "./AccessibilityControls";
import { Search, Mic, MapPin, User, ShoppingCart, ChevronDown, Truck } from "lucide-react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const { toggleCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  const handleVoiceSearch = () => {
    setIsListening(true);
    // Mock voice search functionality
    setTimeout(() => {
      setIsListening(false);
    }, 2000);
  };

  const handleSearch = () => {
    // Mock search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      {/* Top Bar with Delivery Info and Accessibility Controls */}
      <div className="bg-bigbasket-light-gray py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs">
          <div className="text-bigbasket-gray flex items-center">
            <Truck className="w-3 h-3 text-bigbasket-green mr-1" />
            Delivery in 5 mins
            <span className="ml-4 text-bigbasket-gray">Select Location</span>
          </div>
          <AccessibilityControls />
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* BigBasket Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-bigbasket-green mr-8">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-bigbasket-green rounded mr-2 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">bb</span>
                </div>
                <div>
                  <div className="text-bigbasket-green">bigbasket</div>
                  <span className="text-xs text-bigbasket-gray font-normal">TATA Enterprise</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for Products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bigbasket-green focus:border-transparent"
                data-testid="input-search"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleVoiceSearch}
                  className={`p-1 ${isListening ? 'text-red-500' : 'text-bigbasket-gray'} hover:text-bigbasket-green`}
                  data-testid="button-voice-search"
                >
                  <Mic className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleSearch}
                  className="bg-bigbasket-green text-white px-3 py-1 rounded-md hover:bg-bigbasket-dark-green transition-colors"
                  data-testid="button-search"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Location & User Actions */}
          <div className="flex items-center space-x-6">
            {/* Location Selector */}
            <Button
              variant="ghost"
              className="flex items-center text-sm hover:text-bigbasket-green transition-colors"
              data-testid="button-select-location"
            >
              <MapPin className="w-4 h-4 text-bigbasket-green mr-2" />
              <div className="text-left">
                <div className="font-medium">Select Location</div>
                <div className="text-bigbasket-gray text-xs">Choose delivery area</div>
              </div>
              <ChevronDown className="w-3 h-3 ml-2 text-bigbasket-gray" />
            </Button>

            {/* User Account */}
            <Button
              variant="ghost"
              className="text-bigbasket-gray hover:text-bigbasket-green transition-colors"
              data-testid="button-user-account"
            >
              <User className="w-6 h-6" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              onClick={toggleCart}
              className="relative text-bigbasket-gray hover:text-bigbasket-green transition-colors"
              data-testid="button-toggle-cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-bigbasket-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                  data-testid="text-cart-count"
                >
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
