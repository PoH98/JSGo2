<template>
    <div :id="'play_' + id" class="play-canvas position-relative">
        <BarHUD/>
        <div class="loader">
            <div class="outer">
                <div class="inner"></div>
            </div>
            <p class="text-center loader-title">{{ status }}</p>
        </div>
    </div>
</template>
<script>
import BarHUD from './BarHUD.vue';
import moment from 'moment';
import { useGameStore } from '@/store/gameStore';
import { Game } from '@/game/game.client';
export default {
    components:{
        BarHUD
    },
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
            id: "",
            status: "Connecting to Planet Network"
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
            this.game = new Game(document.getElementById('play_' + this.id));
            const connected = await this.game.connect();
            console.log(connected);
            document.getElementById('play_' + this.id).innerText = "";
            document.getElementById('play_' + this.id).appendChild(this.game.app.view);
            this.game.play();
            console.log("done")
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
<style scoped lang="scss">
.play-canvas {
    height: 75vh;
    background-color: black;
}
.loader-title{
    position: absolute;
    top: 68%;
    font-weight: bold;
    font-size: 18px;
}
.loader {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    .outer {
        margin: auto;
        border: 16px solid rgba(0, 0, 0, 0);
        border-top: 16px solid rgb(255, 255, 0);
        border-bottom: 16px solid rgb(255, 255, 0);
        border-radius: 50%;
        border-style: double;
        width: 150px;
        height: 150px;
        animation: spin 5s linear infinite;

    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    .inner {
        margin: auto;
        border: 15px solid rgba(0, 0, 0, 0);
        border-top: 15px solid rgb(0, 255, 255);
        border-bottom: 15px solid rgb(0, 255, 255);
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin2 1.5s linear infinite;

    }

    @keyframes spin2 {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(-360deg);
        }
    }
}
</style>