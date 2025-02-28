
export enum ETakes {
    ide = "ide",
    ai = "ai",
    terminal = "terminal",
    browser = "browser",
    accessories = "accessories",
    learningCode = "learningcode",
    os = "os",
    apps = "apps",


    list = "list",
    unknown = "unknown", // Default "I dont have a take on this"
}

export interface TakeData {
    title: string,
    description: string,
    points: string[]
}

export const takes: Record<ETakes, TakeData> = {
    [ETakes.ide]: {
        title: "IDEs",
        description: "That place you write code in.",
        points: [
            "I have a take on VSCode",
            "I have a take on Sublime",
        ],
    },
    [ETakes.ai]: {
        title: "AI",
        description: "Smart robot that isn't actually smart.",
        points: [
            "I have a take on GPT",
            "I have a take on ChatGPT",
        ],
    },
    [ETakes.terminal]: {
        title: "Terminals",
        description: "The place you run the code you wrote.",
        points: [
            "I have a take on Windows Terminal",
            "I have a take on iTerm",
        ]
    },
    [ETakes.browser]: {
        title: "Browsers",
        description: "How you figure out what 2+2 is.",
        points: [
            "I have a take on Chrome",
            "I have a take on Firefox",
        ]
    },
    [ETakes.accessories]: {
        title: "Accessories",
        description: "Things that go click clack",
        points: [
            "I have a take on Keyboards",
            "I have a take on Mice",
        ]
    },
    [ETakes.os]: {
        title: "Operating Systems",
        description: "Oh boy, heated topic here...",
        points: [
            "I have a take on MacOS",
            "I have a take on Windows",
        ]
    },
    [ETakes.learningCode]: {
        title: "Learning Code",
        description: "The torment I subject myself to daily.",
        points: [
            "Python is a great place to start. Although quite a few people hate it, if you are brand new to programming, it is the best language to learn. Python strikes a perfect balance between read/writability and functionality.",
            "Typescript is a solid medium level language. Most of my projects are in Typescript and I love it.",
            "Rust is supreme. I'm transitioning from Typescript to Rust and it is wonderful.",
        ]
    },
    [ETakes.apps]: {
        title: "Apps",
        description: "Glorified websites.",
        points: [
            "I have a take on Discord",
            "I have a take on Slack",
            "I have a take on Whatsapp",
        ]
    },




    [ETakes.unknown]: {
        title: "Idk man",
        description: "I dont have a take on this",
        points: [
            "I dont have a take on this",
            "lmao",
            "(You should probably go back to the takes page. Click the thing at the top left)"
        ]
    },
    [ETakes.list]: {
        title: "List",
        description: "Its just a big list of all the takes I have",
        points: [
        ]
    },
}