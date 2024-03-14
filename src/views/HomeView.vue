<template>
    <div class="home">
        <div class="home-new-query" @click="routeToNewQuery"><div>New Query</div></div>
        <div class="home-saved-query" @click="routeToSavedQuery"><div>Saved Queries</div></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    name: 'HomeView',
    components: {},
})
export default class HomeView extends Vue {
    routeToNewQuery() {
        this.$router.push({ name: 'query', params: { queryId: 'new' } });
    }

    routeToSavedQuery() {
        this.$router.push({ name: 'saved-queries' });
    }
}
</script>

<style lang="scss" scoped>
.home {
    display: flex;
    justify-content: center;
    align-items: center;
    &-new-query,
    &-saved-query {
        height: 200px;
        width: 200px;
        border: 1px solid black;
        border-radius: 5px;
        margin: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #42b983;
        cursor: pointer;
        color: white;
    }
}
</style>
