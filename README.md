# bun-frameworkless-ts-spa

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.2. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

STUDY NOTES:

bun x cowsay Hello Bun -> bun x runt een package zonder hem te installeren, handig als je het maar 1x wilt gebruiken

    Om dom types in typescript te krijgen:

If you are using bun instead of node, then you need to use `bun add @types/web -D` and add web to your types in tsconfig.json.
The problem is explained at https://github.com/oven-sh/bun/issues/3030
Solution
https://github.com/oven-sh/bun/issues/463#issuecomment-1636727109
