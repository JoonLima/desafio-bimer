<template>
    <v-flex>
        <modal-padrao titulo="Cliente" v-model="exibirJanela">
            <h1>teste</h1>
        </modal-padrao>

        <v-btn @click="exibirJanela = true">Adicionar</v-btn>
    </v-flex>
</template>


<script>
import ModalPadrao from './ModalPadrao.vue'


export default {

    data() {
        return {
            exibirJanela: false
        }
    },
    components:{
        ModalPadrao
    }
}
</script>