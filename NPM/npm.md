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

#### Listing installed packages
With `npm list`. This will print out to the command line a tree of installed packages and their dependencies. We can further specify the depth of dependencies to print out in the tree. e.g. `npm list --depth 1` will only print out dependencies installed and their dependencies one level, i.e. not including the dependencies of the dependencies.

With `npm list --global`, we can print out the dependencies installed, you guessed it, globally.

We may also get the output in a JSON format with `--json true` option.

### Removing dependencies
Dependencies can be removed from the project using `npm uninstall`. This will however not remove them from the `package.json` list of dependencies. To do that, use `npm uninstall <package> --save`. To remove a global package, add the `-g` flag.

### Installing specific versions
#### Semantic versioning
This is a system of versioning represented by three digits separated by commas. Each of the three digits means something not just to the developer but also to every other developer.

E.g. `v1.8.3`, in this version;
- 1 -- the major version
- 8 -- the minor version
- 3 -- the version revision or patch number


The patch number is only incremented when you make things like bug fixes or performance improvements. Things that don't affect features of the package.
The minor version means that there are new features involved. No pre-existing functionality is broken.
The major version includes breaking previous functionality and usually changes that are not backwards compatible.

Installing a specific version:
- `npm install <package>@'1'` - installs the latest version of major version 1
- `npm install <package>@'<=1.8'` - installs the latest version not more than 1.8

By default npm installs the specified version but a look into the `package.json`, it is listed with a preceeding caret `^`. i.e. `'^1.8.3'`. This means that in future installations, npm can install any newer versions. To ensure that `npm` always installs the specified version, remove the `^`. This can also be done by specifying the `--save-exact` option. i.e. `npm install <package>@'<=1.8' --save --save-exact`.

Besides the `^`, `package.json` can also name package versions with a tilde `~`. While the caret `^` means install the latest version of the major release i.e. the latest minor version, the `~` means install the latest version of the minor release. i.e. the latest patch.

### Updating dependencies to their latest version
This can be done using `npm update`. We can also be more specific like `npm update --prod` to update production dependencies. Updating a single dependency can be done with `npm update express`. Updating a global package can be done with the `-g` flag. e.g. `npm update -g express`.
