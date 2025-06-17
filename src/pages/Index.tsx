import { Car, Search } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMake, setSelectedMake] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  // Load Retell AI chat widget with the new configuration
  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'retell-widget';
    script.src = 'https://dashboard.retellai.com/retell-widget.js';
    script.setAttribute('data-public-key', 'agent_17a1ad2684c84d9e8ceef2ba14');
    script.setAttribute('data-agent-id', 'agent_17a1ad2684c84d9e8ceef2ba14');
    script.setAttribute('data-agent-version', '0');
    script.setAttribute('data-title', 'Chat with us!');
    
    document.head.appendChild(script);
    
    return () => {
      const existingScript = document.getElementById('retell-widget');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  // Mock car data with more accurate car images
  const cars = [
    {
      id: 1,
      make: "BMW",
      model: "3 Series",
      year: 2023,
      price: 45000,
      mileage: 12000,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 2,
      make: "Mercedes",
      model: "C-Class",
      year: 2022,
      price: 52000,
      mileage: 8500,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: 3,
      make: "Audi",
      model: "A4",
      year: 2023,
      price: 48000,
      mileage: 5200,
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 4,
      make: "Toyota",
      model: "Camry",
      year: 2023,
      price: 28000,
      mileage: 15000,
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: 5,
      make: "Honda",
      model: "Accord",
      year: 2022,
      price: 32000,
      mileage: 22000,
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: 6,
      make: "Ford",
      model: "Mustang",
      year: 2023,
      price: 38000,
      mileage: 3500,
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 7,
      make: "Chevrolet",
      model: "Malibu",
      year: 2022,
      price: 26000,
      mileage: 18000,
      image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: 8,
      make: "Nissan",
      model: "Altima",
      year: 2023,
      price: 29000,
      mileage: 8900,
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false
    }
  ];

  // Filter cars based on search criteria
  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.model.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesMake = selectedMake === "all" || car.make.toLowerCase() === selectedMake.toLowerCase();
      
      const matchesPrice = selectedPriceRange === "all" || 
        (selectedPriceRange === "under30k" && car.price < 30000) ||
        (selectedPriceRange === "30k-50k" && car.price >= 30000 && car.price < 50000) ||
        (selectedPriceRange === "over50k" && car.price >= 50000);
      
      const matchesYear = selectedYear === "all" || car.year.toString() === selectedYear;
      
      return matchesSearch && matchesMake && matchesPrice && matchesYear;
    });
  }, [searchTerm, selectedMake, selectedPriceRange, selectedYear, cars]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-3 rounded-xl">
                <Car className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                  Caboodle Cars
                </h1>
                <p className="text-sm text-slate-600">Your Trusted Car Dealer</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700">
              Contact Us
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">Find Your Perfect Car</h2>
          <p className="text-xl mb-8 text-amber-100">
            Premium vehicles, exceptional service, unbeatable prices at Caboodle Cars
          </p>
          <div className="flex items-center justify-center space-x-2 text-amber-200">
            <Car className="h-6 w-6" />
            <span className="text-lg font-semibold">Over 100+ Cars Available</span>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="bg-white shadow-lg -mt-8 mx-4 rounded-2xl relative z-10">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Search Cars
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="Search by make or model..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Make</label>
              <Select value={selectedMake} onValueChange={setSelectedMake}>
                <SelectTrigger>
                  <SelectValue placeholder="All Makes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Makes</SelectItem>
                  <SelectItem value="bmw">BMW</SelectItem>
                  <SelectItem value="mercedes">Mercedes</SelectItem>
                  <SelectItem value="audi">Audi</SelectItem>
                  <SelectItem value="toyota">Toyota</SelectItem>
                  <SelectItem value="honda">Honda</SelectItem>
                  <SelectItem value="ford">Ford</SelectItem>
                  <SelectItem value="chevrolet">Chevrolet</SelectItem>
                  <SelectItem value="nissan">Nissan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Price Range</label>
              <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="All Prices" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under30k">Under $30k</SelectItem>
                  <SelectItem value="30k-50k">$30k - $50k</SelectItem>
                  <SelectItem value="over50k">Over $50k</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Year</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-3xl font-bold text-slate-800">Available Cars</h3>
            <p className="text-slate-600 mt-1">
              Showing {filteredCars.length} of {cars.length} vehicles
            </p>
          </div>
          <div className="flex items-center space-x-2 text-amber-600">
            <Car className="h-5 w-5" />
            <span className="font-semibold">Caboodle Cars</span>
          </div>
        </div>

        {filteredCars.length === 0 ? (
          <div className="text-center py-12">
            <Car className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-slate-600 mb-2">No cars found</h4>
            <p className="text-slate-500">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCars.map((car) => (
              <Card key={car.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {car.featured && (
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                      Featured
                    </Badge>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Car className="h-4 w-4 text-amber-600" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-bold text-slate-800">
                        {car.make} {car.model}
                      </h4>
                      <p className="text-slate-600 text-sm">{car.year}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-amber-600">
                        {formatPrice(car.price)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                    <span>{car.mileage.toLocaleString()} miles</span>
                    <span className="text-amber-600 font-medium">Caboodle Cars</span>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-3 rounded-xl">
                  <Car className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Caboodle Cars</h3>
                  <p className="text-slate-400">Your Trusted Car Dealer</p>
                </div>
              </div>
              <p className="text-slate-300 mb-4">
                At Caboodle Cars, we pride ourselves on providing exceptional vehicles 
                and outstanding customer service. Find your perfect car today!
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Inventory</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Financing</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Trade-In</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-slate-300">
                <li>📍 123 Car Street, Auto City</li>
                <li>📞 (555) 123-CARS</li>
                <li>✉️ info@caboodlecars.com</li>
                <li>🕒 Mon-Sat: 9AM-8PM</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-slate-400">
              © 2024 Caboodle Cars. All rights reserved. | Your trusted automotive partner.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
