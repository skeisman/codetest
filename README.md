My solution makes use of:
* Method Chaining
* Typescript types to enforce method inputs

The main reason I chose this approach is allow maximum code completion and
prevent incorrect api usage.

Notes
=====

Only the Api factory class is exported. All other classes are private and
should never be instantiated by anything other than the factory.

Each endpoint extends ApiUrl to add specific parameters that are only available for that endpoint.
Code completion will only show the parameters that are available for that specific endpoint.
This prevents the use of the price parameter on the customer endpoint.

