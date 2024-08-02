import { onMounted, ref } from "vue"

export default function () {
    // footer 距离顶部的高度
    const footerTop = ref(0)
    // 是否是 PC 端
    const isPC = ref(true)
    // 是否是移动端
    const isMobile = ref(false)
    // 是否是 Pad
    const isPad = ref(false)

    const setFooterTop = () => {
        footerTop.value = document.querySelector('footer').getBoundingClientRect().top
    }

    const handleScreenResize = () => {
        const width = document.body.clientWidth
        if (width < 768) {
            isMobile.value = true
            isPad.value = false
            isPC.value = false
        } else if (width < 992) {
            isMobile.value = false
            isPad.value = true
            isPC.value = false
        } else {
            isMobile.value = false
            isPad.value = false
            isPC.value = true
        }
    }

    onMounted(() => {
        setFooterTop()
        handleScreenResize()
        window.addEventListener('scroll', setFooterTop())
        window.addEventListener('resize', handleScreenResize())

    })

    return {
        footerTop,
        isPC,
        isMobile,
        isPad
    }
}