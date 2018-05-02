# Mastering Git - Paola Perrotta
## Tutorial notes
Just like the tutorial, these notes do not focus on the numerous `Git` commands and their numerous options; that is information you can find as you need it. These notes focus on the `Git` 'way of thinking'.

# Table of Contents
- [Git objects](#git-objects)
- [Git branches](#git-branches)
  - [Current branch](#current-branch)
- [The four areas](#the-four-areas)
- [Basic workflow](#basic-workflow)


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
The `git add` command moves files from the `working area` to the `index`.

## Acknowledgements
Paola Perrotta - Pluralsight tutor
