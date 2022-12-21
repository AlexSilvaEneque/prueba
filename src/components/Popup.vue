<template>
    <div class="popup">
        <div class="popup-inner">
            <slot />
            <button class="popup-close" @click="$emit('closePopup')">Close</button>
        </div>
    </div>
</template>

<style scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, .2);

    display: flex;
    align-items: center;
    justify-content: center;
}

.popup-inner {
    background-color: #fff;
    padding: 50px;
    border-radius: 12px;
    text-align: center;
}
.popup-close {
    border: none;
    border-radius: 12px;
    height: 40px;
    width: 120px;
    background-color: var(--color-font);
    color: #fff;
    font-weight: 700;
    font-size: 16px;
    margin-top: 1rem;
    cursor: pointer;
}
</style>