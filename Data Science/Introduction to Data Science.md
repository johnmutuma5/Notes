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
  - Intervals - they have no true zeros and usually can posses different units of measurement e.g. temperature(degrees and farenheights)
