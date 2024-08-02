import moment from "moment"

const extMapIcon = {
    '.pdf': 'pdf',
    '.doc': 'word',
    '.docx': 'word',
    '.rtf': 'word',
    '.wps': 'word',
    '.odt': 'word',
    '.dot': 'word',
    '.ppt': 'ppt',
    '.pptx': 'ppt',
    '.pps': 'ppt',
    '.ppsx': 'ppt',
    '.dps': 'ppt',
    '.odp': 'ppt',
    '.pot': 'ppt',
    '.xls': 'excel',
    '.xlsx': 'excel',
    '.et': 'excel',
    '.ods': 'excel',
    '.csv': 'excel',
    '.tsv': 'excel',
    '.txt': 'text',
    '.epub': 'epub',
    '.mobi': 'mobi',
    '.chm': 'chm',
    '.umd': 'umd',
}

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
    } catch (error) {
        console.log(error)
    }

    return result
}

export const formatDateTime = (time) => {
    if (typeof time === 'string' && time !== '') {
        const dateTime = new Date(time)
        return formatTimeToString(dateTime)
    }

    return '-'
}

export const formatTimeToString = (dateTime, pattern) => {
    const date = new Date(dateTime)
    const momentDateTime = moment(date.getTime())
    let strDateTime = momentDateTime.format('YYYY-MM-DD HH:mm:ss')
    if (pattern) {
        strDateTime = momentDateTime.format(pattern)
    }

    return strDateTime
}

export const formatBytes = (bytes, decimal = 2) => {
    if (!+bytes) {
        return '0 Bytes'
    }

    const k = 1024
    const dm = decimal < 0 ? 0 : decimal
    const size = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${(bytes / Math.pow(k, i)).toFixed(dm)} ${size[i]}`
}

export const getIcon = (ext) => {
    return extMapIcon[ext] || 'other'
}