import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const sampleProducts = [
  { id: 1, name: "Smartphone", price: 699, description: "Latest model with advanced features" },
  { id: 2, name: "Laptop", price: 999, description: "High performance laptop for professionals" },
  { id: 3, name: "Headphones", price: 199, description: "Noise-cancelling over-ear headphones" },
];

const Index = () => {
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const viewProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center mb-6">Electronics Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sampleProducts.map((product) => (
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