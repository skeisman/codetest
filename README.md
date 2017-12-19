For the last step of the interview process, we'd like to have you write a
little bit of code. We've tried to keep the problem statement minimal so that
it shouldn't take too much time.

If you have any questions please send Mark Glenn an email at mark.glenn@mbx.com. If
the problem statement doesn't specify something, you can make any decision that
you want. Your code will not be evaluated on its ability to handle anything
that wasn't mentioned in the problem statement. You do not need to make any network
calls.

Please include an updated README with your submission describing your approach
to solving the problem. We're looking for a solution that is representative of
code that you would write on a real project. You can complete this at your
convenience — there isn't a specific deadline for it.

Problem Statement
=================

MBX builds single page applications (SPAs) using Angular that rely heavily on
our API.  Because of the number of times we need to make calls out to the API,
we need a simple interface to it in Javascript.

MBX would like you to implement an interface to a simplified version of the MBX
API.  We have left the requirements very vague to allow you freedom in your
design.  Our only requirement is that it should pass all 8 tests in the
/src/api.spec.js file.

Your code should be used to generate a URL path string.  The tests will see if
your URL matches what is expected.

While we greatly simplify what the client library is expected to do in this
problem, we do want the code to be written so it's extendable in the future.

Running the Tests
=================

To run the tests, run the following in the root directory of the project

```
npm install
npm test
```

While you may choose any language to solve this problem that can be run within the
javascript world (e.g. TypeScript), our one requirement is that your solution can
still be run with:

```
npm install
npm test
```

Endpoints
=========

The API has many endpoints that can be called.  In this example, we have 3 endpoints:

```
/items
/customers
/employees
```

It is expected that the number of endpoints will be closer to 100 in the future, so adding
new endpoints shouldn't take too much effort.

Features of the API
===================

Paging
------

The API supports simple paging by passing in the parameters limit and offset.  For example,
if you have a page size of 10 and want the 3rd page, you would pass in the parameters:

```
/endpoint?limit=10&offset=20
```

The client should allow using defaults for limit or offset if one or the other is not given.
In these cases, don't pass in a limit or offset parameter.  The API will handle the defaults
for you.

Use the default offset but limit to 10 results:
```
/endpoint?limit=10
```

Use the default limit but offset by 10 results:
```
/endpoint?offset=10
```

Filtering
---------

The API supports filtering the results using standard operators (=, >, <, >=, <=, etc.). In
this test, we only expect two to be defined in the client library, however, we expect that the code
is able to be extended in the future to the full suite of operators.

### lt

To check if a field is less than a value, use the 'lt' parameter.  For example, if we want to
find all items with a price less than $1000, we would call this:

```
/items?price_lt=1000
```

### gte

To check if a field is greater than or equal to a value, use the 'gte' parameter.  For example, if we want to
find all items with a price greater than or equal to $100, we would call this:

```
/items?price_gte=100
```

## Multiple parameters

A request can include multiple parameters.  To do that, join all the parameters using ampersands (&) like
a standard GET request.

```
/items?price_gte=100&price_lt=1000&limit=10&offset=20
```

* Price is greater than or equal to 100
* Price is less than 1000
* Limit to 10 results per page
* Offset the results by 20 (3rd page)

Expectations and Evaluation Criteria
====================================

As experienced software engineers know, there's a wide variety of solutions to
any problem. Interview coding problems can be especially unclear about
expectations as the tasks can range from a quick fizz buzz screening problem to
fully fledged applications. Although we've given a relatively simple problem to
solve, we're looking for you to implement enough code to demonstrate expertise
with domain modeling and testing.

We're interested in the thought process behind your choices, so please take
some time to capture that in your README. For example, you can represent your
library using classes, functions, or objects. We don't consider any one of
those options better than the others. However, we expect you to make an
intentional choice, implement it consistently, and communicate why you chose
that approach.

In general, we're looking for a little more structure than what the problem
actually necessitates. Although we understand the principle of YAGNI and the
desire to keep code simple, we didn't want to add so many requirements to this
exercise that it'd take a massive amount of time. Don't go overboard with this
— we don't want to see a complex overabundance of abstraction. We also don't
want to see all of the code in a single function, even though this problem is
simple enough to reasonably implement it that way.

We'll be evaluating solutions on:

* object modeling / software design
* testing approach
* use of language idioms relative to expertise with that language
* thought process captured in the README
