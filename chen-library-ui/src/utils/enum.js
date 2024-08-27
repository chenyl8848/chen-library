/**
 * 日期范围选择器快捷项
 */
export const datetimePickerShortcuts = [
    {
        text: '最近一周',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
        },
    },
    {
        text: '最近一个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
        },
    },
    {
        text: '最近三个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
        },
    },
    {
        text: '最近半年',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 183)
            return [start, end]
        },
    },
    {
        text: '最近一年',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
            return [start, end]
        },
    },
]

export const documentStatusEnums = [
    { label: '待转换', value: 0, type: 'info' },
    { label: '转换中', value: 1, type: 'primary' },
    { label: '已转换', value: 2, type: 'success' },
    { label: '转换失败', value: 3, type: 'warning' },
    { label: '已禁用', value: 4, type: 'danger' },
    { label: '重新转换', value: 5, type: 'info' },
    { label: '待审核', value: 6, type: 'warning' },
    { label: '审核拒绝', value: 7, type: 'danger' },
]

export const articleStatusEnums = [
    { label: '待审核', value: 0, type: 'info' },
    { label: '审核通过', value: 1, type: 'success' },
    { label: '审核拒绝', value: 2, type: 'danger' },
]

export const wordExtEnum = ['.doc', '.docx', '.rtf', '.wps', '.odt', '.dot']

export const pptExtEnum = ['.ppt', '.pptx', '.pps', '.ppsx', '.dps', '.odp', '.pot']

export const excelExtEnum = ['.xls', '.xlsx', '.csv', '.tsv', '.et', '.ods']

export const otherExtEnum = ['.epub', '.umd', '.chm', '.mobi', '.azw', '.azw3', '.azw4']