import { type Category, type Product, type City, type InsertCategory, type InsertProduct, type InsertCity } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Products
  getProducts(): Promise<Product[]>;
  getProductsByCategory(categoryId: string): Promise<Product[]>;
  getSmartBasketProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Cities
  getCities(): Promise<City[]>;
  createCity(city: InsertCity): Promise<City>;
}

export class MemStorage implements IStorage {
  private categories: Map<string, Category>;
  private products: Map<string, Product>;
  private cities: Map<string, City>;

  constructor() {
    this.categories = new Map();
    this.products = new Map();
    this.cities = new Map();
    this.seedData();
  }

  private async seedData() {
    // Seed categories
    const categoryData: InsertCategory[] = [
      { name: "Fruits & Vegetables", slug: "fruits-vegetables", icon: "🥬", imageUrl: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" },
      { name: "Dairy & Eggs", slug: "dairy-eggs", icon: "🥛", imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" },
      { name: "Snacks", slug: "snacks", icon: "🍿", imageUrl: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" },
      { name: "Beverages", slug: "beverages", icon: "🥤", imageUrl: "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" },
      { name: "Pantry Staples", slug: "pantry", icon: "🌾", imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" },
      { name: "Bakery", slug: "bakery", icon: "🍞", imageUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" },
      { name: "Meat & Fish", slug: "meat-fish", icon: "🐟", imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" },
      { name: "Cleaning", slug: "cleaning", icon: "🧽", imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" },
      { name: "Personal Care", slug: "personal-care", icon: "🧴", imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" },
      { name: "Baby Care", slug: "baby-care", icon: "🍼", imageUrl: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" },
      { name: "Health", slug: "health", icon: "💊", imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" },
      { name: "Home & Kitchen", slug: "home-kitchen", icon: "🏠", imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" }
    ];

    for (const category of categoryData) {
      await this.createCategory(category);
    }

    const categories = Array.from(this.categories.values());
    const fruitsVegCat = categories.find(c => c.slug === "fruits-vegetables");
    const dairyCat = categories.find(c => c.slug === "dairy-eggs");

    // Seed smart basket products
    if (fruitsVegCat) {
      const smartBasketProducts: InsertProduct[] = [
        {
          name: "Capsicum - Green (Loose)",
          categoryId: fruitsVegCat.id,
          price: "68.00",
          originalPrice: "144.00",
          discount: 53,
          size: "1 kg",
          imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
          deliveryTime: "5 MINS",
          isSmartBasket: true
        },
        {
          name: "Carrot - Orange (Loose)",
          categoryId: fruitsVegCat.id,
          price: "74.00",
          originalPrice: "138.00",
          discount: 46,
          size: "1 kg",
          imageUrl: "https://images.unsplash.com/photo-1582515073490-39981397c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
          deliveryTime: "5 MINS",
          isSmartBasket: true
        },
        {
          name: "Cauliflower",
          categoryId: fruitsVegCat.id,
          price: "27.00",
          originalPrice: "39.00",
          discount: 31,
          size: "1 pc (approx. 400 to 600 g)",
          imageUrl: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
          deliveryTime: "5 MINS",
          isSmartBasket: true
        },
        {
          name: "Coriander Leaves",
          categoryId: fruitsVegCat.id,
          price: "121.60",
          originalPrice: "160.00",
          discount: 24,
          size: "1 kg",
          imageUrl: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
          deliveryTime: "5 MINS",
          isSmartBasket: true
        }
      ];

      for (const product of smartBasketProducts) {
        await this.createProduct(product);
      }
    }

    // Seed dairy products
    if (dairyCat) {
      const dairyProducts: InsertProduct[] = [
        {
          name: "Amul Taaza Toned Milk",
          categoryId: dairyCat.id,
          price: "29.00",
          size: "500 ml",
          imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
          deliveryTime: "5 MINS"
        },
        {
          name: "Amul Gold Full Cream Milk",
          categoryId: dairyCat.id,
          price: "35.00",
          size: "500 ml",
          imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
          deliveryTime: "5 MINS"
        },
        {
          name: "Amul Masti Pouch Curd",
          categoryId: dairyCat.id,
          price: "35.00",
          size: "400 g",
          imageUrl: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
          deliveryTime: "5 MINS"
        },
        {
          name: "Amul Salted Butter",
          categoryId: dairyCat.id,
          price: "62.00",
          size: "100 g",
          imageUrl: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
          deliveryTime: "5 MINS"
        },
        {
          name: "Amul Cow Milk",
          categoryId: dairyCat.id,
          price: "30.00",
          size: "500 ml",
          imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
          deliveryTime: "5 MINS"
        },
        {
          name: "Mother Dairy Classic Pouch Curd",
          categoryId: dairyCat.id,
          price: "35.00",
          size: "400 g",
          imageUrl: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
          deliveryTime: "9 MINS"
        },
        {
          name: "Mother Dairy Full Cream Milk",
          categoryId: dairyCat.id,
          price: "29.00",
          size: "500 ml",
          imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
          deliveryTime: "9 MINS"
        },
        {
          name: "Mother Dairy Classic Fresh Eggs",
          categoryId: dairyCat.id,
          price: "42.00",
          size: "6 pieces",
          imageUrl: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
          deliveryTime: "9 MINS"
        }
      ];

      for (const product of dairyProducts) {
        await this.createProduct(product);
      }
    }

    // Seed cities data
    const citiesData: InsertCity[] = [
      { stateName: "Andhra Pradesh", cityNames: ["Amaravati", "Anantapur", "Eluru", "Guntur", "Kadapa", "Kakinada", "Kurnool", "Nellore"] },
      { stateName: "Bihar", cityNames: ["Begusarai", "Bhagalpur", "Chhapra", "Darbhanga", "Gaya", "Hajipur", "Muzaffarpur", "Patna"] },
      { stateName: "Delhi", cityNames: ["Delhi"] },
      { stateName: "Gujarat", cityNames: ["Ahmedabad", "Anand", "Gandhinagar", "Jamnagar", "Patan", "Rajkot", "Surat", "Vadodara"] },
      { stateName: "Haryana", cityNames: ["Ambala", "Bahadurgarh", "Hisar", "Kamal", "Panipat", "Rohtak", "Sonipat"] },
      { stateName: "Karnataka", cityNames: ["Bengaluru", "Hubballi", "Kalaburagi", "Mangaluru"] },
      { stateName: "Madhya Pradesh", cityNames: ["Bhopal", "Indore", "Ujjain"] },
      { stateName: "Maharashtra", cityNames: ["Ahmednagar", "Amravati", "Aurangabad", "Ichalkaranji", "Mumbai", "Nagpur", "Nashik", "Pune", "Solapur"] },
      { stateName: "Tamil Nadu", cityNames: ["Chennai", "Coimbatore", "Hosur", "Madurai", "Salem", "Tiruchirappalli", "Vellore"] },
      { stateName: "Telangana", cityNames: ["Hyderabad", "Warangal"] },
      { stateName: "Uttar Pradesh", cityNames: ["Agra", "Aligarh", "Allahabad", "Bareilly", "Ghaziabad", "Gorakhpur", "Jhansi", "Kanpur", "Lucknow", "Meerut", "Varanasi"] },
      { stateName: "West Bengal", cityNames: ["Asansol", "Durgapur", "Kolkata", "Siliguri"] }
    ];

    for (const city of citiesData) {
      await this.createCity(city);
    }
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.categoryId === categoryId);
  }

  async getSmartBasketProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.isSmartBasket);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id,
      description: insertProduct.description || null,
      originalPrice: insertProduct.originalPrice || null,
      discount: insertProduct.discount || 0,
      deliveryTime: insertProduct.deliveryTime || "5 MINS",
      inStock: insertProduct.inStock !== undefined ? insertProduct.inStock : true,
      isSmartBasket: insertProduct.isSmartBasket || false
    };
    this.products.set(id, product);
    return product;
  }

  async getCities(): Promise<City[]> {
    return Array.from(this.cities.values());
  }

  async createCity(insertCity: InsertCity): Promise<City> {
    const id = randomUUID();
    const city: City = { 
      ...insertCity, 
      id,
      cityNames: insertCity.cityNames as string[]
    };
    this.cities.set(id, city);
    return city;
  }
}

export const storage = new MemStorage();
