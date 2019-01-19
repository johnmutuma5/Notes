# BASH and ZSH Scripting
Shell scripting increases your productivity by saving time taken to run common commands.

## Popular commands and operators

- `pwd` - this echos the current directory.
- `ls` - list contents of a directory
  - `ls <dir>` - list contents of `<dir>`
- `cp` - making copies
- `history` - shows a list of commands executed in the current terminal
- `|` - the `Pipe` sends output of one command as input of the another command
- `grep` - searches input line by line for a given pattern
- `>`, `>>` - these redirect output of a command to a file
- `!!` - replays the previous command
- `!^`, `!$` - collects the first and last arguments of the previous command respectively
- `^<content>^<new_content` - replaces `content` int he previous command with `new_content` and runs.

### Brace expansion {`<pattern>`}
This allows us to create multiple strings from a pattern.
e.g. `name{0..9}` expands to `name0`, `name1`, ... , `name9`
You can combine this with other commands e.g. `mkdir cool-hack{0..9}`, `rm -r cool-hacks{0..9}`

### Copying files
We use the command `cp` to make copies of files.

> `cp file1.txt cool-hack1`

### The wildcard `*`
This matches `everything`

e.g.
- `rm *` - deletes everything
- `rm a*.txt` - deletes everything that starts with an `a` and `.txt` i.e. text files staritng with `a`.

### Using the `Pipe` operator `|`
This is used to send the standard output of a command into the standard input of another.
e.g. using `history` prints out commands run in the current terminal, and using `tail` with input prints out the last ten items of the input. We can send the output of `history` to be input of `tail` with the `Pipe` operator:
> `history | tail`
> `history | tail -5`

### Using `grep`
`grep` searches input line by line matching a pattern, usually regex. As grep takes input, we can also send input into `grep` with the `Pipe`.

> `history | grep mk`


### Redirecting `>` and `>>`
These redirect output of a command to a file. They will create a file if it doesn't exist.
`>` overwrites the contents of a file if it exists and `>>` appends to the contents of a file if it exists.

> `history | grep laz > lazcommands.txt`

### Using `^<content>^<new_content`
replaces `content` int he previous command with `new_content` and runs.

> `sud install pip`

If `sudo` was intended in place of `sud`:
> `^sud^sudo`

### Stream editor `sed`
Useful for manipulating string of input.

e.g.

> `sed 's/<to_replace>/<replacement>/' <filename>`

More on `sed` in later notes here.

### Aliasing
This allows us to make shortcuts for common commands.

e.g. make an alias of `git status` to be `gits`
> `alias gits = "git status"`

You can add aliases to your `~/.bash_profile` file to load every time you open up a terminal.

### Keyboard shortcuts
`CTRL + r` - search commands history
`CTRL + e` - put cursor to the end of command
`CTRL + a` - put cursor to the beginning of a command
`CTRL + w` - cut content to the left of cursor in a command
`CTRL + k` - cut content to the right of cursor in a commmand
