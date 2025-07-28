import { SerialInventory, ASN, Product, ASNSerialAssignment } from '@/types';
import { serialProductsData, serialInventoryData } from '@/resources/serialProducts';
import { serialASNsData } from '@/resources/serialASNs';

// Global State Interface
export interface GlobalState {
  // Core Data
  serials: SerialInventory[];
  asns: ASN[];
  products: Product[];
  
  // UI State
  ui: {
    activeTab: string;
    selectedSerial: SerialInventory | null;
    selectedASN: ASN | null;
    selectedProduct: Product | null;
    searchTerms: {
      serials: string;
      asns: string;
      products: string;
    };
    filters: {
      serialStatus: SerialInventory['status'] | 'all';
      asnStatus: ASN['status'] | 'all';
    };
    modals: {
      serialDetail: boolean;
      asnDetail: boolean;
      addSerial: boolean;
      addASN: boolean;
      assignSerials: boolean;
      uploadChildSerials: boolean;
      importSerials: boolean;
    };
  };
  
  // System State
  system: {
    loading: boolean;
    lastUpdated: number;
    errors: string[];
  };
}

// Default State
const defaultState: GlobalState = {
  serials: [],
  asns: [],
  products: [],
  ui: {
    activeTab: 'products',
    selectedSerial: null,
    selectedASN: null,
    selectedProduct: null,
    searchTerms: {
      serials: '',
      asns: '',
      products: ''
    },
    filters: {
      serialStatus: 'all',
      asnStatus: 'all'
    },
    modals: {
      serialDetail: false,
      asnDetail: false,
      addSerial: false,
      addASN: false,
      assignSerials: false,
      uploadChildSerials: false,
      importSerials: false
    }
  },
  system: {
    loading: false,
    lastUpdated: Date.now(),
    errors: []
  }
};

// Global Store Manager Class
class GlobalStoreManager {
  private state: GlobalState = defaultState;
  private subscribers: Set<(state: GlobalState) => void> = new Set();
  private db: IDBDatabase | null = null;
  
  private readonly DB_NAME = 'GlobalStateDB';
  private readonly DB_VERSION = 1;
  private readonly STORE_NAME = 'globalState';

