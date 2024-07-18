export const categoryToTree = (categories, withDisabled = true) => {
    const result = []
    const map = {}

    try {
        const cates = JSON.parse(JSON.stringify(categories))

        cates.forEach((item) => {
            if (withDisabled) {
                item.disabled = !item.enabled
            }

            map[item.id] = item
        })

        cates.forEach((item) => {
            const parent = map[item.parent_id]

            if (parent) {
                if (parent.disabled) {
                    item.disabled = true; 
                    (parent.children || (parent.children = [])).push(item)
                }
            } else {
                if (!item.parent_id) {
                    result.push(item)
                }
            }
        });
    } catch(error) {
        console.log(error)
    }

    return result
}