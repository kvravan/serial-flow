import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Hash, FileText } from "lucide-react";
import { useSerialStore } from "@/hooks/useSerialStore";
import { SerialInventory, Product } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface AddSerialsFormProps {
  product: Product;
  onClose: () => void;
}

export const AddSerialsForm = ({ product, onClose }: AddSerialsFormProps) => {
  const { addSerials } = useSerialStore();
  const { toast } = useToast();
  
  // Single entry form
  const [singleSerial, setSingleSerial] = useState("");
  
  // Bulk generation form
  const [prefix, setPrefix] = useState("");
  const [startNumber, setStartNumber] = useState("");
  const [endNumber, setEndNumber] = useState("");
  
  // CSV import form
  const [csvData, setCsvData] = useState("");
  
  const [loading, setLoading] = useState(false);

  const handleSingleAdd = async () => {
    if (!singleSerial.trim()) return;
    
    setLoading(true);
    try {
      const newSerial: SerialInventory = {
        id: `serial_${Date.now()}`,
        supplier_id: 'sup1',
        buyer_id: 'buy1',
        part_number_id: product.id,
        serial_number: singleSerial.trim(),
        status: 'unassigned',
        created_date: new Date(),
        updated_date: new Date(),
        created_by: 'user',
        updated_by: 'user'
      };
      
      await addSerials([newSerial]);
      setSingleSerial("");
      toast({
        title: "Serial added",
        description: `Serial number ${singleSerial} added successfully.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add serial number.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBulkGenerate = async () => {
    const start = parseInt(startNumber);
    const end = parseInt(endNumber);
    
    if (!prefix.trim() || isNaN(start) || isNaN(end) || start > end) {
      toast({
        title: "Invalid input",
        description: "Please provide valid prefix and number range.",
        variant: "destructive"
      });
      return;
    }
    
    if (end - start > 1000) {
      toast({
        title: "Range too large",
        description: "Maximum 1000 serials can be generated at once.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    try {
      const serials: SerialInventory[] = [];
      for (let i = start; i <= end; i++) {
        const paddedNumber = i.toString().padStart(3, '0');
        serials.push({
          id: `serial_${Date.now()}_${i}`,
          supplier_id: 'sup1',
          buyer_id: 'buy1',
          part_number_id: product.id,
          serial_number: `${prefix}${paddedNumber}`,
          status: 'unassigned',
          created_date: new Date(),
          updated_date: new Date(),
          created_by: 'user',
          updated_by: 'user'
        });
      }
      
      await addSerials(serials);
      setPrefix("");
      setStartNumber("");
      setEndNumber("");
      
      toast({
        title: "Serials generated",
        description: `${serials.length} serial numbers generated successfully.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate serial numbers.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCsvImport = async () => {
    if (!csvData.trim()) return;
    
    const lines = csvData.trim().split('\n').filter(line => line.trim());
    const serials: SerialInventory[] = [];
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine) {
        serials.push({
          id: `serial_${Date.now()}_${Math.random()}`,
          supplier_id: 'sup1',
          buyer_id: 'buy1',
          part_number_id: product.id,
          serial_number: trimmedLine,
          status: 'unassigned',
          created_date: new Date(),
          updated_date: new Date(),
          created_by: 'user',
          updated_by: 'user'
        });
      }
    }
    
    if (serials.length === 0) {
      toast({
        title: "No data",
        description: "No valid serial numbers found in the input.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    try {
      await addSerials(serials);
      setCsvData("");
      toast({
        title: "Serials imported",
        description: `${serials.length} serial numbers imported successfully.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to import serial numbers.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getBulkPreview = () => {
    const start = parseInt(startNumber);
    const end = parseInt(endNumber);
    
    if (!prefix.trim() || isNaN(start) || isNaN(end) || start > end) {
      return [];
    }
    
    const preview = [];
    const count = Math.min(end - start + 1, 5);
    
    for (let i = 0; i < count; i++) {
      const num = start + i;
      const paddedNumber = num.toString().padStart(3, '0');
      preview.push(`${prefix}${paddedNumber}`);
    }
    
    if (end - start + 1 > 5) {
      preview.push('...');
    }
    
    return preview;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onClose} className="h-8 w-8 p-0">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Add Serial Numbers</h2>
          <p className="text-muted-foreground">{product.buyer_part_number}</p>
        </div>
      </div>

      <Tabs defaultValue="single" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="single" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Single Entry</span>
          </TabsTrigger>
          <TabsTrigger value="bulk" className="flex items-center space-x-2">
            <Hash className="h-4 w-4" />
            <span>Bulk Generate</span>
          </TabsTrigger>
          <TabsTrigger value="csv" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>CSV Import</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="single">
          <Card>
            <CardHeader>
              <CardTitle>Add Single Serial Number</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="serial-number">Serial Number</Label>
                <Input
                  id="serial-number"
                  placeholder="Enter serial number..."
                  value={singleSerial}
                  onChange={(e) => setSingleSerial(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSingleAdd()}
                />
              </div>
              <Button 
                onClick={handleSingleAdd} 
                disabled={!singleSerial.trim() || loading}
                className="w-full"
              >
                {loading ? "Adding..." : "Add Serial Number"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Generate Serial Numbers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prefix">Prefix</Label>
                  <Input
                    id="prefix"
                    placeholder="e.g., CPU001X7"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start">Start Number</Label>
                  <Input
                    id="start"
                    type="number"
                    placeholder="1"
                    value={startNumber}
                    onChange={(e) => setStartNumber(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end">End Number</Label>
                  <Input
                    id="end"
                    type="number"
                    placeholder="100"
                    value={endNumber}
                    onChange={(e) => setEndNumber(e.target.value)}
                  />
                </div>
              </div>
              
              {getBulkPreview().length > 0 && (
                <div className="space-y-2">
                  <Label>Preview ({parseInt(endNumber) - parseInt(startNumber) + 1 || 0} total)</Label>
                  <div className="flex flex-wrap gap-2">
                    {getBulkPreview().map((serial, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {serial}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <Button 
                onClick={handleBulkGenerate} 
                disabled={!prefix.trim() || !startNumber || !endNumber || loading}
                className="w-full"
              >
                {loading ? "Generating..." : `Generate ${parseInt(endNumber) - parseInt(startNumber) + 1 || 0} Serial Numbers`}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="csv">
          <Card>
            <CardHeader>
              <CardTitle>Import from CSV</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="csv-data">Serial Numbers (one per line)</Label>
                <Textarea
                  id="csv-data"
                  placeholder="SN001&#10;SN002&#10;SN003"
                  value={csvData}
                  onChange={(e) => setCsvData(e.target.value)}
                  rows={10}
                />
              </div>
              
              {csvData.trim() && (
                <div className="text-sm text-muted-foreground">
                  {csvData.trim().split('\n').filter(line => line.trim()).length} serial numbers to import
                </div>
              )}
              
              <Button 
                onClick={handleCsvImport} 
                disabled={!csvData.trim() || loading}
                className="w-full"
              >
                {loading ? "Importing..." : "Import Serial Numbers"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};