  // Initialize IndexedDB
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        this.loadState().then(() => resolve());
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          db.createObjectStore(this.STORE_NAME);
        }
      };
    });
  }

  // Subscribe to state changes
  subscribe(callback: (state: GlobalState) => void): () => void {
    this.subscribers.add(callback);
    // Immediately call with current state
    callback(this.state);
    
    return () => this.subscribers.delete(callback);
  }

  // Get current state
  getState(): GlobalState {
    return { ...this.state };
  }

  // Update state
  setState(updater: (state: GlobalState) => Partial<GlobalState>): void {
    const updates = updater(this.state);
    this.state = {
      ...this.state,
      ...updates,
      system: {
        ...this.state.system,
        ...updates.system,
        lastUpdated: Date.now()
      }
    };
    
    this.notifySubscribers();
    this.saveState();
  }

  // Notify all subscribers
  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback(this.state));
  }

  // Load state from IndexedDB
  private async loadState(): Promise<void> {
    if (!this.db) return;
    
    try {
      const transaction = this.db.transaction([this.STORE_NAME], 'readonly');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.get('state');
      
      return new Promise((resolve) => {
        request.onsuccess = () => {
          if (request.result) {
            this.state = {
              ...defaultState,
              ...request.result,
              system: {
                ...defaultState.system,
                ...request.result.system,
                lastUpdated: Date.now()
              }
            };
          } else {
            // Initialize with default data if no state exists
            this.state = {
              ...defaultState,
              serials: this.getDefaultSerials(),
              asns: this.getDefaultASNs(),
              products: this.getDefaultProducts()
            };
          }
          this.notifySubscribers();
          resolve();
        };
        
        request.onerror = () => {
          console.error('Failed to load state from IndexedDB');
          this.state = {
            ...defaultState,
            serials: this.getDefaultSerials(),
            asns: this.getDefaultASNs(),
            products: this.getDefaultProducts()
          };
          this.notifySubscribers();
          resolve();
        };
      });
    } catch (error) {
      console.error('Error loading state:', error);
    }
  }

  // Save state to IndexedDB
  private async saveState(): Promise<void> {
    if (!this.db) return;
    
    try {
      const transaction = this.db.transaction([this.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);
      store.put(this.state, 'state');
    } catch (error) {
      console.error('Error saving state:', error);
    }
  }

  // Action methods for data manipulation
  addSerials(serials: SerialInventory[]): void {
    this.setState(state => ({
      serials: [...state.serials, ...serials]
    }));
  }

  updateSerial(updatedSerial: SerialInventory): void {
    this.setState(state => ({
      serials: state.serials.map(serial => 
        serial.id === updatedSerial.id ? updatedSerial : serial
      )
    }));
  }

  deleteSerial(serialId: string): void {
    this.setState(state => ({
      serials: state.serials.filter(serial => serial.id !== serialId)
    }));
  }



  addASN(asn: ASN): void {
    this.setState(state => ({
      asns: [...state.asns, asn]
    }));
  }

  updateASN(updatedASN: ASN): void {
    const oldASN = this.state.asns.find(asn => asn.id === updatedASN.id);
    
    this.setState(state => ({
      asns: state.asns.map(asn => 
        asn.id === updatedASN.id ? updatedASN : asn
      )
    }));

    // Update serial statuses for all assignments in this ASN if status changed
    if (oldASN && oldASN.status !== updatedASN.status && updatedASN.serialAssignments) {
      updatedASN.serialAssignments.forEach(assignment => {
        if (updatedASN.status === 'submitted') {
          this.updateSerialStatusBySerialNumber(assignment.serial_number, 'assigned', updatedASN.id);
        } else {
          this.updateSerialStatusBySerialNumber(assignment.serial_number, 'blocked', updatedASN.id);
        }
      });
    }
  }

  deleteASN(asnId: string): void {
    this.setState(state => ({
      asns: state.asns.filter(asn => asn.id !== asnId)
    }));
  }

  addProduct(product: Product): void {
    this.setState(state => ({
      products: [...state.products, product]
    }));
  }

  updateProduct(updatedProduct: Product): void {
    this.setState(state => ({
      products: state.products.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    }));
  }

  deleteProduct(productId: string): void {
    this.setState(state => ({
      products: state.products.filter(product => product.id !== productId)
    }));
  }

  // UI State Actions
  setActiveTab(tab: string): void {
    this.setState(state => ({
      ui: { ...state.ui, activeTab: tab }
    }));
  }

  setSelectedSerial(serial: SerialInventory | null): void {
    this.setState(state => ({
      ui: { ...state.ui, selectedSerial: serial }
    }));
  }

  setSelectedASN(asn: ASN | null): void {
    this.setState(state => ({
      ui: { ...state.ui, selectedASN: asn }
    }));
  }

  setSelectedProduct(product: Product | null): void {
    this.setState(state => ({
      ui: { ...state.ui, selectedProduct: product }
    }));
  }

  setSearchTerm(type: 'serials' | 'asns' | 'products', term: string): void {
    this.setState(state => ({
      ui: {
        ...state.ui,
        searchTerms: { ...state.ui.searchTerms, [type]: term }
      }
    }));
  }

  setFilter(type: 'serialStatus' | 'asnStatus', value: any): void {
    this.setState(state => ({
      ui: {
        ...state.ui,
        filters: { ...state.ui.filters, [type]: value }
      }
    }));
  }

  toggleModal(modal: keyof GlobalState['ui']['modals'], open?: boolean): void {
    this.setState(state => ({
      ui: {
        ...state.ui,
        modals: {
          ...state.ui.modals,
          [modal]: open !== undefined ? open : !state.ui.modals[modal]
        }
      }
    }));
  }

  // System State Actions
  setLoading(loading: boolean): void {
    this.setState(state => ({
      system: { ...state.system, loading }
    }));
  }

  addError(error: string): void {
    this.setState(state => ({
      system: {
        ...state.system,
        errors: [...state.system.errors, error]
      }
    }));
  }

  clearErrors(): void {
    this.setState(state => ({
      system: { ...state.system, errors: [] }
    }));
  }

  // Computed/Derived State Methods
  getSerialsByStatus(status: SerialInventory['status']): SerialInventory[] {
    return this.state.serials.filter(s => s.status === status);
  }

  getSerialsByASN(asnId: string): SerialInventory[] {
    return this.state.serials.filter(s => s.asn_id === asnId);
  }

  getSerialsByPartNumber(partNumberId: string): SerialInventory[] {
    // Since we removed part_number_id, we'll need to implement this differently
    // For now, return all serials - this can be enhanced later with product association logic
    return this.state.serials;
  }

  getSerialCounts(): {
    total: number;
    unassigned: number;
    blocked: number;
    assigned: number;
  } {
    return {
      total: this.state.serials.length,
      unassigned: this.state.serials.filter(s => s.status === 'unassigned').length,
      blocked: this.state.serials.filter(s => s.status === 'blocked').length,
      assigned: this.state.serials.filter(s => s.status === 'assigned').length,
    };
  }

  getFilteredSerials(): SerialInventory[] {
    const { searchTerms, filters } = this.state.ui;
    let filtered = this.state.serials;

    // Apply status filter
    if (filters.serialStatus !== 'all') {
      filtered = filtered.filter(s => s.status === filters.serialStatus);
    }

    // Apply search term
    if (searchTerms.serials) {
      const term = searchTerms.serials.toLowerCase();
      filtered = filtered.filter(s => 
        s.serial_number.toLowerCase().includes(term)
      );
    }

    return filtered;
  }

  getFilteredASNs(): ASN[] {
    const { searchTerms, filters } = this.state.ui;
    let filtered = this.state.asns;

    // Apply status filter
    if (filters.asnStatus !== 'all') {
      filtered = filtered.filter(a => a.status === filters.asnStatus);
    }

    // Apply search term
    if (searchTerms.asns) {
      const term = searchTerms.asns.toLowerCase();
      filtered = filtered.filter(a => 
        a.asn_number.toLowerCase().includes(term)
      );
    }

    return filtered;
  }

  getFilteredProducts(): Product[] {
    const { searchTerms } = this.state.ui;
    let filtered = this.state.products;

    // Apply search term
    if (searchTerms.products) {
      const term = searchTerms.products.toLowerCase();
      filtered = filtered.filter(p => 
        p.buyer_part_number.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
    }

    return filtered;
  }

  // Default data methods using TypeScript files from resources
  private getDefaultSerials(): SerialInventory[] {
    return serialInventoryData;
  }

  private getDefaultASNs(): ASN[] {
    return serialASNsData;
  }

  private getDefaultProducts(): Product[] {
    return serialProductsData;
  }

  // ASN Serial Assignment Methods (working with ASN-embedded assignments)
  addASNSerialAssignment(asnId: string, assignment: ASNSerialAssignment): void {
    this.setState(state => ({
      asns: state.asns.map(asn => 
        asn.id === asnId 
          ? { 
              ...asn, 
              serialAssignments: [...(asn.serialAssignments || []), assignment],
              updated_date: new Date()
            }
          : asn
      )
    }));
    
    // Update serial status based on ASN status
    const asn = this.state.asns.find(a => a.id === asnId);
    if (asn) {
      if (asn.status === 'submitted') {
        this.updateSerialStatusBySerialNumber(assignment.serial_number, 'assigned', asn.id);
      } else {
        this.updateSerialStatusBySerialNumber(assignment.serial_number, 'blocked', asn.id);
      }
    }
  }

  updateASNSerialAssignment(asnId: string, assignmentId: string, updatedAssignment: ASNSerialAssignment): void {
    this.setState(state => ({
      asns: state.asns.map(asn => 
        asn.id === asnId 
          ? { 
              ...asn, 
              serialAssignments: (asn.serialAssignments || []).map(assignment =>
                assignment.id === assignmentId ? updatedAssignment : assignment
              ),
              updated_date: new Date()
            }
          : asn
      )
    }));
  }

  deleteASNSerialAssignment(asnId: string, assignmentId: string): void {
    this.setState(state => ({
      asns: state.asns.map(asn => 
        asn.id === asnId 
          ? { 
              ...asn, 
              serialAssignments: (asn.serialAssignments || []).filter(assignment => assignment.id !== assignmentId),
              updated_date: new Date()
            }
          : asn
      )
    }));
  }

  getASNSerialAssignmentsByASN(asnId: string): ASNSerialAssignment[] {
    const asn = this.state.asns.find(a => a.id === asnId);
    return asn?.serialAssignments || [];
  }

  getASNSerialAssignmentsBySerial(serialNumber: string): ASNSerialAssignment[] {
    const assignments: ASNSerialAssignment[] = [];
    this.state.asns.forEach(asn => {
      if (asn.serialAssignments) {
        assignments.push(...asn.serialAssignments.filter(assignment => 
          assignment.serial_number === serialNumber
        ));
      }
    });
    return assignments;
  }

  // Helper method to update serial status by serial number
  private updateSerialStatusBySerialNumber(serialNumber: string, status: SerialInventory['status'], asnId?: string): void {
    this.setState(state => ({
      serials: state.serials.map(serial =>
        serial.serial_number === serialNumber
          ? { ...serial, status, asn_id: asnId, updated_date: new Date() }
          : serial
      )
    }));
  }

  // Override the existing updateSerialStatus method to handle ASN status logic
  updateSerialStatus(serialId: string, status: SerialInventory['status'], asnId?: string): void {
    this.setState(state => ({
      serials: state.serials.map(serial =>
        serial.id === serialId
          ? { ...serial, status, asn_id: asnId, updated_date: new Date() }
          : serial
      )
    }));

    // If assigning to ASN, check if ASN is submitted
    if (asnId && status === 'assigned') {
      const asn = this.state.asns.find(a => a.id === asnId);
      if (asn && asn.status !== 'submitted') {
        // Update status to 'blocked' if ASN is not submitted
        this.setState(state => ({
          serials: state.serials.map(serial =>
            serial.id === serialId
              ? { ...serial, status: 'blocked', updated_date: new Date() }
              : serial
          )
        }));
      }
    }
  }
}

// Create global instance
export const globalStore = new GlobalStoreManager();

// Initialize the store
globalStore.init().catch(console.error);