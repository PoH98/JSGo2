<template>
    <v-app id="main">
        <v-app-bar elevation="0" class="nav">
            <v-container>
                <v-row>
                    <v-col cols="4" class="title">
                        <v-btn class="nav-link" to="/">
                            Galaxy Orbit 4
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-app-bar>
        <v-img class="bg-img" cover src="/bg-img.jpg">
            <v-main>
                <v-container>
                    <v-tabs v-model:model-value="selectedIndex">
                        <v-tab v-for="(planet, i) in planets" :key="planet.userId" :value="i">
                            {{ planet.username }}
                        </v-tab>
                        <v-tab v-if="store.loggedInUser.maxPlanet > planets.length" :value="-1">
                            Create Planet
                        </v-tab>
                    </v-tabs>
                    <v-window v-model:model-value="selectedIndex">
                        <v-window-item class="pt-5" v-for="(planet, i) in planets" :key="planet.userId" :value="i">
                            <Game :planetData="planet" />
                        </v-window-item>
                        <v-window-item :value="-1">
                            <v-card class="mt-10 bg-black mx-auto" max-width="330px">
                                <v-card-title>
                                    Add Planet
                                </v-card-title>
                                <v-card-text>
                                    Commander, we are ready to conquer a new planet for your empire <span
                                        class="blink">_</span>
                                    <div class="box">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <v-form class="content" @submit.prevent="createPlanet">
                                            <v-text-field v-model="form.username" label="Planet Name" :rules="required">

                                            </v-text-field>
                                            <v-select v-model="form.ground" label="Planet Type" :items="planetType"
                                                item-title="text" item-value="value" :rules="required">

                                            </v-select>
                                            <v-btn class="d-block w-100" color="cyan" type="submit">
                                                Create
                                            </v-btn>
                                        </v-form>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-window-item>
                    </v-window>
                </v-container>
            </v-main>
        </v-img>
    </v-app>
</template>
<script>
import { useGameStore } from '@/store/gameStore';
import Game from '~/components/GameWindow.vue';
export default {
    components: {
        Game
    },
    async setup() {
        const appConfig = useAppConfig();
        const store = useGameStore();
        const router = useRouter();
        let planets = ref([]);
        let selectedIndex = ref(0);
        if (Object.keys(store.loggedInUser).length > 0) {
            const { data: res } = await useAsyncData('game', async () => {
                const res = await $fetch(appConfig.apiUrl + '/api/account/list/user', {
                    method: 'GET',
                    headers: {
                        Authorization: store.sessionKey
                    }
                });
                if (res.code === 200) {
                    planets = res.data;
                }
                else if (res.code === 401) {
                    store.logout();
                    router.push("/");
                }
                return planets;
            })
            planets = ref(res);
        }
        return {
            store,
            appConfig,
            planets,
            selectedIndex
        }
    },
    data() {
        return {
            planetType: [
                {
                    text: 'Green Land',
                    value: 1
                },
                {
                    text: 'Dessert',
                    value: 2
                },
                {
                    text: 'Snow',
                    value: 3
                }
            ],
            form: {
                username: "",
                ground: null
            },
            required: [(v) => v !== undefined && v !== null && v != '' || 'Required field']
        }
    },
    methods: {
        async createPlanet() {
            const res = await $fetch(this.appConfig.apiUrl + '/api/account/create/user', {
                method: 'POST',
                headers: {
                    Authorization: this.store.sessionKey
                },
                body: this.form
            });
            if (res.code === 200) {
                this.form.username = "";
                this.form.ground = null;
                const res = await $fetch(this.appConfig.apiUrl + '/api/account/list/user', {
                    method: 'GET',
                    headers: {
                        Authorization: this.store.sessionKey
                    }
                });
                if (res.code === 200) {
                    this.planets = res.data;
                }
                else if (res.code === 401) {
                    this.store.logout();
                    this.$router.push("/");
                }
            }
            else if (res.code === 401) {
                this.store.logout();
                this.$router.push("/");
            }
        }
    }
}
</script>
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

@keyframes blink-animation {
    to {
        visibility: hidden;
    }
}

#main {

    .title {
        font-size: 28px;
    }

    .nav {
        background: transparent;
    }

    .nav-link {
        font-size: 42px;
        letter-spacing: .01px;
        height: auto;
        color: white !important;
    }

    .bg-img {
        height: calc(100vh - 64px);
        user-select: none;
    }

    .blink {
        animation: blink-animation 1s steps(2, start) infinite;
    }

    .box {
        position: relative;
        width: 300px;
        height: 300px;
        padding: 20px;
        margin-top: 30px;
        border: 2px solid rgba(0, 255, 0, 0.3);
    }

    .box .content {
        border: 1px solid cyan;
        padding: 20px;
        height: 100%;
    }

    .box:before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.1);
        transition: 0.5s;
        pointer-events: none;
        background: #111845a6;
    }

    .box.loaded:before {
        left: -50%;
        transform: skewX(-5deg);
    }

    .box span {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: block;
        box-sizing: border-box;

    }

    .box span:nth-child(1) {
        transform: rotate(0deg);
    }

    .box span:nth-child(2) {
        transform: rotate(90deg);
    }

    .box span:nth-child(3) {
        transform: rotate(180deg);
    }

    .box span:nth-child(4) {
        transform: rotate(270deg);
    }

    .box span:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        background: #00ff00;
        animation: animate 4s linear infinite;
    }

    @keyframes animate {
        0% {
            transform: scaleX(0);
            transform-origin: left;
        }

        50% {
            transform: scaleX(1);
            transform-origin: left;
        }

        50.1% {
            transform: scaleX(1);
            transform-origin: right;
        }

        100% {
            transform: scaleX(0);
            transform-origin: right;
        }

    }
}
</style>

<style>
body {
    font-family: 'VT323', monospace;
}
</style>