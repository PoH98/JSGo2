<template>
    <v-app id="main">
        <v-app-bar elevation="0" class="nav">
            <v-container>
                <v-row>
                    <v-col cols="9" md="4" class="title d-flex align-center">
                        <v-btn class="nav-link" to="/">
                            Galaxy Orbit 4
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-app-bar>
        <v-img class="bg-img" cover src="/bg-login.jpg">
            <v-main>
                <v-container>
                    <div class="hud">
                        <BarHUD />
                    </div>
                    <v-form class="mt-10" @submit.prevent="submit">
                        <v-card class="mx-auto" max-width="500px">
                            <v-card-text>
                                <h1 class="mb-5">
                                    Login
                                </h1>
                                <v-alert
                                    v-if="error.show"
                                    type="error"
                                    title="Login Failed"
                                    :text="error.message">
                                </v-alert>
                                <v-text-field v-model:model-value="form.username" label="Username/Email">

                                </v-text-field>
                                <v-text-field v-model:model-value="form.password" label="Password" type="password">

                                </v-text-field>
                                <v-btn type="submit" class="w-100 bg-cyan text-white">
                                    Login
                                </v-btn>
                            </v-card-text>
                        </v-card>
                    </v-form>
                </v-container>
            </v-main>
        </v-img>
    </v-app>
</template>
<script>
import BarHUD from '~/components/BarHUD.vue';
import { useGameStore } from '@/store/gameStore'
export default {
    components: {
        BarHUD
    },
    setup() {
        const appConfig = useAppConfig();
        const store = useGameStore();
        return {
            store,
            appConfig
        }
    },
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            error: {
                show: false,
                message: ""
            }
        }
    },
    beforeMount() {
        if (this.store.sessionKey) {
            this.$router.push("/");
        }
    },
    methods: {
        async submit() {
            const res = await $fetch(this.appConfig.apiUrl + '/api/login/login/account', {
                method: 'POST',
                body: this.form
            });
            if (res.code === 200) {
                this.store.sessionKey = res.data.token;
                this.store.loggedInUser = res.data;
                this.$router.push("/");
            }
            else {
                this.error.show = true;
                this.error.message = res.message;
            }
        }
    }
}
</script>
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

#main {
    font-family: 'VT323', monospace;

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
        text-transform: capitalize;
    }

    .bg-img {
        height: calc(100vh - 64px);
        user-select: none;
    }

    .hud {
        position: absolute;
        inset: 0;
    }
}
</style>