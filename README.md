# bierkasse

[brauereiimberg.ch](http://brauereiimberg.ch/)

## neue buchungsperiode

https://brauereiimberg.webling.ch/api/1/account/ID

account_parent = Kontenplan ID (via webling kontenplan auswaehlen und in URL id lesen)

search replace in error file

url + body => postman

## new version

make sure api key is set in client.tsx and homepage is set to bierkasseNeu in package.json

`npm run build`

go to build folder and upload via FileZilla

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## start backen

in the /backend folder:

`php -S localhost:5000`