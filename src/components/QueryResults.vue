<template>
    <div class="query-results">
        <div>
            <div class="query-results-heading">
                <h2>Query Results</h2>
            </div>
            <div class="query-results-control">
                <div class="query-results-control-total">Total Rows : {{ queryResults.data.length }}</div>
                <div class="query-results-control-export"><button @click="exportToCSV">Export to CSV</button></div>
            </div>
            <div class="table-header">
                <div v-for="(column, index) in queryResults.columns" :key="index" class="table-cell" v-tooltip="column">
                    {{ column }}
                </div>
            </div>

            <recycle-scroller
                v-if="queryResults.data.length"
                class="table-body"
                :items="queryResults.data"
                :item-size="50"
                key-field="0"
                list-tag="table"
                item-tag="tr"
                v-slot="{ item: rowData, index: rowIndex }"
            >
                <div class="table-row">
                    <div
                        v-for="(columnValue, columnIndex) in rowData"
                        :key="`${queryResults.columns[columnIndex]}_${rowIndex}_${columnIndex}`"
                        class="table-cell"
                        v-tooltip="columnValue"
                    >
                        {{ columnValue && truncateText(columnValue) }}
                    </div>
                </div>
            </recycle-scroller>
            <div class="query-results-error" v-else>Sorry! No Results for this query.</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { QueryResponse } from '@/common/types';
import { RecycleScroller } from 'vue-virtual-scroller';
import VTooltip from 'v-tooltip';
import { truncateText, convertToCSV } from '@/common/utils';

@Component({ name: 'QueryResults', components: { RecycleScroller, VTooltip }, methods: { truncateText } })
export default class QueryResults extends Vue {
    @Prop() queryResults!: QueryResponse;

    exportToCSV() {
        const csvContent = convertToCSV(this.queryResults);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(csvContent);
        link.download = `data_${Date.now()}.csv`;
        link.click();
    }
}
</script>

<style lang="scss">
@import '@/scss/tooltip.scss';
</style>

<style lang="scss">
@import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
@import '@/scss/mixins';

.query-results {
    &-error {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin: 50px;
    }

    &-control {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        margin-top: 10px;
        &-total {
            font-weight: bold;
        }
        button {
            @include button();
        }
    }

    .table-header {
        display: flex;
        font-weight: bold;
    }
    .table-body {
        overflow-y: auto;
        max-height: 400px; /* Adjust the max height as needed */
        & .table-row:nth-child(even) {
            background-color: #f2f2f2;
        }
        & .table-row:hover {
            background-color: #e0e0e0;
        }
    }
    .table-row {
        display: flex;
    }
    .table-cell {
        width: 100px;
        border: 1px solid #ccc;
        padding: 8px;
        margin-bottom: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-transform: capitalize;
        padding: 10px;
        text-align: center; /* Middle alignment for table cells */
    }
}
</style>
