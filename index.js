//dependencies required for the app
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));
/**
 * Local Data Persons
 */

/** Name Class */
function Name(fnameNew, lnameNew) {
    this.fname = fnameNew.toString();
    this.lname = lnameNew.toString();

    console.log("fname:"+this.fname);
    console.log("lname:"+this.lname);
  }
  Name.prototype.getFirstName = function() {
    return this.fname;
  };
  Name.prototype.getLastName = function() {
    return this.lname;
  };
  Name.prototype.setFirstName = function(fnameNew) {
     
    if( typeof(fnameNew) != "undefined")
    {
        this.fname = fnameNew ;
    }

    return this.fname;
  };
  Name.prototype.setLastName = function(lnameNew) {
    if( typeof(lnameNew) != "undefined")
    {
        this.lname = lnameNew ; 
    }
    return this.lname;
  };

  Name.prototype.getFullName = function() {
    let sFullName =  this.getFirstName() + " " + this.getLastName() ;
    console.log("Full Name:" + sFullName);
    return sFullName;
  };

  Name.prototype.setFullName = function(fnameNew, lnameNew) {
    Name.prototype.setFirstName(fnameNew) ;
    Name.prototype.setLastName(lnameNew) ;
  };
/**End of Name Class */
  
/** Address Class */
function Address(streetNew, cityNew) {
    this.street = streetNew.toString();
    this.city = cityNew.toString();

    console.log("street:"+this.street);
    console.log("city:"+this.city);
  }
  Address.prototype.getStreet = function() {
    return this.street;
  };
  Address.prototype.getCity = function() {
    return this.city;
  };
  Address.prototype.setStreet = function(streetNew) {
     
    if( typeof(streetNew) != "undefined")
    {
        this.street = streetNew ;
    }

    return this.street;
  };
  Address.prototype.setCity = function(cityNew) {
    if( typeof(cityNew) != "undefined")
    {
        this.city = cityNew ; 
    }
    return this.city;
  };
  Address.prototype.getAddress = function() {
    let sAddress =  this.getStreet() + " " + this.getCity() ;
    console.log("Address:" + sAddress);
    return sAddress ;
  };

  Address.prototype.setAddress = function(streetNew, cityNew) {
    Address.prototype.setStreet(streetNew) ;
    Address.prototype.setCity(cityNew) ;
  };

/**End of Address Class */

/** Person Class */
function Person(fname, lname, street, city) {
    this.oFullName = new Name(fname, lname) ;
    this.oAddress = new Address(street, city) ;
  }
  Person.prototype.getLastName = function() {
    return this.oFullName.getLastName() ;
  };
  Person.prototype.getFullName = function() {
    return this.oFullName.getFullName() ;
  };
  Person.prototype.getAddress = function() {
    return this.oAddress.getAddress() ;
  };
  Person.prototype.setFullName = function(fname, lname) {
    this.oFullName.setFullName(fname, lname) ;
  };
  Person.prototype.setAddress = function(street, city) {
    this.oAddress.setAddress(street, city) ;
  };
/**End of Person Class */

/**Persons Utility */
var Persons = (function() { 
    let oPersons = [] ;
    
    let Init = function (oPersonsIn) 
    { 
        oPersons = oPersonsIn;
        console.log("Init");
        console.log('First Person[0] = ' + oPersons[0].getFullName()); 
    };
 
    let FindMinRelationLevel = function (oPersonA, oPersonB) 
    { 
        if( oPersonA.getFullName() == oPersonB.getFullName() && oPersonA.getAddress() == oPersonB.getAddress() )
        {
            console.log("Person A:"+oPersonA.getFullName()+" PersonB:"+oPersonB.getFullName()+" are First Degree ");
            return 1 ;
        }
        if( oPersonA.getFullName() == oPersonB.getFullName() && oPersonA.getAddress() != oPersonB.getAddress() )
        {
            console.log("Person A:"+oPersonA.getFullName()+" PersonB:"+oPersonB.getFullName()+" are Second Degree ");
            return 2 ;
        }
        if( oPersonA.getFullName() != oPersonB.getFullName() && oPersonA.getAddress() == oPersonB.getAddress() )
        {
            if( oPersonA.getLastName() == oPersonB.getLastName() )
            {
                console.log("Person A:"+oPersonA.getFullName()+" PersonB:"+oPersonB.getFullName()+" are Second Degree ");
                return 2 ;
            }

            console.log("Person A:"+oPersonA.getFullName()+" PersonB:"+oPersonB.getFullName()+" are Third Degree ");
            return 3 ;
        }
        if( oPersonA.getFullName() != oPersonB.getFullName() && oPersonA.getAddress() != oPersonB.getAddress() )
        {
            console.log("Person A:"+oPersonA.getFullName()+" PersonB:"+oPersonB.getFullName()+" are Zero Degree ");
            return -1 ;
        }
    };
    return { Init: Init, FindMinRelationLevel: FindMinRelationLevel }; 
}
)();

let g_oPersons = new Array() ;
g_oPersons[0] = new Person("Liad", "Kashanovsky", "Blue st.", "Tel-Aviv") ;
g_oPersons[1] = new Person("Omer", "Kashanovsky", "Blue st.", "Tel-Aviv") ;
g_oPersons[2] = new Person("Dan", "Kashanovsky", "Yellow st.", "Tel-Aviv") ;
g_oPersons[3] = new Person("David", "Cohen", "Green st.", "Tel-Aviv") ;

Persons.Init(g_oPersons) ;
Persons.FindMinRelationLevel(g_oPersons[0], g_oPersons[1]) ;
 /*** */

//render the ejs and display added task, completed task
app.get("/", function(req, res) {
    res.render("index", { persons: g_oPersons, personUtility: Persons });
});

//set app to listen on port 3000
app.listen(3000, function() {
    console.log("server is running on port 3000");
});