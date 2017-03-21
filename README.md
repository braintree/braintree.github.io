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

5. Run the `build.js` script:

    ```
    node build.js
    ```

6. View results:

    ```
    open index.html
    ```