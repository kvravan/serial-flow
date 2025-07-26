import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Package, Settings, BarChart3 } from "lucide-react";
import { Product } from "@/types";
import { SerialManagement } from "./SerialManagement";

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetail = ({ product, onClose }: ProductDetailProps) => {
  const [showSerialManagement, setShowSerialManagement] = useState(false);

  if (showSerialManagement) {
    return (
      <SerialManagement 
        product={product}
        onClose={() => setShowSerialManagement(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onClose} className="h-8 w-8 p-0">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center space-x-3">
          <Package className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">{product.buyer_part_number}</h2>
          <Badge variant="outline">{product.buyer_identifier}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Product Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <p className="mt-1">{product.description}</p>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Buyer Identifier</label>
                <p className="mt-1 font-mono text-sm">{product.buyer_identifier}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Supplier Identifier</label>
                <p className="mt-1 font-mono text-sm">{product.supplier_identifier}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Part Number</label>
                <p className="mt-1 font-mono text-sm">{product.buyer_part_number}</p>
              </div>
              {product.price && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Price</label>
                  <p className="mt-1 font-semibold">${product.price}</p>
                </div>
              )}
            </div>
            
            {product.dimensions && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Dimensions</label>
                <p className="mt-1 font-mono text-sm">{product.dimensions}</p>
              </div>
            )}
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Created Date</label>
                <p className="mt-1">{product.created_date.toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Updated Date</label>
                <p className="mt-1">{product.updated_date.toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Serial Number Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">142</div>
                <div className="text-sm text-muted-foreground">Total Serials</div>
              </div>
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success">89</div>
                <div className="text-sm text-muted-foreground">Assigned</div>
              </div>
              <div className="text-center p-4 bg-secondary/50 rounded-lg">
                <div className="text-2xl font-bold">53</div>
                <div className="text-sm text-muted-foreground">Available</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Blocked</span>
                <Badge variant="warning">12</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>With Expiry Date</span>
                <Badge variant="outline">8</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>With Custom Attributes</span>
                <Badge variant="outline">24</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button 
          variant="outline"
          onClick={() => setShowSerialManagement(true)}
          className="flex items-center space-x-2"
        >
          <Settings className="h-4 w-4" />
          <span>Manage Serials</span>
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button>
          Save Changes
        </Button>
      </div>
    </div>
  );
};