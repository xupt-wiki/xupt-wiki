// import labs from '../data/labs.json'

export interface Lab {
    id: string
    name: string
    qq: string
    belong: string
    tags: string
    addr: string
    join: string
    github: string
    website: string
    plan: string
    note: string
}

export function getAvatar(lab: Lab) {
    const { qq, github } = lab

    return github
        ? `https://wsrv.nl/?url=github.com/${github}.png%3fsize=128`
        : qq
            ? `https://p.qlogo.cn/gh/${qq}/${qq}/0/`
            : undefined
}
