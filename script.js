

window.onload = function() {

    // When creating constructor functions it is considered good practice
    // to capitalize the first letter of that function to signify to other
    // developers that it is not a type function.
    function House(bedrooms, bathrooms, numSqft) {
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.numSqft = numSqft;
        this.basement = {
            bedrooms: 1, 
            bathrooms: 1, 
            numSqft: arguments[2] / 2};
    }

    // *****************************************************************************************
    // The 'new' keyword will create an object that when using 'this' in the context of that
    // new object will refer to the parent object. Even if there is only the parent and no 
    // child. This is not the case when utilizing 'this' in relation to objects created without 
    // 'new'. In which case, 'this' will refer to the scope immediately above
    // if utilizing 'this' within the parent. 
    // *****************************************************************************************

    var firstHouse = House(3, 2, 2000);
    console.log(firstHouse); // undefined
    // 'this' currently refers to global scope.

    var secondHouse = new House(3, 2, 2250);
    console.log(secondHouse); // House {bedrooms: 3, bathrooms: 2, numSqft: 2250, basement: {…}}
    // utilizing 'new' alters the scope to the parent object of the constructor function.

    /* 'new' keyword order of operations
    1. It first creates an empty object.
    2. It then sets the keyword 'this' to be that empty object.
    3. It add the line 'return this' to the end of the function, which follows it.
    4. It adds a property onto the empty object called" "__proto__", which links the
       prototype property on the constructor function to the empty object.
       "__proto__", is sometimes referred to as "dunder proto".
    */

    function Dog(name, age) {

        this.name = name;
        this.age = age;
        this.speak = function() {
            console.log(this.name + " says hi");
        }
    }

    var rex = new Dog("Rex", 4);
    rex.speak(); // Rex says hi

    // Code refactoring using binding methods
    function Cat(name, age) {
        // Utilizing apply on the Dog constructor will acquire the properties of
        // Dog, but will maintain the Cat objects scope by using 'this' within the
        // apply parameter.
        Dog.apply(this, arguments);
        this.scratch = function() {
            console.log(this.name + " just scratched me!");
        }
    }

    var linux = new Cat("Linux", 6);
    linux.speak(); // Linux says hi
    linux.scratch(); // Linux just scratched me!
    // rex.scratch(); // Uncaught TypeError: rex.scratch is not a function

    var garry = new Cat("Garry", 3);

    // ***Protype Chain***
    // Backtracking to setp four of the 'new' keyword oerder of operations.
    // Since we used the new keyword, we have established a link between the object and the
    // prototype propety we can access using __proto__
    console.log(linux.__proto__ === Cat.prototype); // true
    console.log(garry.__proto__ === Cat.prototype); // true

    // The Cat.prototype object also has a property called constructor which points back
    // to the function that constructed it.
    console.log(Cat.prototype.constructor === Cat); // true

    // Because of the protype link between all objects created using a similar constructor
    // we can add properties to protype that will be shared amongst all child objects.
    Cat.prototype.isFeline = true;
    console.log(linux.isFeline); // true
    console.log(garry.isFeline); // true

    // *****************************************************************************************
    // Even though isFeline is not directly located withn the constructor funcion we are able
    // to search for the isFeline property like this because of JavaScript's intuitive nature
    // to search the dunder protype chain looking for a match until it either finds it, or
    // gets to the end of the protype chain.
    // ***You can also create functions attached to the prototype chain that will be shared
    // as well. But, you can achieve a similar affect using bind methods***
    // *****************************************************************************************


}