"""

For playing around with the numpy library

Numpy is the core library for scientific computing in Python.

It provides high-performance multi-dimensional array objects and tools for
working with these arrays.
"""

import numpy as np

# CREATE AN ARRAY
#-------------------------------
array1 = np.array(
        [
            (1, 2, 3),
            (4, 5, 6),
            (7, 8, 9),
            (10, 11, 12)
            ])

print("\n\nA numpy array\n\n", array1)

# CREATE A NUMPY RANGE
#-------------------------------
range1 = np.arange(1000)
print("\n\nA numpy range - head 10\n\n", range1[:10])
print("\n\nA numpy range - tail 10\n\n", range1[-10:])

# COMPAREING MATHEMATICAL OPERATIONS FROM LISTS VS NUMPY ARRAYS
#==============================================================
SIZE = 200
## SUM WITH LISTS
l1 = range(SIZE)
l2 = range(SIZE)

list_sum = [(x + y) for x, y in zip(l1, l2)]
print("\n\nSum with lists\n\n", list_sum)

## SUM WITH NUMPY ARRARS
#-------------------------------
a1 = np.arange(SIZE)
a2 = np.arange(SIZE)

array_sum = a1 + a2
print("\n\nSum with numpy arrays\n\n", array_sum)


# OPERATIONS ON NUMPY ARRAYS
## FINDING THE DIMENSIONS OF A NUMPY ARRAY
#-------------------------------
dim1 = array1.ndim
print("\n\n", array1, "\nDimensions of the array: ", dim1)

## FINDING THE DATA TYPES IN THE ARRAY
#-------------------------------
d_type = array1.dtype
print("\n\n", array1, "\nData types in the array: ", d_type)

## FINDING THE SIZE OF THE ARRAY
#-------------------------------
size = array1.size
print("\n\n", array1, "\nSize of the array: ", size)

## FINDING THE SHAPE OF THE ARRAY
#-------------------------------
shape = array1.shape
print("\n\n", array1, "\n Shape of the array: ", shape)

## RESHAPING AN ARRAY -
#-------------------------------
array2 = array1.reshape(6, 2)
print("\n\n", array2, "\n Shape of the array: ", array2.shape)







## SLICING - EXTRACTING A PARTICULAR SET OF ELEMENTS FROM THE ARRAY
#==================================================================
value = array1[0, 2]
print("\n\n", array1, "\n The value at array1[0, 2]:", value)

value = array1[1:3, 0:2]
print("\n\n", array1, "\n The values at array1[1:3, 0:2]\n", value)

# We can slice by an array of boolens whose length is equal to the axis length
#-----------------------------------------------------------------------------
arr = np.array([
    ['me', 'you'],
    ['us', 'them']
    ])

print('The array', arr[list(map(lambda ar: ar[0] == 'us', arr)), 1])

# Slicing in steps - getting every nth item from a start [start::n]
#==================================================================
value = array1[0::3] # here well be taking every third element from the first
print("\n\n", array1, "\n The values at array1[0::3]\n", value)






## Equally spaced values between two values
array2 = np.linspace(5, 10, 20)
print("\n\n20 Equally spaced values between 5 and 10\n", array2)

## MAXIMUM VALUE IN AN ARRAY
#-------------------------------
max_val = array1.max()
print("\n\n", array1, "\n The maximum value in the array: ", max_val)

## SUM OF THE VALUES IN AN ARRAY
#-------------------------------
sum_of_vals = array1.sum()
print("\n\n", array1, "\n The sum of the values in the array: ", sum_of_vals)

### Sum Columns or Rows
#### Columns
sum_cols = array1.sum(axis=0)
print("\n\n", array1, "\n The sum of the column values: ", sum_cols)

#### Rows
sum_rows = array1.sum(axis=1)
print("\n\n", array1, "\n The sum of the row values: ", sum_rows)

## SQUARE ROOT OF A NUMPY ARRAY
#==============================
sqrt = np.sqrt(array1)
print("\n\n", array1, "\n The sqrt of the values: \n\n", sqrt)

## STANDARD DEVIATION OF A NUMPY ARRAY
#=====================================
std_dev = np.std(array1)
print("\n\n", array1, "\n The std deviation of the of all values: \n\n", std_dev)

### Standard deviation of the columns
#------------------------------------
col_std_dev = np.std(array1, axis=0)
print("\n\n", array1, "\n The std deviation of columns: \n\n", col_std_dev)

### Standard deviation of the rows
#------------------------------------
row_std_dev = np.std(array1, axis=1)
print("\n\n", array1, "\n The std deviation of rows: \n\n", row_std_dev)






# COOL NUMPY
## Create a numpy 2x3 numpy array of all zeros integers
arr = np.zeros((2, 3), dtype=np.int)
print("\n\nAll zeros array \n\n", arr)

## Create a numpy array of specified dimensions with a certain value
arr2 = np.tile(5, (3, 3))
print("\n\nAll fives array \n\n", arr2)

arr3 = np.tile(np.arange(5), (4, 3))
print("\n\nAll arange(5), 4x3 \n\n", arr3)

## Repeat each item 5 times
arr4 = np.repeat([2, 3], 5)
print("\n\n[2, 3] Repeat 5 times \n\n", arr4)


## Array BROADCASTING
### Two arrays are compatible for broadcast if each of their dimesions values
### are either equal or one of them is equal to one
### e.g. 2x3 is compatible with 2x3 and so are 5x1 and 5x1
### 3x1 is also compatible with 3x4
### 5x3 is not compatible with 5x2 and so are 4x5 and 3x4; get the point

arr5 = np.arange(10).reshape(5, 2)
arr6 = np.arange(5).reshape(5, 1)
arr7 = arr5 + arr6
print("\n\nArray Broadcasting\n\n")
print("5x2\n", arr5, "\n 5x1\n", arr6)
print("\n\n Adding a 5x2 and a 5x1 arrays\n\n", arr7)

## Transforming a 1D array into a multi dimensional array
arr8 = np.arange(10)
print("\n\nshape of arange(10) \n\n", arr8.shape)
arr9 = arr8.reshape(10, 1)
print("\n\nshape after reshape(10, 1) ", arr9, "\n\n")
print("\n\n", arr9.shape)
### alternatively arr9 = arr8[:, np.newaxis]
# print(arr8[np.newaxis, :]) # transforms the vector into a row
print(np.arange(16).reshape(2, 4, 2))
print(np.arange(16).reshape(2, 4, 2)[1, ...])
print(np.arange(16).reshape(2, 4, 2)[..., 1])

## Squeeze - remove all dimensions of length 1
arr10 = np.array([
    [1],
    [2]
    ])
arr11 = arr10.squeeze()
print("\n\nSqueezed [[1], [2]]\n\n", arr11)
# adding a new axis/dimension
print(arr11[np.newaxis, :])
print(arr10[:1, np.newaxis, np.newaxis, :])

# creating indexes
## the following will yield a 3x3 array with col and row parings as for each 
## item in the first array with each item in the second array
print(np.ix_([1, 2, 3], [0, 1, 2]))

a = np.arange(25).reshape(5, 5)
b = np.arange(75).reshape(5, 5, 3)

a = a[..., np.newaxis]
c = b + a
print(c)
print(c[::2, [0, -1]])




















