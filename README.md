# JSEncoder

JSEncoder is a tool to transform any Javascript file into a file containing just the characters `[]{}()!=>`. See [this video](https://youtu.be/sRWE5tnaxlI) for detailed explanation on how this is achieved.

## How to use

### Mac / Linux

First give access to `encode` script by executing `chmod u+x encode`. Then execute:

``` terminal
> encode [inputFile] [outputFile]
```

> outputFile argument is optional. The default output filename is inputFile_encoded.js
