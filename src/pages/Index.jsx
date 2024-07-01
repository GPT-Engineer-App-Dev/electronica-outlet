import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const sampleProducts = [
  { id: 1, name: "Smartphone", price: 699, description: "Latest model with advanced features", category: "Electronics", available: true },
  { id: 2, name: "Laptop", price: 999, description: "High performance laptop for professionals", category: "Electronics", available: false },
  { id: 3, name: "Headphones", price: 199, description: "Noise-cancelling over-ear headphones", category: "Accessories", available: true },
];

const Index = () => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const viewProduct = (product) => {
    setSelectedProduct(product);
  };

  useEffect(() => {
    setFilteredProducts(
      sampleProducts.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (categoryFilter ? product.category === categoryFilter : true) &&
          (availabilityFilter ? product.available === (availabilityFilter === "available") : true) &&
          product.price >= priceRange[0] &&
          product.price <= priceRange[1]
        );
      })
    );
  }, [searchQuery, categoryFilter, availabilityFilter, priceRange]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center mb-6">Electronics Store</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="category">Category</Label>
        <Select onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Accessories">Accessories</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <Label htmlFor="availability">Availability</Label>
        <Select onValueChange={setAvailabilityFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="unavailable">Unavailable</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <Label htmlFor="price">Price Range</Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={1000}
          step={10}
        />
        <div className="flex justify-between">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{product.description}</p>
              <p className="font-bold">${product.price}</p>
              <div className="flex space-x-2 mt-4">
                <Button onClick={() => addToCart(product)}>Add to Cart</Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => viewProduct(product)}>View Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{selectedProduct?.name}</DialogTitle>
                    </DialogHeader>
                    <div>
                      <p>{selectedProduct?.description}</p>
                      <p className="font-bold">${selectedProduct?.price}</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Separator className="my-6" />
      <h2 className="text-2xl mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Index;