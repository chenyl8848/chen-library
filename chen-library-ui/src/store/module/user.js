import { defineStore } from 'pinia'

const useUserStore = defineStore('User', {
    state: () => {
        return {
            token: "",
            user: {
                username: "zhangsan",
                avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
            }
        }
    }
})

export default useUserStore