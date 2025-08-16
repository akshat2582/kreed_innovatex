import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart";
import type { Product } from "@shared/schema";
import { Clock } from "lucide-react";

interface ProductGridProps {
  categoryId?: string;
  title?: string;
}

export default function ProductGrid({ categoryId, title = "Products" }: ProductGridProps) {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: categoryId ? ["/api/products", { category: categoryId }] : ["/api/products"],
  });

  const addItem = useCartStore(state => state.addItem);

  // Filter out smart basket products for regular grid
  const regularProducts = products?.filter(p => !p.isSmartBasket) || [];

  if (isLoading) {
    return (
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-3 animate-pulse">
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (regularProducts.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
        <div className="text-center py-8 text-gray-500">
          No products found in this category.
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {regularProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg border border-gray-200 p-2 hover:shadow-md transition-shadow"
            data-testid={`product-card-${product.id}`}
          >
            <div className="relative">
              <span className="absolute top-2 left-2 bg-bigbasket-orange text-white text-xs px-1 py-0.5 rounded font-medium">
                {product.deliveryTime}
              </span>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-24 object-cover rounded-lg mb-2"
              />
            </div>

            <div className="space-y-1">
              <h3 className="text-xs font-medium text-gray-800 line-clamp-2 leading-tight">{product.name}</h3>
              <p className="text-xs text-bigbasket-gray">{product.size}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-800" data-testid={`price-${product.id}`}>
                  ₹{product.price}
                </span>
              </div>
              <Button
                onClick={() => addItem(product)}
                className="w-full bg-bigbasket-green text-white py-1 rounded text-xs font-medium hover:bg-bigbasket-dark-green transition-colors"
                data-testid={`button-add-${product.id}`}
              >
                ADD
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
