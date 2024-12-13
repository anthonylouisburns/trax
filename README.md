This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


<!-- TODO #4 update look tailwind formatting -->
<!-- TODO #5 build dynamic form -->


## Modal and python

### first time
Install pyenv -  https://github.com/pyenv/pyenv-virtualenv 
> brew install pyenv-virtualenv

set up virtualenv
> pyenv virtualenv 3.13.0 modal-python-3

### everytime
activate pyenv 
> pyenv virtualenv 3.13.0 modal-python-3

install requirements
> pip install --upgrade pip

> pip install -r requirements.txt

save requirements
> pip freeze > requirements.txt

login to modal dashboard and get an API Token https://modal.com/settings/dealstart/tokens

will prompt you to set your modal configs
> modal token set --token-id ? --token-secret ? --profile=dealstart

you can than push changes if needed 
> cd modal
> modal deploy App.py

<!-- TODO add notes on starting next.js server -->
<!-- TODO add notes on starting convex app -->
<!-- TODO make everything configurable for dealstart -->