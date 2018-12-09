def isPalidrome(string):
    length = len(string)
    if(length == 0 or length == 1):
        return True

    first_letter = string[0]
    last_letter = string[-1]
    return (first_letter == last_letter) and isPalidrome(string[1: -1])

print(isPalidrome('level'))
