<template>
    <div>
        {{text}}
    </div>
</template>

<script>
    import Utils from "@/utils/utils";
    export default {
        data(){
            return {
                text:''
            }
        },

        mounted(){
            this.text = Utils.formatTraditionalZh('张淇-中华人民共和国');
        },

        methods:{

        }
    }
</script>
