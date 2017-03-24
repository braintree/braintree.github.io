# Braintree Open Source

This is the repository for Braintree's [list of open source projects](https://braintree.github.io).

Like what you see? [Work with us!](https://www.braintreepayments.com/careers)

## How to rebuild

This project uses [metalsmith](http://www.metalsmith.io/) to build a single page. See [build.js](build.js) for the majority of the logic.

1. Clone this repo.
2. Install [`nvm`](https://github.com/creationix/nvm)
3. Use `nvm` to install node:

    ```
    nvm install
    ```

4. Use `npm` to install dependenceis:

    ```
    npm install
    ```

5. Create a `.github_api_auth` file containing [auth credentials that can be consumed by `node-github`](https://github.com/mikedeboer/node-github#authentication). For example, if using a [personal access token](https://github.com/settings/tokens):

    ```
    {
        type: "token",
        token: "YOUR_PERSONAL_ACCESS_TOKEN",
    }
    ```

6. Run the build script:

    ```
    npm run build
    ```

7. View results:

    ```
    open index.html
    ```