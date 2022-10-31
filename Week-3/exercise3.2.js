var employee = {
    firstName: 'ram',
    lastName: 'singh',
}

var employee2 = {
    firstName: 'shyam',
    lastName: 'Singh',
}

var employee3 = {
    firstName: 'krishna',
    lastName: 'patel',
}

let getEmpDetails = function(dept, location) {
    return this.firstName + ' ' + this.lastName + ' works in ' + dept + ' department at ' + location;
}

 empDetails = getEmpDetails.bind(employee, 'Research', 'Mumbai');

 console.log(empDetails());
 console.log(getEmpDetails.call(employee2, "Finance", "Kampala"));
 console.log(getEmpDetails.apply(employee3, ["Technology", "Nairobi"]));