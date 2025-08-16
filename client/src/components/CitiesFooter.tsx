import { useQuery } from "@tanstack/react-query";
import type { City } from "@shared/schema";
import { Building } from "lucide-react";

export default function CitiesFooter() {
  const { data: cities, isLoading } = useQuery<City[]>({
    queryKey: ["/api/cities"],
  });

  if (isLoading) {
    return (
      <footer className="bg-bigbasket-dark text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Cities We Serve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="text-center animate-pulse">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gray-600 rounded mx-auto mb-2"></div>
                  <div className="h-6 bg-gray-600 rounded w-32 mx-auto"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-4 bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-600 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-bigbasket-dark text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Cities We Serve</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities?.map((city, index) => (
            <div key={city.id} className="text-center" data-testid={`city-group-${index}`}>
              <div className="mb-4">
                <Building className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <h3 className="text-xl font-semibold">{city.stateName}</h3>
              </div>
              <div className="text-sm text-gray-300 space-y-1">
                {city.cityNames.map((cityName, cityIndex) => (
                  <div key={cityIndex}>{cityName}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
