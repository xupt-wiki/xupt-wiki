import members from '../data/members.json'

export type Member = Partial<{
    name: string
    title: string
    avatar: string
    github: string
    qq: string
    linkText: string
    link: string
}>

export function getAvatar(option: { qq?: string, github?: string, avatar?: string }) {
    const { qq, github, avatar } = option
    if (avatar)
        return avatar
    if (github)
        return `https://wsrv.nl/?url=github.com/${github}.png%3fsize=92`
    if (qq)
        return `https://q1.qlogo.cn/g?b=qq&nk=${qq}&s=3`
    return undefined
}

export function getAuthor(authorId: string): Member {
    const [, qq, qqName] = authorId.match(/-qq-(\d+)(?:-(\w+))?/) || []
    const github = qq ? undefined : authorId
    const memberName = members.find(member => qq ? member.qq === qq : member.github === github)?.name

    const author = {
        name: memberName ?? qqName ?? github,
        avatar: getAvatar({ github, qq }),
        link: github ? `https://github.com/${github}` : undefined,
        qq,
        github,
    }

    return author
}
