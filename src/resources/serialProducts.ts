import { Product, SerialInventory } from '@/types';

export const serialProductsData: Product[] = [
  {
    id: '1',
    buyer_identifier: 'ACME_CORP',
    supplier_identifier: 'TECH_SUPPLY_001',
    buyer_part_number: 'CPU-001-X7',
    description: 'High-performance processor unit with enhanced cooling',
    price: 299.99,
    dimensions: '40mm x 40mm x 5mm',
    created_date: new Date('2024-01-15'),
    updated_date: new Date('2024-01-20')
  },
  {
    id: '2',
    buyer_identifier: 'ACME_CORP',
    supplier_identifier: 'TECH_SUPPLY_001',
    buyer_part_number: 'MEM-002-DDR5',
    description: 'DDR5 Memory Module 32GB',
    price: 189.99,
    dimensions: '133mm x 30mm x 5mm',
    created_date: new Date('2024-01-10'),
    updated_date: new Date('2024-01-18')
  },
  {
    id: '3',
    buyer_identifier: 'BETA_SYSTEMS',
    supplier_identifier: 'COMPONENT_PLUS',
    buyer_part_number: 'SSD-003-NVMe',
    description: 'NVMe SSD 1TB High Speed Storage',
    price: 149.99,
    dimensions: '80mm x 22mm x 2.38mm',
    created_date: new Date('2024-01-12'),
    updated_date: new Date('2024-01-22')
  },
  {
    id: '4',
    buyer_identifier: 'GAMING_TECH',
    supplier_identifier: 'GRAPHICS_PRO',
    buyer_part_number: 'GPU-004-RTX',
    description: 'RTX 4070 Graphics Card 12GB GDDR6X',
    price: 599.99,
    dimensions: '285mm x 126mm x 50mm',
    created_date: new Date('2024-01-14'),
    updated_date: new Date('2024-01-24')
  },
  {
    id: '5',
    buyer_identifier: 'GAMING_TECH',
    supplier_identifier: 'GRAPHICS_PRO',
    buyer_part_number: 'MB-005-Z690',
    description: 'Intel Z690 Motherboard ATX',
    price: 249.99,
    dimensions: '305mm x 244mm x 6mm',
    created_date: new Date('2024-01-16'),
    updated_date: new Date('2024-01-26')
  },
  {
    id: '6',
    buyer_identifier: 'POWER_SOLUTIONS',
    supplier_identifier: 'ENERGY_TECH',
    buyer_part_number: 'PSU-006-850W',
    description: '850W Modular Power Supply 80+ Gold',
    price: 129.99,
    dimensions: '150mm x 86mm x 140mm',
    created_date: new Date('2024-01-18'),
    updated_date: new Date('2024-01-28')
  },
  {
    id: '7',
    buyer_identifier: 'POWER_SOLUTIONS',
    supplier_identifier: 'ENERGY_TECH',
    buyer_part_number: 'CASE-007-ATX',
    description: 'ATX Mid Tower Case with Tempered Glass',
    price: 89.99,
    dimensions: '450mm x 200mm x 450mm',
    created_date: new Date('2024-01-20'),
    updated_date: new Date('2024-01-30')
  },
  {
    id: '8',
    buyer_identifier: 'ACME_CORP',
    supplier_identifier: 'TECH_SUPPLY_001',
    buyer_part_number: 'COOL-008-AIO',
    description: '240mm All-in-One Liquid CPU Cooler',
    price: 119.99,
    dimensions: '280mm x 120mm x 27mm',
    created_date: new Date('2024-01-22'),
    updated_date: new Date('2024-02-01')
  },
  {
    id: '9',
    buyer_identifier: 'GAMING_TECH',
    supplier_identifier: 'GRAPHICS_PRO',
    buyer_part_number: 'FAN-009-120MM',
    description: '120mm PWM Case Fan with RGB',
    price: 24.99,
    dimensions: '120mm x 120mm x 25mm',
    created_date: new Date('2024-01-24'),
    updated_date: new Date('2024-02-03')
  }
];

