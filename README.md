# ic4f-api

This is the back-end for my personal website, [icode4.fun](http://icode4.fun).

It consists of the following: 

* REST API implemented in Express
* data files (.csv, .md, .json format)
* a data loader utility (located in the `data_load` directory)

The data loader is a simple Node.js mini-app, written purely for fun (and education). It reads in
the [source data files](https://github.com/ic4f/ic4f-data), does a few calculations and loads the
data into MongoDB.

For hosting, I use Heroku, mLab, and DNS Made Easy.

The Angular-based front-end code [is here](https://github.com/ic4f/ic4f-ng).
The data [is here](https://github.com/ic4f/ic4f-data).

I'll add a proper readme once I've finalized this code, more or less. It's very much a work in
progress.

## License 
[MIT](LICENSE)
