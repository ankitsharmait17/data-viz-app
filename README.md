# SQL Query application

This is the documentation of the SQL query application. This application allows users to execute sql queries on a table in a particular database.

# Features
Following are the features of the application
 - **Required Features** : 
	 - **New Query** : This features allows a user to query for data stored in tables in a database. Once a user adds a query in the code editor and runs it, they can see a list of results in a tabular format.
 - **Addon Features** :
	 - **Save Query** :  After a user has selected the database and written the query to get the data from the table/s, this feature allows the user to save the query on their local machine. The user can go back to the state he left his query. The saved query can also be edited.
	 - **View Saved Queries** : A user can see a list of queries, that he has saved on his machine. Clicking on any of those queries, will redirect them to the query execution page, which will come prefilled with the saved query.
	 - **Export CSV** : After a user has received a set of results from the query, there is an option to export the result in the form of a CSV file.

# Low Level Details
Framework used to develop the app is  ***VueJS*** version 2. The class based syntax has been used for development.

Additional Packages used : 
- ***vue-class-component*** : Vue Class Component is a library that lets you make your Vue components in class-style syntax.
- ***vue-property-decorator*** : This package provides decorators to support class component style syntax used with vue-class-component.
- ***vue-router*** : Vue Router has been used for client-side routing.
- ***vue-js-modal*** : This package is used for a modal and notifications.
- ***v-tooltip*** : This package is used to provide tooltip for truncated elements.
- ***vue-virtual-scroller*** : This package is used to render the query results, efficiently.
- ***core-js*** : core-js is a popular npm package that provides polyfills for new JavaScript features and standard library enhancements.

***Layout*** of the app consists of a navigation bar with the possible routes and the body below it to render the features in that particular route. The navigation bar has 3 options : 
- ***Home*** : This is the link for the home page.
- ***Saved Queries*** : This is the link to the page where you can see your saved queries.
- ***New Query*** : This is the link to the page where you can write new queries and save them if required.

# Views
Here we will list down all the routes and what are the functionalities we are providing
## Home View
**Route** : `/`

This is the root of the application. Here we have two boxes highlighted : 
- ***New Query*** : Clicking on this option, will take you to the page where you can write an SQL query and get the result.
- ***Saved Queries*** : Clicking on this option, will take you to the page where you can see a list of your saved queries.

## Query View
This is the most feature rich page on the entire application. Below we'll see the minute details of the features and how they were implemented.

**Route** : `/query/:queryId`

The ***queryId*** parameter is an id of any saved query in your system. For a new query the ***queryId*** parameter is set to **new** . On the basis of this, it detects if we are trying to write a new query or view an existing query.

Available features : 
  ***New Query*** 
 You enter this page through the New Query option from the navigation bar or the Home page option. There are three steps to run a query :
 - There is a **database selector**, where the user can select the database, they want to query. On selecting a database, it will display the list of available tables
 - There is a text area input where the user can enter his query and click on run. Clicking on **Run** will run the query and give a set of results. The selected database and the query text are the required inputs.
 -  In the current implementation, I have set 3 databases in a constants file and defined which tables belong to which database. The following are the databases and the corresponding tables : 
	 - **CUSTOMERS_DB**
		 - customers
	- **ORDERS_DB**: 
		- orders
		- products
	- **SUPPLIERS_DB**
		-  suppliers
- When we run a query, the query runner first checks if the table belongs the database. If not, it returns an error. If it belongs to the database, then it returns a predefined json that I have currently set for that particular table. The query runner detects if the query contains the name of the particular table and only then returns the data. For example : If we want to see the orders data, then we need to first select the ORDERS_DB from the database selector and then in the query, the string ***orders*** should be present.
- If the query is successful, it will display a list of results in a tabular format.

***Query Results***
The query results is implemented using the ***vue-virtual-scroller*** package.  Since, the results can be huge in number, it is essential to render them in an optimised manner.  I have used the virtual scroller to render only those items which are visible for the viewport. When the user scrolls at the bottom, the **Intersection observer** which is placed at the bottom, detects this and renders the next items and removes the previous items, required for the viewport. This creates an illusion of infinite scrolling with all the items rendered, but in reality only 8 items are occupying the viewport. This also shows the total number of results returned from the query.

***Export CSV***
After the query results are displayed, there is an option to export these results in the form of a CSV file. It is a useful feature, as analysts are very comfortable in using CSV files and it can be used for many use cases.
Since, there can be 1000s of rows of results, it is a challenge to implement this in JS. If we do this synchronously, it will be block the execution of other things, until the query data is converted to CSV format. So, I implemented this using a **Web worker**. I send the json data in the web worker , with a custom message. When the web worker receives the message along with the data, it processes the json data and converts it into a blob. It then sends this blob to the function in the Queries page. It then creates a download link and clicks on it to download the CSV file. This does not block the JS execution thread and creates a good experience.

***Save Query***
After you have selected the database and written the query in the editor, you have an option to save the query. On clicking on save, it will open up a modal dialog, asking the name you want to save the query with. On clicking on Save, it will save the query with the current epoch as the id. These saved queries can be viewed, in the Saved Queries page.
You can also edit the name of a particular query. This has been implemented using the **Local Storage**.  The model of the query is mentioned below : 

```
{
  "id1": {
    "queryText": "orders",
    "name": "orders1",
    "dbName": "ORDERS_DB"
  },
  "id2": {
    "queryText": "customers",
    "name": "customers1",
    "dbName": "CUSTOMERS_DB"
  }
}
```

I have created a get,update,add methods for Local Storage. These are being saved in key `savedQueries`.

## Saved Query View

**Route** : `/saved-queries`

This page displays the list of saved queries. Clicking on any particular query, will take you to the page where you can run and edit the query.

## Web Vitals

The web vitals have been measured through Lighthouse :


![enter image description here](https://i.postimg.cc/cJx0Z8Ns/Screenshot-2024-03-15-at-12-14-14-PM.png)

![enter image description here](https://i.postimg.cc/C1tgjPn1/Screenshot-2024-03-15-at-12-14-27-PM.png)

![enter image description here](https://i.postimg.cc/V65w0Q6p/Screenshot-2024-03-15-at-12-14-47-PM.png)

![enter image description here](https://i.postimg.cc/8CZDCP1L/Screenshot-2024-03-15-at-12-14-57-PM.png)


## Demo link

https://app.gemoo.com/share/home?codeId=DGW12WJdxpR9o

https://app.gemoo.com/share/home?codeId=P57kjaEkjkjYa

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
