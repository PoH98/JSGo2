<template>
    <svg fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="path" fill="none" fill-rule="evenodd"
            stroke-linecap="butt" stroke-linejoin="round" stroke-opacity="1" stroke-dasharray="50,20"
            stroke-dashoffset="3000" d="M31.5 340L30.0045 62.3347C30.0016 61.8006 30.2125 61.2875 30.5903 60.9097L91.5 0"
            stroke="#FFFFFF" stroke-width="2" />
        <path class="path" fill="none" fill-rule="evenodd"
            stroke-linecap="butt" stroke-linejoin="round" stroke-opacity="1" stroke-dasharray="50,20"
            stroke-dashoffset="3000" d="M2370 0.5V214" stroke="#FFFFFF" stroke-width="2" />
        <path
            d="M2360 -0.5V203.172C2360 203.702 2360.21 204.211 2360.59 204.586L2487.41 331.414C2487.79 331.789 2488 332.298 2488 332.828V1377.5C2488 1378.6 2487.1 1379.5 2486 1379.5H1827.83C1827.3 1379.5 1826.79 1379.29 1826.41 1378.91L1794.59 1347.09C1794.21 1346.71 1793.7 1346.5 1793.17 1346.5H1507.33C1506.8 1346.5 1506.29 1346.71 1505.91 1347.09L1474.09 1378.91C1473.71 1379.29 1473.2 1379.5 1472.67 1379.5H552.328C551.798 1379.5 551.289 1379.71 550.914 1380.09L531.086 1399.91C530.711 1400.29 530.202 1400.5 529.672 1400.5H257.828C257.298 1400.5 256.789 1400.29 256.414 1399.91L236.586 1380.09C236.211 1379.71 235.702 1379.5 235.172 1379.5H19C17.8954 1379.5 17 1378.6 17 1377.5V576.828C17 576.298 17.2107 575.789 17.5858 575.414L40.4142 552.586C40.7893 552.211 41 551.702 41 551.172V350.328C41 349.798 40.7893 349.289 40.4142 348.914L17.5858 326.086C17.2107 325.711 17 325.202 17 324.672V54.3284C17 53.798 17.2107 53.2893 17.5858 52.9142L71 -0.5"
            stroke="#00FFFF" stroke-width="2" />
        <path class="path" fill-rule="evenodd"
            stroke-linecap="butt" stroke-linejoin="round" fill="none" stroke-opacity="1" stroke-dasharray="50,20"
            stroke-dashoffset="3000"
            d="M2488 444.5L2468.59 463.914C2468.21 464.289 2468 464.798 2468 465.328V837.672C2468 838.202 2468.21 838.711 2468.59 839.086L2488 858.5M2488 1172L2500.91 1184.91C2501.29 1185.29 2501.5 1185.8 2501.5 1186.33V1386C2501.5 1387.1 2500.6 1388 2499.5 1388H2201.83C2201.3 1388 2200.79 1387.79 2200.41 1387.41L2179.59 1366.59C2179.21 1366.21 2178.7 1366 2178.17 1366H1879.33C1878.8 1366 1878.29 1366.21 1877.91 1366.59L1864.5 1380"
            stroke="#FFFFFF" stroke-width="2" />
        <path class="path" fill-rule="evenodd"
            stroke-linecap="butt" stroke-linejoin="round" fill="none" stroke-opacity="1" stroke-dasharray="50,20"
            stroke-dashoffset="3000"
            d="M1715 1346.5L1705.59 1355.91C1705.21 1356.29 1704.7 1356.5 1704.17 1356.5H1509.83C1509.3 1356.5 1508.79 1356.71 1508.41 1357.09L1476.59 1388.91C1476.21 1389.29 1475.7 1389.5 1475.17 1389.5H1402.83C1402.3 1389.5 1401.79 1389.29 1401.41 1388.91L1392 1379.5"
            stroke="#FFFFFF" stroke-width="2" />
        <path class="path" fill-rule="evenodd"
            stroke-linecap="butt" stroke-linejoin="round" fill="none" stroke-opacity="1" stroke-dasharray="50,20"
            stroke-dashoffset="3000"
            d="M880.5 1380.5L863.086 1363.09C862.711 1362.71 862.202 1362.5 861.672 1362.5H546.828C546.298 1362.5 545.789 1362.71 545.414 1363.09L519.586 1388.91C519.211 1389.29 518.702 1389.5 518.172 1389.5H352.828C352.298 1389.5 351.789 1389.71 351.414 1390.09L340 1401.5M18 1309.5L1.58579 1293.09C1.21071 1292.71 1 1292.2 1 1291.67V971.328C1 970.798 1.21071 970.289 1.58579 969.914L18 953.5L30.9142 940.586C31.2893 940.211 31.5 939.702 31.5 939.172V564"
            stroke="#FFFFFF" stroke-width="2" />
    </svg>
</template>
<style scoped>
svg{
    width: 100%;
    height: 1080px;
}
.path {
    animation: draw 15s infinite;
    animation-timing-function: linear;
}

.path-2 {
    animation: draw 20s infinite;
    animation-delay: 0.5s;
    animation-timing-function: linear;
}

@keyframes draw {
    0% {}

    100% {
        stroke-dashoffset: 0;
        stroke-opacity: 1;
    }
}
</style>