---
layout: post
title: Baby Steps
category: zap-graphql
---

This post is a part of a series of posts related to my [Google Summer of Code '20 project](/projects/zap-graphql/).

The past week, I worked on the GUI part of the add-on, which is simply two dialog boxes. These dialog boxes allow the user to specify the location of a GraphQL schema and corresponding endpoint. I also read up on some GraphQL concepts.

#### Listing all GraphQL data types
I read the [GraphQL documentation on 'Schemas and Types'](https://graphql.org/learn/schema/) which had a good explanation of the GraphQL type system. Here's a flow chart I created that lists all GraphQL data types:
```
Types +--> Object Types +--> Regular Objects
      |                 +--> "Entry Points" +--> Queries
      |                                     +--> Mutations
      |
      +--> Scalar Types +--> Int
      |                 +--> Float
      |                 +--> String
      |                 +--> Boolean
      |                 +--> ID
      |               
      +--> Enumeration Types
      +--> Abstract Types +--> Interfaces
                          +--> Unions
```
You can click [here](/assets/images/gsoc-week2-types.png) for a more visual representation.

#### Creating Import Dialogs
The code for the import dialogs is very similar to the dialogs from the openapi add-on, with some changes to allow the omission of the schema file path/URL. These changes were necessary because GraphQL endpoints have a neat feature called [Introspection](https://graphql.org/learn/introspection/) that enables us to ask them for information about what queries the schema supports. 

There were also some changes in the validation of URLs. For that, I took hints from the quickstart add-on. To add a URL into the sites tree, I looked at the code from the openapi and soap add-ons.

You can find the code for the import dialogs in my most recent pull request ([#2420](https://github.com/zaproxy/zap-extensions/pull/2420)).


#### Creating a Simple Example
I also experimented with graphql-java and it's [getting started tutorial](https://www.graphql-java.com/documentation/v15/getting-started/).

#### Plans for this Week
After a video call with my mentors today, I now have a clear view of the big picture and the work that I have to do. The first stage of the add-on is ZAP being able to understand an imported schema and generate all possible requests from it. Once the sites tree has been populated, _then_ we will move on to attacks / active scan rules. 

For now, these are the things I have to begin working on: 
- importing a schema from a file
- importing a schema from a URL
- importing a schema from a URL via Introspection
- a spider that finds endpoint URLs
- a parser that understands a schema and generates queries from it

By the way, the title of this post comes from an anime that I watched a while ago. It's about a boy called Maruo Eiichirou who learns to play tennis by taking extensive notes. I found it to be a little slow, but quite motivating. You can [check it out here](https://myanimelist.net/anime/21185/Baby_Steps).

<center>
<table style="table-layout: auto; width: 30%;">
<tbody>
<tr><td align="center">
<img src="/assets/images/gsoc-week2-baby-steps.jpg">
</td></tr>
</tbody>
</table>
</center>