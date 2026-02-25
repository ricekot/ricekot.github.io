---
title: "GraphQL Query Generator - 2"
description: "Adding full type support, multiple query strategies, and request methods to the ZAP GraphQL query generator."
date: "Jul 30 2020"
# category: zap-graphql
---

This post is a part of a series of posts related to my [Google Summer of Code '20 project](/projects/zap-graphql/). It is a follow-up to the [last post](/2020/graphql-generator-1) I wrote about the query generation functionality of the GraphQL add-on for OWASP ZAP.

I mentioned using a `TypeDefinitionRegistry` for all the GraphQL types last time. Turns out, the graphql-java library also provides a method for creating an unexecutable schema. I refactored the code to reflect this change. This way I was also able to avoid "raw types" warnings.

The next thing I did was to add support for all the remaining types. Because I had the basic code structure in place, the implementation for these was mostly straightforward. I also added unit tests for each type. This is the first time I ever wrote unit tests, and I realised that I was greatly underestimating their practicality. I was able to stay worry-free about not breaking existing functionality when writing newer code or refactoring thanks to them.

Now that the generator was able to cover the entire schema, I added methods that could send a request in either of these [three ways](https://graphql.org/learn/serving-over-http/),
- a GET request with the query appended to it in a [query string](https://en.wikipedia.org/wiki/Query_string)
- a POST request with a JSON body
- a POST request with a GraphQL body

I also added methods that could generate queries in different ways,
- a separate query for each leaf node (scalar or enum) in the schema
- a separate query for each field under a root type (i.e. a query, mutation, or subscription)
- a separate query for each root type

What was the point of creating all these extra methods? Well, for one, by breaking up queries into multiple small ones, we would be able to avoid scenarios like,

<center>
<table style="table-layout: auto; width: 75%;">
<tbody>
<tr><td align="center">
<img src="/assets/images/graphql-generator-stack-overflow.png">
</td></tr>
<tr><td align="center">
A <a href="https://stackoverflow.com/questions/214741/what-is-a-stackoverflowerror">Stack Overflow Error</a>
</td></tr>
</tbody>
</table>
</center>

They also allowed me to give the user more freedom to decide how they want to query an endpoint,

<center>
<table style="table-layout: auto; width: 75%;">
<tbody>
<tr><td align="center">
<img src="/assets/images/graphql-generator-options-panel.png">
</td></tr>
<tr><td align="center">
The GraphQL Options Panel
</td></tr>
</tbody>
</table>
</center>

With this the GraphQL Query Generation functionality is almost ready. There are still some things that need tweaking, but for now I'm going to be shifting my focus onto [Active Scan Input Vectors](https://www.zaproxy.org/docs/desktop/ui/dialogs/options/ascaninput/) for GraphQL Queries.
