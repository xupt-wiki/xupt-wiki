export interface Member {
    name: string
    title?: string
    avatarType: 'url' | 'qq' | 'github'
    github?: string
    avatarName?: string
    linkText?: string
    link?: string
}

export interface MemberGroup {
    type: string
    members: Member[]
}

export default [
    {
        type: '管理组',
        members: [
            { name: 'g0ubu1i', title: '发起人', avatarType: 'github', github: 'g0ubu1i', linkText: '博客', link: 'https://blog.goubuli.online/' },
            { name: '纸鹿/Zhilu', title: '前端/视觉', avatarType: 'github', github: 'L33Z22L11', linkText: '博客', link: 'https://blog.zhilu.cyou/' },
            { name: '百灵', title: '条目策划', avatarType: 'qq', avatarName: '2859382770' },
        ],
    },
    {
        type: '成员',
        members: [
            { name: 'Ph0m', title: '', avatarType: 'github', github: 'Ph0m1', linkText: '博客', link: 'https://blog.phom.space/' },
            { name: '毕方', title: '', avatarType: 'qq', avatarName: '2889539802' },
            { name: '困狗', title: '', avatarType: 'qq', avatarName: '1726677248', github: 'Claisenn' },
        ],
    },
] satisfies MemberGroup[]
