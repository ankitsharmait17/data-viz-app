<template>
    <div class="navbar">
        <router-link to="/">Home</router-link>
        <router-link to="/saved-queries">Saved Queries</router-link>
        <router-link to="/query/new">New Query</router-link>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {}
</script>
<style lang="scss" scoped>
.navbar {
    background-color: #333;
    overflow: hidden;
    margin-bottom: 10px;
    a {
        float: left;
        display: block;
        color: white;
        text-align: center;
        padding: 14px 20px;
        text-decoration: none;
    }
    a:hover {
        background-color: #ddd;
        color: black;
    }
}
</style>
