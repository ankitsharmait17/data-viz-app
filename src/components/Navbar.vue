<template>
    <div class="navbar">
        <router-link to="/">Home</router-link> |
        <router-link to="/saved-queries">Saved Queries</router-link>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {}
</script>
<style>
.navbar {
    background-color: #333;
    overflow: hidden;
    margin-bottom: 50px;
}

.navbar a {
    float: left;
    display: block;
    color: white;
    text-align: center;
    padding: 14px 20px;
    text-decoration: none;
}

.navbar a:hover {
    background-color: #ddd;
    color: black;
}
</style>
