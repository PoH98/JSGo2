<template>
    <div :id="'play_' + id" class="play-canvas">

    </div>
</template>
<script>
import moment from 'moment';
import { useGameStore } from '@/store/gameStore';
import { Game } from '@/game/game.client';
export default {
    props: {
        planetData: {
            required: true,
            type: Object
        }
    },
    setup() {
        const appConfig = useAppConfig();
        const store = useGameStore();
        return {
            appConfig,
            store
        }
    },
    data() {
        return {
            keyToken: {},
            game: null,
            id: ""
        }
    },
    async mounted() {
        if (process.client) {
            console.log("initing game...")
            this.id = this.cyrb53(this.planetData.userId, moment().unix());
            const res = await $fetch(this.appConfig.apiUrl + '/api/account/play/user/' + this.planetData.userId, {
                method: 'GET',
                headers: {
                    Authorization: this.store.sessionKey
                }
            });
            this.keyToken = res.data;
            this.game = new Game(document.getElementById('play_'+this.id));
            setTimeout(()=>{
                document.getElementById('play_'+this.id).appendChild(this.game.app.view);
                this.game.play();
                console.log("done")
            }, 500);
        }
    },
    methods: {
        moment,
        cyrb53(str, seed = 0) {
            let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
            for (let i = 0, ch; i < str.length; i++) {
                ch = str.charCodeAt(i);
                h1 = Math.imul(h1 ^ ch, 2654435761);
                h2 = Math.imul(h2 ^ ch, 1597334677);
            }
            h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
            h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
            h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
            h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

            return 4294967296 * (2097151 & h2) + (h1 >>> 0);
        }
    }
}
</script>
<style scoped>
.play-canvas{
    height: 75vh;
}
</style>