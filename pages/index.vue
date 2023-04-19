<template>
    <v-app id="main">
        <v-navigation-drawer v-model="sidebar">
            <div class="pa-6">
                <p class="mb-5">Welcome back, {{ store.loggedInUser.username }}
                    <span class="blink">_</span>
                </p>
                <v-btn color="red" class="d-block w-100" @click="logout = true; sidebar = false;">
                    Logout
                </v-btn>
            </div>
        </v-navigation-drawer>
        <v-app-bar elevation="0" class="nav">
            <v-container>
                <v-row>
                    <v-col cols="9" md="4" class="title d-flex align-center">
                        <v-btn class="nav-link" to="/">
                            Galaxy Orbit 4
                        </v-btn>
                    </v-col>
                    <v-col class="d-none d-md-flex justify-end">
                        <v-btn class="nav-link" v-if="!store.sessionKey" to="/login">
                            Login
                        </v-btn>
                        <v-menu class="nav-link" v-else>
                            <template v-slot:activator="{ props }">
                                <v-btn :ripple="false" class="nav-link" v-bind="props">
                                    Welcome back, {{ store.loggedInUser.username }}
                                    <span class="blink">_</span>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-action @click="logout = true">Logout</v-list-item-action>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-col>
                    <v-col class="d-md-none" cols="3">
                        <v-btn class="nav-link" @click="sidebar = !sidebar">
                            <v-icon>
                                mdi-menu
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-app-bar>
        <v-img class="bg-img" cover src="/bg-img.jpg">
            <v-main id="home">
                <v-container>
                    <div class="box my-8">
                        <div class="box__line box__line--top"></div>
                        <div class="box__line box__line--right"></div>
                        <div class="box__line box__line--bottom"></div>
                        <div class="box__line box__line--left"></div>
                        <div class="pa-5">
                            <h1>Welcome to Galaxy Orbit 4</h1>
                            <p>
                                Join our galaxy now! <span class="blink">_</span>
                            </p>
                        </div>
                    </div>

                    <h2 class="play-btn" @click="play">
                        <hud class="mx-auto" />
                        <span>Play</span>
                    </h2>
                </v-container>
                <v-dialog v-model="logout">
                    <v-card max-width="400px" class="mx-auto">
                        <v-card-title>
                            Hold on!
                        </v-card-title>
                        <v-card-text>
                            Signing off? Commander? Your planets will keeps running while you are away!
                        </v-card-text>
                        <v-row class="my-3 mx-0">
                            <v-col cols="6">
                                <v-btn color="green" class="d-block w-100" @click="loggingOut">
                                    Yes
                                </v-btn>
                            </v-col>
                            <v-col cols="6">
                                <v-btn color="red" class="d-block w-100" @click="logout = false">
                                    No
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-dialog>
            </v-main>
        </v-img>
    </v-app>
</template>
<script>
import hud from '~/components/CircleHUD.vue';
import { useGameStore } from '@/store/gameStore';
import * as THREE from 'three';
import { toRaw } from '@vue/reactivity';
export default {
    components: {
        hud
    },
    setup() {
        const appConfig = useAppConfig();
        const store = useGameStore();
        return {
            store,
            appConfig
        };
    },
    data() {
        return {
            scene: null,
            stars: [],
            renderer: null,
            camera: null,
            cancelAnimate: false,
            logout: false,
            sidebar: false
        }
    },
    mounted() {
        if (process.client) {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
            this.camera.position.z = 5;
            this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
            this.renderer.setPixelRatio(window.devicePixelRatio * 0.8);
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            document.getElementById("home").appendChild(this.renderer.domElement);
            this.renderer.domElement.style.position = "absolute";
            this.renderer.domElement.style.inset = "0px";
            this.renderer.domElement.style.pointerEvents = "none";
            this.renderer.setClearColor(0x000000, 0);
            this.addSphere();
            this.render();
        }
    },
    beforeUnmount() {
        this.cancelAnimate = true;
        this.renderer.dispose();
    },
    methods: {
        play() {
            if (!this.store.sessionKey) {
                this.$router.push("/login");
            }
            else {
                this.$router.push("/game");
            }
        },
        loggingOut() {
            this.store.logout();
            this.logout = false;
        },
        addSphere() {
            var geometry = new THREE.SphereGeometry(.5, 32, 32)
            var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
            for (var z = -1000; z < 1000; z += 15) {

                var sphere = new THREE.Mesh(geometry, material)
                sphere.position.x = Math.random() * 1000 - 500;
                sphere.position.y = Math.random() * 1000 - 500;

                sphere.position.z = z;

                // scale it up a bit
                sphere.scale.x = sphere.scale.y = 1;

                //add the sphere to the scene
                this.scene.add(sphere);

                //finally push it to the stars array 
                this.stars.push(sphere);
            }
        },
        animateStar() {
            for (var i = 0; i < this.stars.length; i++) {

                let star = this.stars[i];

                // and move it forward dependent on the mouseY position. 
                star.position.z += i / 10;

                // if the particle is too close move it to the back
                if (star.position.z > 1000) star.position.z -= 2000;

            }
        },
        render() {
            const scene = toRaw(this.scene);
            const camera = toRaw(this.camera);
            const func = () => {
                if (this.cancelAnimate) {
                    return;
                }
                requestAnimationFrame(func);
                this.renderer.render(scene, camera);
                this.animateStar();
            };
            func();
        }
    },
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
    font-family: 'VT323', monospace;

    .title {
        font-size: 28px;
    }

    .nav {
        background: transparent;
    }

    .bg-img {
        height: calc(100vh - 64px);
        user-select: none;
    }

    .nav-link {
        font-size: 42px;
        letter-spacing: .01px;
        height: auto;
        color: white !important;
        text-transform: capitalize;
    }

    .box {
        position: relative;
        @media(max-width: 900px){
            h1{
                font-size: 18px;
            }
        }
    }

    .box__line {
        $line-width: 4px;
        $line-color: rgba(255, 255, 255, 1);
        position: absolute;
        background: $line-color;

        &--top,
        &--bottom {
            height: $line-width;
            width: 100%;

            &::before,
            &::after {
                content: "";
                position: absolute;
                width: $line-width;
                height: $line-width;
                background: $line-color;
            }
        }

        &--top {
            top: -$line-width;

            &::before {
                left: 0;
                bottom: -$line-width;
            }

            &::after {
                right: 0;
                bottom: -$line-width;
            }
        }

        &--bottom {
            bottom: -$line-width;

            &::before {
                left: 0;
                top: -$line-width;
            }

            &::after {
                right: 0;
                top: -$line-width;
            }
        }

        &--left,
        &--right {
            width: $line-width;
            height: 100%;
        }

        &--left {
            left: -$line-width;
        }

        &--right {
            right: -$line-width;
        }
    }

    .play-btn {
        max-width: 457px;
        margin-left: auto;
        margin-right: auto;
        border-radius: 50%;
        position: relative;
        cursor: pointer;

        span {
            position: absolute;
            inset: 0px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            pointer-events: none;
        }
    }

    .blink {
        animation: blink-animation 1s steps(2, start) infinite;
    }
}
</style>
<style lang="scss">
#main {
    .bg-nav {
        .v-navigation-drawer__img {
            img {
                filter: brightness(50%) blur(1px);
            }
        }
    }
}
</style>