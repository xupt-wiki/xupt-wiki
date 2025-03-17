import members from '../data/members.json'

export interface Member {
    name: string
    title: string
    avatar?: string
    github?: string
    qq?: string
    linkText: string
    link: string
}

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

export const avatarIndex = members.reduce((acc, { name, github, qq }) => {
    if (github)
        acc[github] = name
    if (qq)
        acc[`-qq-${qq}`] = name
    return acc
}, {})

export function getAuthor(authorId: string) {
    const qq = authorId.match(/-qq-(\d+)/)?.[1]

    const author = {
        name: avatarIndex[authorId] || authorId,
        link: qq ? undefined : `https://github.com/${authorId}`,
        avatar: getAvatar(qq ? { qq } : { github: authorId }),
    }

    return author
}
