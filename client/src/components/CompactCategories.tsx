import { useQuery } from "@tanstack/react-query";
import type { Category } from "@shared/schema";

interface CompactCategoriesProps {
  onCategorySelect: (categoryId: string) => void;
}

export default function CompactCategories({ onCategorySelect }: CompactCategoriesProps) {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Shop by Category</h2>
        <div className="grid grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-3 text-center border border-gray-100 animate-pulse">
              <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-gray-200"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Shop by Category</h2>
      <div className="grid grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
        {categories?.map((category) => (
          <div
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className="bg-white rounded-lg p-2 text-center hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
            data-testid={`category-card-${category.slug}`}
          >
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-10 h-10 mx-auto mb-1 rounded-lg object-cover"
            />
            <p className="text-xs font-medium text-gray-700 leading-tight">{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
