<template>
    <div>
        <table>
            <caption>
                Query Results
            </caption>
            <thead>
                <th v-for="column in columns" :key="column">{{ column }}</th>
            </thead>
            <tbody>
                <tr v-for="row in data" :key="row.id">
                    <td v-for="column in columns" :key="column">{{ row[column] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ name: 'QueryResults' })
export default class QueryResults extends Vue {
    @Prop() data!: Record<string, string>[];
    @Prop() columns!: string[];
}
</script>

<style scoped></style>
