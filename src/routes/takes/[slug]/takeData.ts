
export enum ETakes {
    ide = "ide",
    ai = "ai",
    terminal = "terminal",
    browser = "browser",
    accessories = "accessories",
    learningCode = "learningcode",
    os = "os",
    list = "list",
    

    unknown = "unknown", // Default "I dont have a take on this"
}

export enum TooltipPosition {
    BottomLeft,
    BottomRight,
    TopLeft,
    TopRight
}

export interface TakeData {
    title: string,
    description: string,
    points: string[]
}

export const takes: Record<ETakes, TakeData> = {
    [ETakes.ide]: {
        title: "IDE",
        description: "I have a take on IDEs",
        points: [
            "I have a take on VSCode",
            "I have a take on Sublime",
        ],
    },
    [ETakes.ai]: {
        title: "AI",
        description: "I have a take on AI",
        points: [
            "I have a take on GPT",
            "I have a take on ChatGPT",
        ],
    },
    [ETakes.terminal]: {
        title: "Terminal",
        description: "I have a take on terminals",
        points: [
            "I have a take on Windows Terminal",
            "I have a take on iTerm",
        ]
    },
    [ETakes.browser]: {
        title: "Browser",
        description: "I have a take on browsers",
        points: [
            "I have a take on Chrome",
            "I have a take on Firefox",
        ]
    },
    [ETakes.accessories]: {
        title: "Accessories",
        description: "I have a take on accessories",
        points: [
            "I have a take on Keyboards",
            "I have a take on Mice",
        ]
    },
    [ETakes.os]: {
        title: "OS",
        description: "I have a take on OS",
        points: [
            "I have a take on MacOS",
            "I have a take on Windows",
        ]
    },
    [ETakes.learningCode]: {
        title: "Learning Code",
        description: "Coding is like being the detective in a crime movie where you are also the murderer.",
        points: [
            "Python is a great place to start. Although quite a few people hate it, if you are brand new to programming, it is the best language to learn. Python strikes a perfect balance between read/writability and functionality.",
            "Typescript is a solid medium level language. Most of my projects are in Typescript and I love it.",
            "Rust is supreme. I'm transitioning from Typescript to Rust and it is wonderful.",
        ]
    },
    [ETakes.unknown]: {
        title: "Idk man",
        description: "I dont have a take on this",
        points: [
            "I dont have a take on this",
            "lmao"
        ]
    },
    [ETakes.list]: {
        title: "List",
        description: "List of takes",
        points: [
        ]
    },
}