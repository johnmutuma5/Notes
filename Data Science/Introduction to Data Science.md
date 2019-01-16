# Table of Contents
- [Measures of central tendency](#measures-of-central-tendency)
- [Measures of Asymmetry](#measures-of-asymmetry)
  - [Skewness](#skewness)
- [Measures of variability](#measures-of-variability)
  - [Variance](#variance)
  - [The standard deviation](#the-standard-deviation)
  - [Coefficient of variation](#coefficient-of-variation)

## Techniques for working with traditional data
Data is a very broad term and can be used to refer to:
- raw facts
- processed data
- information

Raw data requires processing because it cannot be analysed straight away. **Data Preprocessing** is an important step in transforming data into more understandable and analysable format. It may come before the actual data processing. e.g. correcting invalid values like a name in an age column.

### Techniques used in preprocessing raw traditional data
- class labelling - categorical vs numerical
- data cleansing/data cleaning/data scrubbing -
  Dealing with inconsistencies such as misspellings
- dealing with missing values

### Visualisations associated with Relational Database Management Systems
- [Entity Relationship diagrams](https://www.lucidchart.com/pages/er-diagrams) - these are also referred to as ER diagrams
- [Relational Schema]()


## Techniques for working with big data
Big data includes a wider range of data types besides numerical and categorical. We can also have digital types like text, audio, video, images etc.

### Techniques used in preprocessing raw big data
- text data mining
- data masking - preserve confidential information

## Business intelligence techniques
This is the stage that comes after raw data has been collected, processed and pre-processed. The stage answers business questions from data. e.g. which region did we make the most sales? How well did we perform this year in comparison to last year?

Some techniques:
- Quantification of observations
- Accumulation/aggregation of observations

Business intelligence involves extracting information from data and presenting it in the form of:
- metrics
- KPIs
- reports
- dashboards

BI can be useful for instance in:
- Price optimisation - varying prices with demand
- Inventory management


# Using data to think about the future
This is the life after business intelligence has been conducted and dashboards and reports generated and we have good understanding of the past. We then need to leverage the data and the information gathered in order to make some predictive decisions from the data.

## Predictive analytics
These comprise classical statistical methods for forecasting and machine learning.

### Traditional data science methods in analytics
#### Techniques used
- Regression - model for quantifying causal relationships between variables in a dataset
  *In a visualisation, a regression line goes straight through the observation points while being as close as it can be to each observation point.* It represents a linear econometric relationship between the variables.

- Logistic regression - this is a non linear model of regression; the values on one of the variables are binary categorical; 0s or 1s. They are useful for decision making process.

- Cluster analysis - different groups in the observations exhibit similar relationships
- Factor analysis - while clustering involves grouping observations together, factoring involves grouping explanatory variables that seem alike together. e.g.

  Question 1: Do you like animals?

  Question 2: Do you discourage cruelty against animals?

  The two questions can be made into one;

  What is your general attitude towards  animals?

- Time series - good for forecasting


### Machine Learning data science methods in analytics
Involves creating an algorithm that a computer uses to find a model that fits data as best as possible and uses it to make accurate predictions.

#### What is a machine learning algorithm?
In plain terms, it is like a trial-and-error process where each consecutive trial is at least as good as the previous one. There are four ingredients:

- Data
- Model
- Objective function
- Optimisation algorithm

When training, the machine is given a goal and not a set of rules!
The learning can be stopped once the machine hits a certain level of accuracy.


#### Types of machine learning
- Supervised learning - involves labelled data
- Unsupervised learning - involves unlabelled data
- Reinforcement learning - introduces a 'reward system'

#### Techniques used
##### Supervised learning
- Support vector machines
- Neural Networks
- Bayesian Networks
- Random forest models
- Deep learning

##### Unsupervised learning
- K-means
- Deep learning

*NB:* Deep learning appears in both types of ML. It's a new revolutionary type of computation(the state-of-the-art ML).

Deep learning has a broad practical scope of application because of the high accuracy of it's models.

##### Reinforcement learning
Similar to unsupervised learning but instead of minimising loss, one maximises reward.

# Popular data Science tools
## Programming languages
R and Python are very popular.
Matlab, Scala and SQL also vastly used. Java, JavaScript, C/C++ are also common in ML.

R and Python are very popular because;
- they are very suitable for mathematical and statistical computations
- they are adaptable

Matlab is ideal for working with mathematical functions or matrix manipulations. Matlab is a paid service; Octave is a good free alternative.

Java and Scala are not designed for doing computations but they prove to be very good when combining data from multiple sources.

## Software
Some software common in Data science;
- Traditional - Excel, SPSS
- Big data - Hadoop(more like a software framework), MongoDB, ApacheHBASE
- BI - PowerBI, Tableau, Qlik, SaS
- ML - Microsoft Azure, AWS, rapid miner

# Characteristics of data (5Vs)
- Volume - size of the data
- Variety - of data types involved
- Velocity - with which it is processed
- Veracity - is it's truthfulness and conformity to facts
- Variability - of sources it has been retrieved from


# Statistics
## Population and Sample
Population - collection of all items of interest to the study `N`. Numbers obtained from a population are called parameters.

Sample - a subset of the population used for a study. `n`. Numbers obtained from a sample are called statistics. A sample must be random(chosen strictly by chance) and representative (accurately reflects the members of the entire population) for an insight to be precise.

## Descriptive statistics
### Classification of data
Data can be classified based on its types and its measurement levels.

#### Based on type
- Categorical - categories or groups e.g. seasons, colour. They are not numbers and cannot be ordered against each observation by magnitude
- Numerical - these can be ordered by their magnitude
  - Discrete - can be counted in a finite manner e.g. no. of children, no. of cars etc.. They can only be represented as integers
  - Continuous - Infinite and impossible to count. Can vary by incomprehensibly small amounts e.g. weight, height, area, distance, time etc.. They can be represented as floating point values


#### Based on levels of measurement
- Qualitative
  - Nominal - akin to categorical data
  - Ordinal - akin to categorical except that they can follow an order of magnitude e.g. low-medium-high, cold-warm-hot,
- Quantitative
  - Ratios - they have true zeros
  - Intervals - they have no true zeros and the distances between any two adjacent points have equal magnitude e.g. temperature(degrees and farenheights)


###  Visualising data
It is very easy to decide on which type of visualisation is most appropriate based on the classification of data by type and/or levels of measurement.

#### Categorical(Nominal and Ordinal) variables visualisation techniques
These are best visualised with:
- Frequency Distribution tables. See example [below](#frequency-distribution-table-example)
- Bar Charts
- Pie Charts
- Pareto diagrams - a pareto diagram is simply a bar chart with the items ordered by their relative frequency and also includes a additional line representing the cumulative frequencies; this is plotted against an additional axis for the frequency line. It can be used to display information that bar graphs would normaly do and additionally shows the cumulative frequencies e.g. top 1, top 2 etc. if ordered in descending order and bottom 1, bottom 2 etc if ordered in ascending order.

#### Numeric(Ratios and Intervals) variables visualisation techniques

- Histogram: when visualising Numeric data on a Histogram, it only makes sense when we group the items into ranges. It is recommended that we use 5 to 20 number of ranges. The interval width can be computed as follows:
  ```
  number of intervals = (max_value - min_value)/diserable_no_of_intervals
  ```
  it is more common to plot a Histogram with the relative frequencies rather than the absolute frequencies.
- Cross Tables:
- Scatter plots:

### Measures of central tendency
#### The mean
This is also known as the simple average. The mean is a very common measure but one of its downsides is that it is easily affected by outliers.

#### The median
This is computed by getting the middle point in an ordered dataset (or an average if the middle point is between two elements in the dataset). It is not affected by outliers giving a less biased representation.

#### The mode
The number that occurs most often. Can be used both for categorical and numerical data.

There is no best measure of central tendency amongst the three but the best practice is to use at least two of them together and the worst practice is to use only one.

### Measures of Asymmetry
#### Skewness
This is a measure of asymmetry that indicates whether the observations in a dataset are skewed on one side.
A quick glance at the measures of central tendency can suggest the type of skewness; if the mean of a dataset is greater than the median, then we have a `positive` or a `right` skew. They are skewed to the right because the outliers are to the right of mean. **By plotting a Histogram on such a dataset, we can see that the outliers are to the right.**

![](notes-images/skewness-types.png)
*[img] Types of skewness in data*

Measures of symmetry such as skewness are the link between measures of central tendency and probability theory which contributes a lot towards understanding the data that we're working with.

### Measures of variability
#### Variance
Measures the dispersion of a set of data points around their mean value.

![Population var](notes-images/pop_variance.png)

*[img] Population variance*


![Sample var](notes-images/sample_variance.png)

*[img] Sample variance*

The variance is also referred to as the `Mean Square Deviation`.
Ideally, the numerator is amplified to the second degree(squared) in order to;
- eliminate the effect of cancelling out negative and positive values when summing
- to amplify the magnitude of large differences

The population variance has a higher potential variability because more data points are available; that is why the denominator in the sample variance is less 1 in order to rightfully correct the sample variance upwards.

#### The standard deviation
In most cases, the value obtained from the variance is huge and hard to compare as the units of measurement are squared. The easy fix is to get the Standard Deviation of the data; this is the square root of the variance. It is also called the `Root Mean Square Deviation`.

![Population SD](notes-images/pop_standard_deviation.png)

*[img] Population standard deviation*

![Sample SD](notes-images/sample_standard_deviation.png)

*[img] Sample standard deviation*

#### Coefficient of variation
This is also called the `Relative standard deviation`. It is the fraction of the standard deviation and the mean. i.e. The standard deviation divided by the mean.

![Population Coeff Var](notes-images/pop_coeff_var.png)

*[img] Population standard deviation* 👆🏽

![Sample Coeff Var](notes-images/sample_coeff_var.png)

*[img] Sample standard deviation*



## Appendix
#### Frequency Distribution Table example
|   |Freq  |
|:-:|:-----|
|A  |20%   |
|B  |30%   |
|C  |50%   |
|**Total**|**100%**|
