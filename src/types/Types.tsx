export type Goal ={
    id: number
    goaldescription: string
    goalpriority: number
    goalachieved: boolean
}

export type Session ={
    id: number
    sessiondate: string
    sessionsuccessful: boolean
    sessionlength?: string
    sessionpartner: boolean
    crosstraining?: boolean
    nutritioncondition: string
    sleepcondition: string
    stresscondition: string
    egocondition: string
    sessionnotes?: string
}

export type Climber = {
    id: number
    username: string
    password: string
    gymname?: string
    needpartner?: boolean
    experiencelevel?: string
    location?: string
    isAdmin?: boolean
}

export type Gym= {
    id: number
    username: string
    password: string
    gymname: string
    location?: string
}

