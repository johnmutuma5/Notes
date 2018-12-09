# MongoDB Tutorial

[mongoDbTutImgLink]: https://img.youtube.com/vi/VELru-FCWDM/maxresdefault.jpg
[mongoDbTutLink]: https://www.youtube.com/watch?v=VELru-FCWDM
[codingTutorialsLInk]: https://www.youtube.com/watch?v=A3jvoE0jGdE&index=1&list=PLWkguCWKqN9OwcbdYm4nUIXnA2IoXX0LI
[codingTutorialsImgLInk]:https://img.youtube.com/vi/A3jvoE0jGdE/maxresdefault.jpg

Notes as collected from this Academind tutorial [![Thumbnail][mongoDbTutImgLink]][mongoDbTutLink]
and this tutorial from Coding Tutorials [![codingTutorialsLInk][codingTutorialsImgLInk]][codingTutorialsLInk]

## Background
MongoDB is a document based type of a database. The name MongoDB comes from english word humongous because MongoDB is created to store lots of data.

## How it works
A MongoDB database does not have tables, instead it has collections. Inside the collections, it stores documents.

MongoDB relies on a data format called BSON, which stands for Binary JSON. This is what creates a document.

```bson
{
  "name": "Lazuli",
  "age": "1",
  "address": {
    "city": "Nairobi"
  },
  "hobbies": [
    {
      "name": "Music"
    },
    {
      "name": "Art"
    }
  ]
}
```
Nested documents are called embedded documents.

## Usage options
### Local installation
A mongo database can be installed and used locally.

### MongoDB Atlas
It is a cloud managed Mongo database. It runs on the cloud to which we can still connect on a local machine. This option is easier to start with a does a lot of deployment configuration for the application automatically.

### Using the database shell
We can use the shell to run the commands which can be found in the official documention. e.g. `show dbs`.

#### Switching to a database
Use the `use <database_name>` command. If the database name provided in the command does not exist, a new one with that name is created on the fly.

#### Switching to a collection
Use `db.<collection_name>`

#### Inserting to a collection
`db.<collection_name>.insertOne({})`
`db.<collection_name>.insertMany([{}])`

#### Finding documents
`db.<collection_name>.find({})`
`db.<collection_name>.find({age: 26})` - find documents where age is 26

`db.<collection_name>.find({age: {$gt: 26}})` - find documents where age is greater than 26
  - `$gt` is a filter operator

### Aggregating
We can use aggregation to aggregate documents.

`db.collection.aggregate([ <stage 1>, <stage 2> ... <stage N>])`
Running an aggregation with an empty list of stages is synonymous to running a find with an empty query object.

Each aggregation stage works independently from others. Each stage takes documents as input, performs operations and outputs documents.


Each stage starts with a stage operator:
`{$<stage_name>: {} }`

e.g.

`{ $match: { age: { $gte: 20 } } }`

`{ $group: { _id: "$age": } }`

`{ $sort: { count: -1 } }`

Examples of stage operators:
- $match - filter documents by certain queries
- $group - group documents by certain criteria
- $project - filter fields in the documents
- $skip - skips certain amount of the documents
- $out - writes the results of the aggregation into another collection
etc.

#### Aggregation expressions
Expressions refers to the name of the field in the input document. "`$<field_name>`"; keeping in mind that each stage takes as input a list of documents.  

e.g.

- `{ $group: { _id: "$age" } }` - grouping by field named 'age'
- ` { $group: { _id: "$user.origin.country"} }` - grouping by field named 'country' of a nested document called 'user' which also has another nested document called origin. This is called referencing by the dot notation
- ` { $group: { _id: "$name", total: { $sum: "$price" } } }` - groups the input documents by a field called 'name' and applies the cumulative operator `sum` providing the results inside a new property called 'total'


#### Aggregation stages
- $match - match uses query as an argument. e.g.
  ```bson
  {
    $match: {
      $and: [{
        age: { $gte: 21 }
      }, {
        gender: "F"
      }]
    }
  }
  ```
  This is equivalent to using `find` with the same query object.

- $group - groups input documents by certain expressions.
  ```bson
    {
      $group: {
        _id: <expression>,
        <field>: {
          <accumulator>: <expression>
        },
        ...
      }
    }
  ```
  the '\_id' is mandatory. It specifies the group-by criteria. e.g.
  ```bson
  $group: {
    _id: {
      age: "$age",
      gender: "$gender"
    }
  }
  ```
  The column names can take any value but the expressions need to refer to existent document fields.

- $count - this counts the number of documents in an input
  ```BSON
  {
    $count: "Countries"
  }
  ```
  The string passed as value becomes the key of the count result in the resultant object.
  Other count approaches like `toArray().length`, `length` and `find().count()` on the db cursor are available but the first two are significantly slower since they are client-side and receive a cursor that contains documents upon which they perform count whereas the aggregation stage approach only returns the count. The count on find is a wrapper around the aggregation stage count and is just as fast.

- $sort - this sorts the documents with -1 descending and 1 ascending
  ```BSON
  {
    $sort: { age: -1, country: 1 }
  }
  ```

- $project - includes, excludes or adds new fields to input documents.
  It's value is an object that includes field names objects with value as 1 or 0; 1 means include and 0 means exclude the field name from the resultant documents.
  ```BSON
  {
    $project: { age: 1, _id: 0 }
  }
  ```
  If all values are 0, then the resultant documents include all fields except the noted ones. Usually goes after the match stage.

  The project stage can rename the fields using existing field expressions.

  ```BSON
  $project: {
    name: 1,
    _id: 0,
    info: {
      age: "$myAge",
      location: "$origin.country.location"
    }
  }
  ```

- $limit - outputs first N documents from the input documents
  ```BSON
  {
    $limit: 1000
  }
  ```
  It is very useful the the output is very large or when we'd like to fetch topN results in conjunction with the sort stage.

- $unwind - this works with array documents. It splits each document with specified array into several documents i.e. one document per array element.
  ```BSON
  { $unwind: <arrayReferenceExpression> }
  ```
  ```BSON
  {
    $unwind: "$tags"
  }
  ```
  This is commonly used with the group stage to group documents by the values of the array field.

- $out - this stage saves the input documents into a new collection as specified by the stage.
  ```BSON
  {
    $out: "newCollecton"
  }
  ```
  If the target collection is not available, then it's automatically created.

##### Accumulators
These are used in conjunction with the group aggregation stage. e.g. sum, avg, min and max.
```BSON
{ totalQuantity: { $sum: "$quantity" } }
```
In the example above, we get a sum of the quantity field in each group.

```BSON
{
  $group: {
    _id: "$age",
    count: { $sum: 1 }
  }
}
```
The above example will return the count of documents in each resultant group.

##### Unary operators
Unary operators are commonly used in the $project stage of the aggregation. They perform operation of each document. e.g. $type, $or, $lt, $and etc. In the $group stage, unary operators can be used in conjunction with accumulators.

- $type - returns the BSON type of the fields value. { $type: <expression> }
  ```BSON
  { $type: "$age" }
  ```
