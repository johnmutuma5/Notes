# Mastering Git - Paola Perrotta (Pluralsight)
[Link to the course](https://app.pluralsight.com/library/courses/mastering-git/table-of-contents)

## Tutorial notes
Just like the tutorial, these notes do not focus on the numerous `Git` commands and their numerous options; that is information you can find as you need it. These notes focus on the `Git` 'way of thinking'.

# Table of Contents
- [Git objects](#git-objects)
- [Git branches](#git-branches)
  - [Current branch](#current-branch)
- [The four areas](#the-four-areas)
- [Basic workflow](#basic-workflow)
  - [Moving files to the right](#moving-files-to-the-right)


## Git objects
Stored in a directory called objects in .git.

- Blobs - synonymous to files
- Trees - synonymous to directories
- Commits - representation of versions. They include a tree represented as a SHA1 hash and a parent commit. The tree holds the contents of the git repo; these include other directories as trees and files as blobs
- Annotated tags - markers pointing to a particular commit.


## Git branches
Git branches are stored in a directory called refs in .git. Technically, a branch is a file that stores a reference to a commit.

### Current branch
The current branch is stored as a ref inside a file called HEAD in .git.

## The four areas
- The working area - This is where you work and edit files

- The repository - The repository is in the `.git` folder. It contains `blobs`, `trees`, `commits` and `branches`. They are immutable. `Branches` are a reference to a `commit`. `Commits` point to `blobs` and `trees`. `Commits` can share `objects`. `Commits` also contain refs to the parent(s).

- The index - This is the staging area. `Tracked` but `uncommited` changes live here.

- The stash - More on this later

## Basic workflow

| Working area | The index | The repository |
|:------------:|:---------:|:--------------:|
| menu.txt     | menu.txt  | menu.txt       |
| recipes      | recipes   | recipes        |

### Moving files to the right
The `git add` command copies changed files from the `working area` to the `index`.

Running `git diff` shows the deltas of files in the `working area` and the `index`. `git diff --cached` shows the deltas between what is being tracked and what has been commited already i.e. the differences between the `index` and the `repository`. These will be moved to the `repository` in the next commit.

`git commit` copies changed files from the `index` to the `repository`.

`git checkout` moves `HEAD` to a specified `commit` or `branch`(*remember a branch is jus a reference to a commit*) and copies files that are in that `commits` tree to the `index` and the `working area`.

### Removing files
`git rm` in its plain form attempts to remove files both from the `index` and from the `working area`. You're likely to get a security warning with this command especially if you risk losing data. If that happens, `Git` gives you an option of removing the file and losing it with the `-f` option(`git rm -f`) discarding the file both from the `working area` and the `index`. You also have another option `--cached` which triggers the effect of removing the file only from the `index` becoming untracked again. The file is `unstaged`.

### Renaming / moving files
If we decided to rename `menu.txt`, with a markdown extension for example, to `menu.md`;

> `mv menu.txt menu.md`

`Git` would `menu.md` in the working area and `menu.txt` in the index. A `git status` at this point would show a new untracked file `menu.md` in the `working area` and a file `menu.txt` in the index marked as deleted because it does not exist in the working area.


| Working area | The index | The repository |
|:------------:|:---------:|:--------------:|
| menu.md      | menu.txt  | menu.txt       |
| recipes      | recipes   | recipes        |

With `git add menu.md`, we copy that to the `index`:

| Working area | The index | The repository |
|:------------:|:---------:|:--------------:|
| menu.md      | menu.txt  | menu.txt       |
|              | menu.md   |                |
| recipes      | recipes   | recipes        |

A `git add` overwrites files from the `working area` to the `index`. If the file is none in the `working area` but existent in the `index`, it is overwritten with `None` because that is what is in the `working area`. Consequently, in our table above, `git add menu.txt` will overwrite `menu.txt` in the `index` with `None` thus deleting it. We end up with:

| Working area | The index | The repository |
|:------------:|:---------:|:--------------:|
| menu.md      | menu.md   | menu.txt       |
| recipes      | recipes   | recipes        |

Hence the workflow for renaming files:

> `mv menu.txt menu.md`

> `git add menu.md`

> `git add menu.txt`

There is a shortcut for this, `git mv menu.txt menu.md`. The three-step approach above is the ideal especially when mastering `Git`.

Finally, we can copy changes that to the `repository` as usual with `git commit -m 'Mesage here'`.

| Working area | The index | The repository |
|:------------:|:---------:|:--------------:|
| menu.md      | menu.md   | menu.md        |
| recipes      | recipes   | recipes        |


## Git reset
Reset moves the current branch and `HEAD` to point to a particular `commit` or `branch` or `tag` or `HEAD` and optionally copies files to the `index` and/or the `working area`.

`git reset` with the `--hard` option resets the branch to point to a specified commit and updates the `index` and the `working area` with files in that commit's tree. The `--mixed` option copies the files only to the `index` and not to the `working area`. This can be useful when undoing a commit(s).

## Acknowledgements
Paola Perrotta - Pluralsight tutor
