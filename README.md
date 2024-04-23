# Object Detection Viewer - Overview.ai

## Technologies

Project developed with the the following technologies:

- Back-end

  - Python
  - Flask
  - PostgreSQL

- Front-end

  - Next.js
  - React.js
  - TypeScript
  - Fabric.js
  - Axios

## How to start the project?

> 💡 Before starting, you must have already to install in your computer the software below:
>
> - Git
> - Node
> - Python
> - Postgres
> - Docker

### Starting step by step

1. Open the terminal and clone the project repository, use the following command:

```bash
git clone git@github.com:cleytonoliveira/object-detection-viewer.git
```

2. After, enter in the directory below:

```bash
cd object-detection-viewer/api
```

3. If you already have Docker installed in you machine and want to used to run the project, please use the `POSTGRES_HOST=db` variable in `.env.development`.

4. Now run the command below:

```bash
make run
```

> ⚠️ If the last process worked for you, go to step 6.

5. If you want to run locally, you need to install the packages using the command below:

```bash
pip install -r requirements.txt
```

6. Now you can start the application using the command:

```bash
python app.py
```

7. Now you need to have the PostgreSQL installed locally or running by Docker. If step 3 worked for you, or if you already have the PostgreSQL installed. Now you need to run the migrations with the command below:

```bash
flask db upgrade -d infra/migrations
```

8. Now you are ready to start the front-end. Use the command to go for the right directory:

```bash
cd ../client
```

9. Install the packages using:

```bash
npm install
```

10. Now start the application:

```bash
npm run dev
```

## What did I learn with this project?

- Run migrations using Python-Migrate in a Flask environment;
- Using environment variable in Flask situation;
- Connect PostgresSQL using Flask;
- How to convert a string base64 to image;
- How to use CORS in Flask environment;
- How to handle canvas using Fabric.js

## What I could improve in the project?

- Make integration and unit tests for back-end and front-end;
- Apply validations to the fields in back-end requests;
- Improve the architecture in the back-end, maybe using Clean Architecture;
- Implement a detection of objects using a Webcam. I looked for a react-webcam, but unfortunately, I didn't try;
- Deploy the back-end in Neon or Digital Ocean and the front-end in a vercel environment.
