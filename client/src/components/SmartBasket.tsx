import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart";
import type { Product } from "@shared/schema";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";

export default function SmartBasket() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/smart-basket"],
  });

  const addItem = useCartStore(state => state.addItem);

  if (isLoading) {
    return (
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">My Smart Basket</h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-3 animate-pulse">
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-3"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">My Smart Basket</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            className="text-bigbasket-green hover:text-bigbasket-dark-green font-medium text-sm"
            data-testid="button-view-all-smart"
          >
            View All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-bigbasket-gray hover:text-bigbasket-green"
            data-testid="button-scroll-previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-bigbasket-gray hover:text-bigbasket-green"
            data-testid="button-scroll-next"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {products?.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg border border-gray-200 p-2 hover:shadow-md transition-shadow"
            data-testid={`smart-product-${product.id}`}
          >
            <div className="relative">
              {(product.discount || 0) > 0 && (
                <span className="absolute top-2 left-2 bg-bigbasket-green text-white text-xs px-2 py-1 rounded-full font-medium">
                  {product.discount}% OFF
                </span>
              )}
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-24 object-cover rounded-lg mb-2"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center text-xs text-bigbasket-orange">
                <Clock className="w-3 h-3 mr-1" />
                <span>{product.deliveryTime}</span>
              </div>

              <h3 className="text-xs font-medium text-gray-800 line-clamp-2 leading-tight">{product.name}</h3>

              <p className="text-xs text-bigbasket-gray">{product.size}</p>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-gray-800">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through ml-1">₹{product.originalPrice}</span>
                  )}
                </div>
              </div>

              <Button
                onClick={() => addItem(product)}
                className="w-full bg-white border-2 border-bigbasket-green text-bigbasket-green py-1 rounded text-xs font-medium hover:bg-bigbasket-green hover:text-white transition-colors"
                data-testid={`button-add-smart-${product.id}`}
              >
                Add to Basket
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
