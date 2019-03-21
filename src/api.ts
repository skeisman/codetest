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

    protected setToken(token:string) {
        this.tokens.push(token);
        return this;
    }

    limit(value:number) {
        return this.setToken(`limit=${Math.round(value)}`);
    }

    offset(value:number) {
        return this.setToken(`offset=${Math.round(value)}`);
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

    constructor(private key:string, private callback:(token:string) => T) {
    }

    private operator(value:number, operator:Operator) {
        return this.callback(`${this.key}_${operator}=${value}`);
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
        return new filter("price", this.setToken.bind(this));
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