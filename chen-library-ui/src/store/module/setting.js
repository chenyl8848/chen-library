import { defineStore } from "pinia";

const useSettingStore = defineStore('setting', {
    state: () => {
        return {
            system: {
                // logo: '//moredoc.mnt.ltd/uploads/5/1/c/5/9/51c59a56e1b49eabc12042beae0f3e71.png',
                logo: '//chencoding.top:8090/_media/logo.png',
                siteName: 'Java陈序员',
                recommendWords: ['Java', 'MySQL']
            }
        }
    }
})

export default useSettingStore