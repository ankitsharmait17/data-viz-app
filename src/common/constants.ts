export const TABLES = {
    CUSTOMERS: 'customers',
    ORDERS: 'orders',
    PRODUCTS: 'products',
    SUPPLIERS: 'suppliers',
    EMPTY_DATA: 'emptyData',
};

export const DATABASES = {
    CUSTOMERS_DB: [TABLES.CUSTOMERS],
    ORDERS_DB: [TABLES.ORDERS, TABLES.PRODUCTS],
    SUPPLIERS_DB: [TABLES.SUPPLIERS],
};
