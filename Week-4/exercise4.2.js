class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

class Teacher extends Person {

    constructor(name, age) {
        super(name, age);
    }

    teach(subject) {
        console.log(this.name + ' teaches ' + subject);
    }
}

var him = new Teacher("Adam", 45);
him.teach("Inheritance");