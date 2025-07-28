import { ASN } from '@/types';

export interface ASNSerialAssignment {
  id: string;
  supplier_id: string;
  part_number_id: string;
  serial_number: string;
  line_id: string;
  lot_line_id: string;
  package_id: string;
  assigned_date: Date;
}

export const serialASNsData: ASN[] = [
  {
    id: '1',
    supplier_id: 'sup1',
    buyer_id: 'buy1',
    asn_number: 'ASN-2024-001',
    status: 'draft',
    ship_date: new Date('2024-02-15'),
    delivery_date: new Date('2024-02-20'),
    created_date: new Date('2024-01-15'),
    updated_date: new Date('2024-01-20'),
    serialAssignments: [
      {
        id: '1',
        supplier_id: 'sup1',
        part_number_id: '1',
        serial_number: 'CPU001X7001',
        line_id: 'item1',
        lot_line_id: 'lot1',
        package_id: 'package1',
        assigned_date: new Date('2024-01-15')
      },
      {
        id: '2',
        supplier_id: 'sup1',
        part_number_id: '1',
        serial_number: 'CPU001X7002',
        line_id: 'item1',
        lot_line_id: 'lot1',
        package_id: 'package1',
        assigned_date: new Date('2024-01-16')
      }
    ],
    items: [
      {
        id: 'item1',
        asn_id: '1',
        buyer_part_number: 'CPU-001-X7',
        ship_quantity: 10,
        lots: [
          {
            id: 'lot1',
            item_id: 'item1',
            lot_number: 'LOT001',
            quantity: 5
          },
          {
            id: 'lot2',
            item_id: 'item1',
            lot_number: 'LOT002',
            quantity: 5
          }
        ]
      },
      {
        id: 'item2',
        asn_id: '1',
        buyer_part_number: 'MEM-002-DDR5',
        ship_quantity: 20,
        lots: [
          {
            id: 'lot3',
            item_id: 'item2',
            lot_number: 'LOT003',
            quantity: 15
          },
          {
            id: 'lot4',
            item_id: 'item2',
            lot_number: 'LOT004',
            quantity: 5
          }
        ]
      },
      {
        id: 'item3',
        asn_id: '1',
        buyer_part_number: 'SSD-003-NVMe',
        ship_quantity: 8,
        lots: [
          {
            id: 'lot5',
            item_id: 'item3',
            lot_number: 'LOT005',
            quantity: 8
          }
        ]
      },
      {
        id: 'item8',
        asn_id: '1',
        buyer_part_number: 'COOL-008-AIO',
        ship_quantity: 5,
        lots: [
          {
            id: 'lot8',
            item_id: 'item8',
            lot_number: 'LOT008',
            quantity: 5
          }
        ]
      }
    ]
  },
  {
    id: '2',
    supplier_id: 'sup2',
    buyer_id: 'buy2',
    asn_number: 'ASN-2024-002',
    status: 'submitted',
    ship_date: new Date('2024-02-20'),
    delivery_date: new Date('2024-02-25'),
    created_date: new Date('2024-01-18'),
    updated_date: new Date('2024-01-25'),
    serialAssignments: [
      {
        id: '3',
        supplier_id: 'sup1',
        part_number_id: '2',
        serial_number: 'MEM002DDR5002',
        line_id: 'item2',
        lot_line_id: 'lot3',
        package_id: 'package2',
        assigned_date: new Date('2024-01-20')
      }
    ],
    items: [
      {
        id: 'item4',
        asn_id: '2',
        buyer_part_number: 'GPU-004-RTX',
        ship_quantity: 5,
        lots: [
          {
            id: 'lot6',
            item_id: 'item4',
            lot_number: 'LOT006',
            quantity: 5
          }
        ]
      },
      {
        id: 'item5',
        asn_id: '2',
        buyer_part_number: 'MB-005-Z690',
        ship_quantity: 8,
        lots: [
          {
            id: 'lot7',
            item_id: 'item5',
            lot_number: 'LOT007',
            quantity: 8
          }
        ]
      }
    ]
  },
  {
    id: '3',
    supplier_id: 'sup3',
    buyer_id: 'buy3',
    asn_number: 'ASN-2024-003',
    status: 'received',
    ship_date: new Date('2024-02-10'),
    delivery_date: new Date('2024-02-15'),
    created_date: new Date('2024-01-20'),
    updated_date: new Date('2024-01-30'),
    serialAssignments: [
      {
        id: '4',
        supplier_id: 'sup1',
        part_number_id: '3',
        serial_number: 'SSD003NVME002',
        line_id: 'item3',
        lot_line_id: 'lot5',
        package_id: 'package3',
        assigned_date: new Date('2024-01-22')
      }
    ],
    items: [
      {
        id: 'item6',
        asn_id: '3',
        buyer_part_number: 'PSU-006-850W',
        ship_quantity: 12,
        lots: [
          {
            id: 'lot9',
            item_id: 'item6',
            lot_number: 'LOT009',
            quantity: 12
          }
        ]
      },
      {
        id: 'item7',
        asn_id: '3',
        buyer_part_number: 'CASE-007-ATX',
        ship_quantity: 15,
        lots: [
          {
            id: 'lot10',
            item_id: 'item7',
            lot_number: 'LOT010',
            quantity: 15
          }
        ]
      }
    ]
  }
]; 