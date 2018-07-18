# NPM Tutorial
These notes are taken from [NPM Playbook](https://app.pluralsight.com/library/courses/npm-playbook/table-of-contents), a course on Pluralsight.

## NPM Basics
NPM is Node Package Manager

### Difference between a package and a module
A module is a single javascript file that has reasonable functionalities. A package is a directory that has more that more modules and sub-directories inside of it and a `package.json` which includes the package metadata.

### Getting help
Run `npm -h` to view usage criteria for `npm`. We may also be very specific about a particular command for which we need help. This can be done by `npm <command> -h`. e.g. `npm install -h`. This prints help in the command line. Sometimes we may need more comprehensive help from the documentation. We can launch the documentation help also from the terminal with `npm help <command>`. This will open a browser and open a page in the official documentation for that command.

#### Searching help for unknown commands
Sometimes we may want to search help for a command whose specific name is not very clear to us. e.g. we may want to search help for commands like to remove items from node_modules. To search the command, use `npm help-search <term>`. It will take us to a list of commands whose documentation include `term` from the command just ran.


### Creating a `package.json`
This has a couple of advantages:
- Tracking project dependencies
- Creating scripts

A project with a `package.json` file can be initiated with `npm init`. NPM will take us throw a few steps with questions whose answers as we provide will help in creating the `package.json` file. There are defaults and we can simply run `npm init -y` to create `package.json` with all the defaults.

#### Setting custom defaults
Besides accepting `npm` defaults, we can also define custom defaults with `npm set init-<key> <value>`. e.g. `npm set init-author-name 'John Mutuma'`. There is also `npm get init-<key>` to access the current default value.
