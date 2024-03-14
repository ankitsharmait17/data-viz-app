import orders from '@/mocks/orders.json';
import products from '@/mocks/products.json';
import suppliers from '@/mocks/suppliers.json';
import customers from '@/mocks/customers.json';
import emptyData from '@/mocks/emptyData.json';
import { TABLES, DATABASES } from './constants';
import { QueryResponse } from './types';

export function renderData(query: string, selectedDb: string) {
    const available_tables = DATABASES[selectedDb];
    const isTablePresent = available_tables.some((table) => query.includes(table));
    if (!isTablePresent) return null;
    if (query.includes(TABLES.CUSTOMERS)) return customers;
    else if (query.includes(TABLES.ORDERS)) return orders;
    else if (query.includes(TABLES.PRODUCTS)) return products;
    else if (query.includes(TABLES.SUPPLIERS)) return suppliers;
    else if (query.includes(TABLES.EMPTY_DATA)) return emptyData;
    else return null;
}

export function convertToCSV(queryResults: QueryResponse) {
    const header = queryResults.columns.join(',');
    const rows = queryResults.data.map((ar) => Object.values(ar).join(','));
    const csvContent = `${header}\n${rows.join('\n')}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    return blob;
}

export function truncateText(text: string, maxlength = 80) {
    return text.length > maxlength ? `${text.slice(0, maxlength)}...` : text;
}
