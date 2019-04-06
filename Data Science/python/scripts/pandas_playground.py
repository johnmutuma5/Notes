"""
For playing around with the pandas library
"""

import pandas as pd
import numpy as np
# import matplotlib as plt
from matplotlib import style
style.use("fivethirtyeight")

# dataframes from python objects
data_ = {
    "Day": [0, 1, 2, 3, 4],
    "Visitors": [7000, 3000, 2000, 5000, 1000],
    "Bounce_rate": [20, 30, 25, 29, 12]
    }

df = pd.DataFrame(data_)
print(df.head(2))


## Merging and Joining data frames
df1 = pd.DataFrame(
        {
            "HPI":  [80, 90, 70, 60],
            "Int_rate": [10, 12, 15, 14],
            "KEN_GDP": [50, 45, 67, 54]
            },
        index=[2001, 2002, 2003, 2004])


df2 = pd.DataFrame(
        {
            "HPI":  [80, 90, 70, 60],
            "Int_rate": [10, 12, 15, 14],
            "KEN_GDP": [50, 45, 67, 45]
            },
        index=[2005, 2006, 2007, 2008])

### Merging
merge = pd.merge(df1, df2)
print(merge)

#### Merging by a column
merge = pd.merge(df1, df2, how="left", on="HPI")
print(merge)

#### Merging with different column names
merge = pd.merge(df1, df2, how="left", left_on="HPI", right_on="HPI")
print(merge)

#### Merging with multiple columns
merge = pd.merge(df1, df2, how="left", left_on=["HPI", "KEN_GDP"],
                 right_on=["HPI", "KEN_GDP"])
print(merge)

### Joining
#### Joins on the index
df3 = pd.DataFrame(
        {
            "Unemployment": [10, 15, 12, 13],
            "CBI_rate": [8, 7, 9, 6]
            },
        index=[2005, 2006, 2008, 2009])

joined = df2.join(df3)
print("\n\nJoined\n\n", joined)

## Changing the index and column headers
### changing the index to be one of the columns
df4 = pd.DataFrame(
        {
            "Day": [1, 2, 3, 4, 5],
            "Visitors": [1000, 1200, 1500, 1000, 900]
            })

df5 = df4.set_index("Day")
print("\n\nWith Day set as index\n\n", df5)
# df4.plot()
# plt.pyplot.show()

### Changing the name of columns
df6 = df4.rename(columns={"Visitors": "Users"})
print("\n\nWith Visitors column renamed to Users\n\n", df6)

## Concatenating data frames - i.e. UNION
df7 = pd.DataFrame(
        {
            "Day": [6, 7, 8, 9, 10],
            "Visitors": [1500, 1600, 1200, 900, 1900]
            })

df8 = pd.concat([df4, df7]).set_index("Day")
print("\n\nConcatenating two dataframes\n\n", df8)

## Data Munging
### convert one form of data into another e.g. txt, json, xml, xhtml, xls, csv etc
df9 = pd.read_csv("scripts/my_data.csv", index_col=0)
print("\n\nRead from csv file\n\n", df9)

### Convert to html
df9.to_html("my_data.html")

# Counting Missing data
df10 = pd.DataFrame(
        {
            "Day": [6, 7, 8, 9, 10],
            "Visitors": [1500, 1600, 1200, 900, None]
            })

print("\n\nCounting Null values\n\n", df10.isnull().sum(axis=0))

## Applying a funtion across cols and rows
df7.apply(lambda x: sum(x.isnull()))
### Filling all NaN values with the median value
series1 = df10["Visitors"].fillna(df10["Visitors"].median())
print("\n\nAfter filling NaN with the median\n\n", series1, type(series1))





# PANDAS FROM THE INSIDE
#=======================
# Reading data using read_csv
## We can use a regular expression to specify the seperator if the data is not
## comma seperated
## We can specify column names here if the data doesn't have
cols_names = 'Game Num, Home Team, Home Score, Away Team, Away Score, Date'
df11 = pd.read_csv('scripts/football.txt',
                   sep=r'[. ]\s+',
                   names=cols_names.split(', '),
                   parse_dates=['Date'],
                   engine='python',)
print("Data read with a regex seperator\n\n", df11, "\n", type(df11))
print('Columns: ', df11.columns)
print('Index: ', df11.index)
print('Values: ', df11.values, type(df11.values))
## Let us slice columns where Home Score is greater than or equal 10
print('Sliced', df11.loc[df11['Home Score'] >= 10, 'Home Score':'Away Score'])

## df11['Home Scores'] # gets a pd.Series
## df11[['Home Scores']] # gets a pd.Dataframe
# print('\n\ndf11.blocks\n\n', df11.blocks) # depracation warning

## The BlockManager - doing this for informational purposes only
block_manager = df11._data
print('\n\ndf11 BlockManager\n\n', block_manager)

# print(df11[True, False])
# import inspect
# print(inspect.getsource(df11.__getitem__))
