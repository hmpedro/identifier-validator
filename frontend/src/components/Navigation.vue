<template>
    <v-navigation-drawer fixed v-model="showMenu" app>
        <v-list dense>
            <v-list-tile :to="{name:'identifierList'}" exact>
                <v-list-tile-action>
                    <v-icon>view_list</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Listagem de Identificadores</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name:'identifierCrud'}" exact>
                <v-list-tile-action>
                    <v-icon>add</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Adicionar Identificador</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name:'status'}" exact>
                <v-list-tile-action>
                    <v-icon>developer_board</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Status da Aplicação</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: 'Navigation',
        props: {
            showMenu: Boolean
        },
        methods: {}
    }
</script>

<style>
</style>