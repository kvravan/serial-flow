import { SerialInventory } from '@/types';

export const serialInventoryData: SerialInventory[] = [
  {
    id: '1',
    supplier_id: 'sup1',
    buyer_id: 'buy1',
    part_number_id: '1',
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
    part_number_id: '1',
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
    part_number_id: '1',
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
    part_number_id: '1',
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
    part_number_id: '2',
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
    part_number_id: '2',
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
    part_number_id: '3',
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
    part_number_id: '3',
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