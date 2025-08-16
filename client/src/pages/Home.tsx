import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import CompactCategories from "@/components/CompactCategories";
import SmartBasket from "@/components/SmartBasket";
import ProductGrid from "@/components/ProductGrid";
import CartSidebar from "@/components/CartSidebar";
import MobileCartBar from "@/components/MobileCartBar";
import CitiesFooter from "@/components/CitiesFooter";
import type { Category } from "@shared/schema";

export default function Home() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>();

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  const getSelectedCategory = () => {
    return categories?.find(cat => cat.id === selectedCategoryId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-4" style={{ paddingBottom: '100px' }}>
        {/* Categories Section - Before Smart Basket */}
        <CompactCategories onCategorySelect={handleCategorySelect} />
        
        {/* Smart Basket Section */}
        <SmartBasket />
        
        {/* Main Products Grid */}
        <ProductGrid 
          categoryId={selectedCategoryId} 
          title={selectedCategoryId ? getSelectedCategory()?.name || "Products" : "Dairy, Bread & Eggs"}
        />
      </main>

      <CartSidebar />
      <MobileCartBar />
      <CitiesFooter />
    </div>
  );
}
