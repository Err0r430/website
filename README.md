People requested that i make this open sourced so why not.

# Error's website!
> Disclaimer: I am not a web developer! I know absolutely nothing about designing interfaces or making something look good and perform well. Because of this, I have no idea how to make this mobile-friendly. I am willing to bet I used some convoluted methods to get things working. Please don’t go too crazy on my practices. I learned from bits and pieces of documentation, YouTube, Google, and ChatGPT. That said, here you go.
Currently live [here](https://error430.dev)

## Showcase
![](https://cdn.discordapp.com/attachments/1313573387003625472/1332204117723971584/image.png?ex=67951004&is=6793be84&hm=056d0b24dc6db20d2cf6921630f1969ee0ab21053d61722c020da9601b30c55b&)


## Prerequisites
 * [Node.js](https://nodejs.org) (I used 22.0.0)
 * [pnpm](https://pnpm.io)
 * [NGINX](https://nginx.org) (for serving the site)

## Installation
 * Install the necessary prerequisites as needed by your specific use case.

 * [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) the repository
```sh
git clone git@github.com:Err0r430/website.git
```

* Install package dependencies:
```sh
cd /path/to/project
pnpm install
```
## Development
* To run the site locally, run the following command in the project root

```sh
pnpm dev
```

* The site will be exposed at `http://localhost:5147`. (or whatever your vite config says)

## Production

* To build for production, run the following commands in project root
```sh
pnpm build
```
```sh
pnpm preview
```

## Tools
* [Captcha Gen](https://usefoyer.com/tools/captcha-generator)

## Final notes
I used a proprietary nginx config to forward my domain (error430.dev) to my servers localhost and used certbot for ssl.

As I said, I am no web dev and am not familiar with svelte as much as I am with something like nextjs. I genuinely loved making some of these elements (particularly the windows error popup) and following tutorials for this. I will 100% revisit svelte in the future and might improve this in the future. If you know of a way to improve things or want to spend some of your time sifting through the horribly structured project to make a PR then by all means thank you! Otherwise, this was a super fun project I spent ~3h on. 

