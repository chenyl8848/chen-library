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

export const categoryToMap = (categories) => {
    const map = {}

    categories.forEach((item) => {
        map[item.id] = item
    })

    return map
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

export const formatRelativeTime = (dateTime) => {
    if (!(typeof dateTime === 'string' && dateTime !== '')) {
        return '刚刚'
    }
    const timestamp = parseInt(new Date(dateTime).getTime() / 1000)
    const now = parseInt(new Date().getTime() / 1000)
    const diff = now - timestamp
    const minute = 60
    const hour = minute * 60
    const day = hour * 24
    const month = day * 30

    const monthC = diff / month
    const dayC = diff / day
    const hourC = diff / hour
    const minC = diff / minute

    if (monthC > 12) {
        return parseInt(monthC / 12) + ' 年前'
    } else if (monthC >= 1) {
        return parseInt(monthC) + ' 月前'
    } else if (dayC >= 1) {
        return parseInt(dayC) + ' 天前'
    } else if (hourC >= 1) {
        return parseInt(hourC) + ' 小时前'
    } else if (minC >= 1) {
        return parseInt(minC) + ' 分钟前'
    }
    return '刚刚'
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