<template>
    <div class="saved-query">
        <div v-if="savedQueries && Object.keys(savedQueries).length > 0">
            <ul>
                <li
                    class="saved-query-route"
                    v-for="queryId in Object.keys(savedQueries)"
                    :key="queryId"
                    @click="() => gotoQueryDetails(queryId)"
                >
                    {{ savedQueries[queryId].name }}
                </li>
            </ul>
        </div>
        <div v-else>No Saved queries</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getQueries } from '@/common/savedQueries';

@Component({
    name: 'SavedQueryView',
})
export default class SavedQueryView extends Vue {
    savedQueries: any = null;

    gotoQueryDetails(id: string) {
        this.$router.push({ name: 'query', params: { queryId: id } });
    }

    mounted() {
        this.savedQueries = getQueries();
    }
}
</script>

<style lang="scss" scoped>
.saved-query {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
    &-route {
        cursor: pointer;
    }
}
</style>
