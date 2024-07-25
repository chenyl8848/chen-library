import { defineStore } from 'pinia'
import { category, navigations } from '../../../mock/data'
import { categoryToTree } from '@/utils/utils'

const useCategoryStore = defineStore('Category', {
    state: () => {
        return {
            navigations: categoryToTree(navigations),
            categories: category,
            categoryTree: categoryToTree(category)
        }
    }
})

export default useCategoryStore