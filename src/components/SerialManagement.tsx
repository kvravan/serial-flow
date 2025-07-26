import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Plus, Download, Upload, Grid, List, Eye, Trash2 } from "lucide-react";
import { Product, SerialInventory, SerialStatus } from "@/types";
import { StatusBadge } from "./StatusBadge";

interface SerialManagementProps {
  product: Product;
  onClose: () => void;
}

// Mock serial data
const mockSerials: SerialInventory[] = [
  {
    id: '1',
    supplier_id: 'sup1',
    buyer_id: 'buy1', 
    part_number_id: '1',
    serial_number: 'CPU001X7001',
    status: 'assigned',
    created_date: new Date('2024-01-15'),
    updated_date: new Date('2024-01-20'),
    created_by: 'admin',
    updated_by: 'admin'
  },
  {
    id: '2',
    supplier_id: 'sup1',
    buyer_id: 'buy1',
    part_number_id: '1', 
    serial_number: 'CPU001X7002',
    status: 'unassigned',
    expiry_date: new Date('2025-06-15'),
    created_date: new Date('2024-01-16'),
    updated_date: new Date('2024-01-16'),
    created_by: 'admin',
    updated_by: 'admin'
  },
  {
    id: '3',
    supplier_id: 'sup1',
    buyer_id: 'buy1',
    part_number_id: '1',
    serial_number: 'CPU001X7003',
    status: 'blocked',
    created_date: new Date('2024-01-17'),
    updated_date: new Date('2024-01-22'),
    created_by: 'admin',
    updated_by: 'admin'
  }
];

export const SerialManagement = ({ product, onClose }: SerialManagementProps) => {
  const [serials, setSerials] = useState(mockSerials);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<SerialStatus | "all">("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const filteredSerials = serials.filter(serial => {
    const matchesSearch = serial.serial_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || serial.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteSerial = (serialId: string) => {
    setSerials(serials.filter(s => s.id !== serialId));
  };

  const SerialCard = ({ serial }: { serial: SerialInventory }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="font-mono text-sm font-medium">{serial.serial_number}</div>
          <StatusBadge status={serial.status} />
        </div>
        
        {serial.expiry_date && (
          <div className="text-sm text-muted-foreground mb-2">
            Expires: {serial.expiry_date.toLocaleDateString()}
          </div>
        )}
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Created: {serial.created_date.toLocaleDateString()}</span>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Eye className="h-3 w-3" />
            </Button>
            {serial.status === 'unassigned' && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                onClick={() => handleDeleteSerial(serial.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onClose} className="h-8 w-8 p-0">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Manage Serials</h2>
          <p className="text-muted-foreground">{product.buyer_part_number}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search serial numbers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as SerialStatus | "all")}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
            </SelectContent>
          </Select>
          
          <Badge variant="secondary" className="text-sm">
            {filteredSerials.length} serials
          </Badge>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Serials
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="serials">Serial Numbers</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">142</div>
                <p className="text-xs text-muted-foreground">Total Serials</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-success">89</div>
                <p className="text-xs text-muted-foreground">Assigned</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-warning">12</div>
                <p className="text-xs text-muted-foreground">Blocked</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">53</div>
                <p className="text-xs text-muted-foreground">Available</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="serials" className="space-y-4">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredSerials.map((serial) => (
                <SerialCard key={serial.id} serial={serial} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="p-4 text-sm font-medium">Serial Number</th>
                        <th className="p-4 text-sm font-medium">Status</th>
                        <th className="p-4 text-sm font-medium">Expiry Date</th>
                        <th className="p-4 text-sm font-medium">Created</th>
                        <th className="p-4 text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSerials.map((serial) => (
                        <tr key={serial.id} className="border-b last:border-b-0 hover:bg-muted/50">
                          <td className="p-4 font-mono text-sm">{serial.serial_number}</td>
                          <td className="p-4">
                            <StatusBadge status={serial.status} />
                          </td>
                          <td className="p-4 text-sm">
                            {serial.expiry_date ? serial.expiry_date.toLocaleDateString() : '-'}
                          </td>
                          <td className="p-4 text-sm">{serial.created_date.toLocaleDateString()}</td>
                          <td className="p-4">
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Eye className="h-3 w-3" />
                              </Button>
                              {serial.status === 'unassigned' && (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                                  onClick={() => handleDeleteSerial(serial.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
          
          {filteredSerials.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-lg font-medium mb-2">No serials found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or add new serial numbers.
              </p>
              <Button>Add Serial Numbers</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Serial number history and audit trail will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};