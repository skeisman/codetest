export default class Api {
    static items() {
        return new ItemsUrl();
    }

    static employees() {
        return new EmployeesUrl();
    }

    static customers() {
        return new CustomersUrl();
    }
}

/**
 * @private
 */
class Url {
    protected tokens:string[] = [];

    constructor(private path:string) {
    }

    limit(value:number) {
        this.tokens.push(`limit=${Math.round(value)}`);
        return this;
    }

    offset(value:number) {
        this.tokens.push(`offset=${Math.round(value)}`);
        return this;
    }

    url() {
        //We might want to throw an error or a warning if a user attempts
        // to set the same parameter multiple times.
        let tokenKeys:any = {};
        this.tokens.forEach(token => {
            let tokenKey = token.split("=")[0];
            if (tokenKeys[tokenKey]) {
                //This could also throw an error if that made more sense.
                console.warn(`"${tokenKey}" was used more than once. `)
            }
            tokenKeys[tokenKey] = true;
        });

        let url = this.path;
        url += this.tokens.length ? '?' : '';
        url += this.tokens.join("&");
        return url;
    }
}

type Operator = "e" | "gt" | "lt" | "gte" | "lte";

/**
 * @private
 */
class filter<T> {
    /**
     * @param key the base key for the filter parameter
     * @param parent the parent class instance
     * @param tokens the parent class url tokens collection. Passing a protected member of a class instance to another class instance is
     * not normally best practices. The use of a public setter method would normally be the better choice. In this instance
     * using a public method would expose that setter method to the end user potentially causing more problems than it solved.
     */
    constructor(private key:string, private parent:T, private tokens:string[]) {
    }

    private operator(value:number, operator:Operator) {
        this.tokens.push(`${this.key}_${operator}=${value}`);
        return this.parent;
    }

    greaterThan(value:number):T {
        return this.operator(value, "gt");
    }

    gt(value:number):T {
        return this.operator(value, "gt");
    }

    greaterThanOrEqualTo(value:number):T {
        return this.operator(value, "gte");
    }

    gte(value:number):T {
        return this.operator(value, "gte");
    }

    lessThan(value:number):T {
        return this.operator(value, "lt");
    }

    lt(value:number):T {
        return this.operator(value, "lt");
    }

    lessThanOrEqualTo(value:number):T {
        return this.operator(value, "lte");
    }

    lte(value:number):T {
        return this.operator(value, "lte");
    }

    equalTo(value:number):T {
        return this.operator(value, "e");
    }

    e(value:number):T {
        return this.operator(value, "e");
    }
}

/**
 * @private
 */
class ItemsUrl extends Url {
    constructor() {
        super("/items");
    }

    price():filter<ItemsUrl> {
        return new filter("price", this, this.tokens);
    }
}

/**
 * @private
 */
class EmployeesUrl extends Url {
    constructor() {
        super("/employees");
    }
}

/**
 * @private
 */
class CustomersUrl extends Url {
    constructor() {
        super("/customers");
    }
}