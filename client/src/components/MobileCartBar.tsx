import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart";

export default function MobileCartBar() {
  const { items, toggleCart, getTotalItems, getTotalPrice } = useCartStore();
  
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-bigbasket-green text-white p-4 lg:hidden z-40">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm" data-testid="text-mobile-cart-items">{totalItems} items</span>
          <span className="font-bold text-lg ml-2" data-testid="text-mobile-cart-total">
            ₹{totalPrice.toFixed(2)}
          </span>
        </div>
        <Button
          onClick={toggleCart}
          className="bg-white text-bigbasket-green px-6 py-2 rounded-lg font-medium hover:bg-gray-100"
          data-testid="button-view-cart-mobile"
        >
          View Cart
        </Button>
      </div>
    </div>
  );
}
