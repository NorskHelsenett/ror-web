[Back to README](README.md)

# How to - clone and run ror-web

## Clone ror-web repo

- In the [ror-web repo](https://github.com/NorskHelsenett/ror-web), find the green "Code" button, and choose SSH. If you have not set up SSH, do so instead of cloning with HTTPS, as this will save you problems later.

![image](https://github.com/user-attachments/assets/43d8eded-d74b-4f1e-afd1-5b38fd4b7698)

- Copy the text `git@github.com:NorskHelsenett/ror-web.git`.
- In a terminal, navigate to the directory you want your repo to be in, and enter `git clone git@github.com:NorskHelsenett/ror-web.git`.

## Run ror-web

- In the `ror-web` directory, create a `.env` file and add environment variables
- In the `ror-web/apps/web` directory, create a `.env.local` file and add environment variables
- In the root directory, run `npm i`
- In the root directory, run `npm run dev` or `npm run dev:all` (if you want to run with dex)
- Go to [http://localhost:11100](http://localhost:11100)
