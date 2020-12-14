---
layout: post
title: "GraphQL Query Generator - 1"
category: gsoc
---

This post is a part of a series of posts related to my [Google Summer of Code '20 project](/gsoc). 

I am currently writing code that allows us to generate queries from a given a GraphQL Schema Definition. This post is a summary of the work I have done until now.

The first thing I did was look for existing open source programs that did this. I found a few, but [this was the one that stood out](https://github.com/timqian/gql-generator). It gave me the idea of using a recursive function to generate the queries.

Then I followed the ['Getting Started' tutorial for graphql-java](https://www.graphql-java.com/documentation/v15/getting-started/) and set up a very simple endpoint for testing. 

What I realised was that we didn't need an executable schema to generate queries from it. We could do that solely with a `TypeDefinitionRegistry`. I explored the [graphql-java javadoc](https://javadoc.io/doc/com.graphql-java/graphql-java/15.0/index.html) for a while, and once I had a brief idea of the methods available to me, I decided to write down the logic for the generating function.

Bjarne Stroustrup's 'Programming' is the book I learnt programming from. One advice that I still follow is to "think before you code". It is necessary to have a clear understanding of the logic of the program you're creating; to write it in code is the easy part. The words Stroustrup used were "scribbles on the back of an envelope”.

So I did exactly that. I jotted down the logic of the code on paper first and then in pseudocode so my mentors could review it. The basic idea was to pick an object from the schema -> get all its fields as a list -> traverse through this list and check each field to see if it is a scalar -> If it is, simply print its name and move on and -> if it's an object, send it back through this process.

```
const int MAX_DEPTH = 100
function queryGenerator(ObjectType object, int depth){
    fieldsList = object.getAllFields()
    for (field in fieldsList){
        if (field is scalar){
            print field name
        } else if (depth < MAX_DEPTH && field is object) {
            print field name
            queryGenerator(field, depth+1)
        }
    }
}
```

Since then I have added functionality for nullable fields, interfaces and unions. I also had a lot of fun writing the unit tests for this method. I had to create a couple of schemas from which queries could be generated. Each schema had to have something unique about it, so that if a test failed we would know exactly what was causing the problem. If you're interested, you can find all the code and tests [here](https://github.com/zaproxy/zap-extensions/pull/2485/files). 

Anyways, I still have to add support for lists, arguments, enums, mutations and subscriptions in order to cover a schema completely. I'll write another post when all of that is done.

Until next time!