export const serialInventoryData: SerialInventory[] = [
  {
    id: '1',
    supplier_id: 'sup1',
    buyer_id: 'buy1',
    serial_number: 'CPU001X7001',
    status: 'blocked',
    asn_id: '1',
    attributes_json: {
      'Manufacturer': 'Intel',
      'Model': 'Core i7-12700K',
      'Warranty': '3 years',
      'Batch': 'B2024-001'
    },
    created_date: new Date('2024-01-15'),
    updated_date: new Date('2024-01-20'),
    created_by: 'admin',
    updated_by: 'admin'
  },
  {
    id: '2',
    supplier_id: 'sup1',
    buyer_id: 'buy1',
    serial_number: 'CPU001X7002',
    status: 'assigned',
    asn_id: '1',
    attributes_json: {
      'Manufacturer': 'Intel',
      'Model': 'Core i7-12700K',
      'Warranty': '3 years',
      'Batch': 'B2024-002'
    },
    created_date: new Date('2024-01-16'),
    updated_date: new Date('2024-01-21'),
    created_by: 'admin',
    updated_by: 'admin'
  },
  {
    id: '3',
    supplier_id: 'sup1',
    buyer_id: 'buy1',
    serial_number: 'CPU001X7003',
    status: 'unassigned',
    attributes_json: {
      'Manufacturer': 'Intel',
      'Model': 'Core i7-12700K',
      'Warranty': '3 years',
      'Batch': 'B2024-003'
    },
    created_date: new Date('2024-01-17'),
    updated_date: new Date('2024-01-17'),
    created_by: 'admin',
    updated_by: 'admin'
  },
  {
    id: '4',
    supplier_id: 'sup1',
    buyer_id: 'buy1',
    serial_number: 'CPU001X7004',
    status: 'unassigned',
    attributes_json: {
      'Manufacturer': 'Intel',
      'Model': 'Core i7-12700K',
      'Warranty': '3 years',
      'Batch': 'B2024-004'
    },
    created_date: new Date('2024-01-18'),
    updated_date: new Date('2024-01-18'),
    created_by: 'admin',
    updated_by: 'admin'
  },
  {
    id: '5',
    supplier_id: 'sup1',
    buyer_id: 'buy1',
    serial_number: 'MEM002DDR5001',
    status: 'unassigned',
    attributes_json: {
      'Manufacturer': 'Corsair',
      'Model': 'Vengeance DDR5-5600',
      'Capacity': '32GB',
      'Batch': 'B2024-005'
    },
    created_date: new Date('2024-01-19'),
    updated_date: new Date('2024-01-19'),
    created_by: 'admin',
    updated_by: 'admin'
  },
  {
    id: '6',
    supplier_id: 'sup1',
    buyer_id: 'buy1',
    serial_number: 'MEM002DDR5002',
    status: 'blocked',
    asn_id: '1',
    attributes_json: {
      'Manufacturer': 'Corsair',
      'Model': 'Vengeance DDR5-5600',
      'Capacity': '32GB',
      'Batch': 'B2024-006'
    },
    created_date: new Date('2024-01-20'),
    updated_date: new Date('2024-01-25'),
    created_by: 'admin',
    updated_by: 'admin'
  },
  {
    id: '7',
    supplier_id: 'sup1',
    buyer_id: 'buy1',
    serial_number: 'SSD003NVME001',
    status: 'unassigned',
    attributes_json: {
      'Manufacturer': 'Samsung',
      'Model': '970 EVO Plus',
      'Capacity': '1TB',
      'Interface': 'NVMe'
    },
    created_date: new Date('2024-01-21'),
    updated_date: new Date('2024-01-21'),
    created_by: 'admin',
    updated_by: 'admin'
  },
  {
    id: '8',
    supplier_id: 'sup1',
    buyer_id: 'buy1',
    serial_number: 'SSD003NVME002',
    status: 'assigned',
    asn_id: '1',
    attributes_json: {
      'Manufacturer': 'Samsung',
      'Model': '970 EVO Plus',
      'Capacity': '1TB',
      'Interface': 'NVMe'
    },
    created_date: new Date('2024-01-22'),
    updated_date: new Date('2024-01-27'),
    created_by: 'admin',
    updated_by: 'admin'
  }
]; 