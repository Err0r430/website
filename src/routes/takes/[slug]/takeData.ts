
export enum ETakes {
    ide = "ide",
    ai = "ai",
    terminal = "terminal",
    browser = "browser",
    accessories = "accessories",
    learningCode = "learningcode",
    os = "os",
    apps = "apps",
    sweatshirts = "sweatshirts",


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
            "VSCode: New? use it. Seasoned veteran? use it. It's my daily driver and the most reliable and complete IDE out there for general programming.",
            "Zed: It's close to being usable. The Zed team is doing wonders and I'm excited to see where it goes. Until then, it's lack of plugin support and lack of intuitive settings is a deal breaker. It might have just been me, but I genuinely can't get around their keybinds and am unable to set them.",
        ],
    },
    [ETakes.ai]: {
        title: "AI",
        description: "Smart robots that aren't actually smart.",
        points: [
            "AI is really really cool. It's INSANE that we are able to do some complex math and have a program understand an input and output something accordingly.", 
            "I enjoy using ChatGPT and Claude. You should give em a try.",
        ],
    },
    [ETakes.terminal]: {
        title: "Terminals",
        description: "The place you run the code you wrote.",
        points: [
            "In my eyes there are only two terminals worth using: Default VSC term and Ghostty.",
            "Ghostty is a polished and complete product perfectly tailored for developers on macOS. It's attention to detail and native feeling make it a joy to work with.",
            "The default VSC terminal is fine. Does the job but oh my zsh doesnt look good with it.",
            "ITerm is alright? It's a terminal emulator but it doesn't feel as native. Same applies to Alacritty.",
        ]
    },
    [ETakes.browser]: {
        title: "Browsers",
        description: "How you figure out what 2+2 is.",
        points: [
            "Firefox is overrated. All the privacy freaks whine about how awesome it is but Gecko (its rendering engine) is far from perfect. Normal every day sites that work perfectly on chromium require a full refactor just to work on gecko.",  
            "Chrome is chrome, default and basic as it gets.",
            "Arc is supreme. It manages to feel more native and polished then safari itself.", 
            "Zen is a wannabe Arc executed poorly. It attempts to cater to the privacy freaks of firefox being \"based on firefox\" while trying to copy Arc's interface. It's nowhere near as complete and polished as Arc. Just because something doesn't get new features weekly doesn't mean it's bad. It means it's complete. "
        ]
    },
    [ETakes.accessories]: {
        title: "Accessories",
        description: "Things that go click clack",
        points: [
            "I'm not a huge keyboard guy. If it clicks, clacks, and enters text then i'm happy!",
            "If you do really care, I use a wooting 60he.",
            "Same goes for mice. I use an Anker vertical mouse for work and a Glorious model D for gaming.",
        ]
    },
    [ETakes.os]: {
        title: "Operating Systems",
        description: "Oh boy, heated topic here...",
        points: [
            "You came here to see my take on an operating system. Reminder that this is your choice. ",
            "Windows is hot garbage. It's slow, memory hungry, and FULL of bloat. Nobody in their right mind should daily drive it unless they use vram heavy applications or games.",
            "Linux as a daily OS is horrible. Sure it's fast and has literally no bloat, but it's only used by script kids and people who want to feel cool. It's only practical for servers.",
            "MacOS is supreme. It's a fully finished product that caters directly to a developer's workflow. It's ecosystem is unmatched and style is on point." 
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
            "Apps are cool, I like apps.",
            "If I had to give you 3:",
            "Alcove",
            "Arc",
            "Ghostty"
        ]
    },
    [ETakes.sweatshirts]: {
        title: "Sweatshirts",
        description: "The best sweatshirts.",
        points: [
            "Why the actual heck do sweatshirts with pull strings just let you pull the entire string through? Like what the heck I don't want to go fishing and prodding just to feed it back through so it can fall out again.",
            "My proposal is to somehow make internal knots somewhere along the string so that they cant physically be pulled through.",
            "Why the heckity heck do I have to spend 5 minutes feeding that stupid string back through when it could just be stuck there? Also if you're about to say \"So you can clean it\" then think again, who the heck cleans their sweatshirt string you freak.",
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