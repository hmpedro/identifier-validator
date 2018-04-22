<template>
    <v-container>
        <h1>Adicionar identificador</h1>
        <v-layout row wrap justify-left class="mt-3">
            <v-flex xs12 md10 lg10>
                <v-card>
                    <div class="pl-3 pr-3 pt-1 pb-1">
                    <v-alert type="error" dismissible v-model="showError" transition="scale-transition">
                        {{errorMsg}}
                    </v-alert>
                    <v-form v-model="valid" ref="form" lazy-validation>
                        <v-select
                                :items="typesOptions"
                                v-model="identifier.type"
                                :rules="typeRules"
                                label="CPF/CNPJ"
                                single-line
                                required
                                @change="typeChanged"
                        ></v-select>
                        <v-text-field
                                label="Identificador"
                                v-model="identifier.value"
                                :rules="valueRules"
                                :disabled="!identifier.type"
                                :mask="mask"
                                required
                        ></v-text-field>
                        <v-checkbox
                                label="Blacklist"
                                v-model="identifier.blacklist"
                        ></v-checkbox>

                        <v-btn
                                @click="submit"
                                :disabled="!valid"
                        >
                            Enviar
                        </v-btn>
                        <v-btn @click="clear">Limpar</v-btn>
                    </v-form>
                    </div>
                </v-card>
                <v-dialog v-model="successDialog" max-width="500px">
                    <v-card>
                        <v-card-title>
                            Sucesso
                        </v-card-title>
                        <v-card-text>
                            Seu {{identifier.type}} foi adicionado com sucesso
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="primary" flat @click.stop="closeSuccessDialog">Fechar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import requestService from '../RequestService'

    export default {
        name: 'IdentifierCrud',
        props: {
            menuShowFn: Function
        },
        data() {
            return {
                valid: false,
                valueRules: [
                    v => !!v || 'Identificador é obrigatório',
                ],
                typeRules: [
                    v => !!v || 'Tipo é obrigatório'
                ],
                typesOptions: [
                    'CPF',
                    'CNPJ',
                ],
                identifier: {
                    value: null,
                    type: null,
                    blacklist: null,
                },
                masksType: {
                    CPF: '###.###.###-##',
                    CNPJ: '##.###.###/####-##',
                },
                mask: null,
                successDialog: false,
                showError: false,
                errorMsg: '',
            }
        },
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    requestService.create('identifier', this.identifier)
                        .then(() => {
                            this.successDialog = true;
                        })
                        .catch((error) => {
                            this.showError = true;
                            this.errorMsg = error.response.data.message;
                            setTimeout(() => {
                                this.showError = false;
                            }, 5000)
                        })
                }
            },
            clear() {
                this.$refs.form.reset()
            },
            typeChanged(newVal) {
                this.identifier.value = null;
                this.mask = this.masksType[newVal];
            },
            closeSuccessDialog() {
                this.successDialog = false;
                this.$router.push({name: 'identifierList'});
            }
        },
        created() {

        },
    }
</script>

<style>
</style>