import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart";
import { X, Plus, Minus } from "lucide-react";

export default function CartSidebar() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getTotalItems,
    getTotalPrice
  } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">My Basket</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={closeCart}
            className="text-bigbasket-gray hover:text-bigbasket-green"
            data-testid="button-close-cart"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-bigbasket-gray mt-1" data-testid="text-cart-items">
          {totalItems} items in basket
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 max-h-[calc(100vh-200px)]">
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Your basket is empty
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-3 p-2 border border-gray-200 rounded-lg"
                data-testid={`cart-item-${item.id}`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-xs text-bigbasket-gray">{item.size}</p>
                  <p className="text-sm font-bold">₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 bg-bigbasket-green text-white rounded-full text-xs p-0"
                    data-testid={`button-decrease-${item.id}`}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="text-sm" data-testid={`quantity-${item.id}`}>{item.quantity}</span>
                  <Button
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 bg-bigbasket-green text-white rounded-full text-xs p-0"
                    data-testid={`button-increase-${item.id}`}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold">Total:</span>
            <span className="font-bold text-lg" data-testid="text-cart-total">
              ₹{totalPrice.toFixed(2)}
            </span>
          </div>
          <Button
            className="w-full bg-bigbasket-green text-white py-3 rounded-lg font-medium hover:bg-bigbasket-dark-green transition-colors"
            data-testid="button-proceed-checkout"
          >
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
}
