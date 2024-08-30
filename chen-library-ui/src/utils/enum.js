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

export const datetimePickerPunishmentShortcuts = [
    {
        text: '1小时',
        onClick(picker) {
            const end = new Date()
            end.setTime(end.getTime() + 3600 * 1000)
            picker.$emit('pick', end)
        },
    },
    {
        text: '12小时',
        onClick(picker) {
            const end = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 12)
            picker.$emit('pick', end)
        },
    },
    {
        text: '1天',
        onClick(picker) {
            const end = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24)
            picker.$emit('pick', end)
        },
    },
    {
        text: '2天',
        onClick(picker) {
            const end = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 2)
            picker.$emit('pick', end)
        },
    },
    {
        text: '1周',
        onClick(picker) {
            const end = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', end)
        },
    },
    {
        text: '1月',
        onClick(picker) {
            const end = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 30)
            picker.$emit('pick', end)
        },
    },
    {
        text: '半年',
        onClick(picker) {
            const start = new Date()
            const end = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 183)
            picker.$emit('pick', [start, end])
        },
    },
    {
        text: '1年',
        onClick(picker) {
            const start = new Date()
            const end = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 365)
            picker.$emit('pick', [start, end])
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

export const boolEnum = [
    { label: '是', value: true, type: 'success' },
    { label: '否', value: false, type: 'danger' },
]

export const methodEnum = [
    {
        label: 'GET',
        value: 'GET',
        type: 'success',
    },
    {
        label: 'POST',
        value: 'POST',
        type: 'primary',
    },
    {
        label: 'PUT',
        value: 'PUT',
        type: 'warning',
    },
    {
        label: 'DELETE',
        value: 'DELETE',
        type: 'danger',
    },
    {
        label: 'GRPC',
        value: 'GRPC',
        type: 'primary',
    },
]

export const punishmentEnum = [
    { label: '禁用账户', value: 1, type: 'danger' },
    { label: '禁止评论', value: 2, type: 'warning' },
    { label: '禁止上传', value: 3, type: 'warning' },
    { label: '禁止下载', value: 4, type: 'warning' },
    { label: '禁止收藏', value: 5, type: 'warning' },
    { label: '禁止发布文章', value: 6, type: 'warning' },
]


