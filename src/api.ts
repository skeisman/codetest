type Operator = "e" | "gt" | "lt" | "gte" | "lte";

export default class Api {
    static items() {
        return new ItemsApiUrl();
    }
    static employees() {
        return new EmployeesApiUrl();
    }
    static customers() {
        return new CustomersApiUrl();
    }
}

class ApiUrl {
    protected tokens:string[] = [];

    constructor(public path:string) {
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
        let url = this.path;
        url += this.tokens.length ? '?' : '';
        url += this.tokens.join("&");
        return url;
    }
}

class ItemsApiUrl extends ApiUrl{
    constructor(){
        super("/items");
    }
    price(operator:Operator, value:number) {
        this.tokens.push(`price_${operator}=${value}`);
        return this;
    }
}

class EmployeesApiUrl extends ApiUrl {
    constructor(){
        super("/employees");
    }
}

class CustomersApiUrl extends ApiUrl {
    constructor(){
        super("/customers");
    }
}