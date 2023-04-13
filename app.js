let express=require('express');
let app=express();
app.use(express.json());
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD'
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
var port=process.env.PORT || 2412;
app.listen(port, ()=>console.log(`Node app listening on port ${port}!`));

let carsData=[
    {id: "ABR12", price: 400000, year: 2015, kms: 25000, model: "Swift Dzire VXi", color: "White"},
    {id: "CBN88", price: 480000, year: 2012, kms: 75000, model: "Etios SMi", color: "Steel Grey"},
    {id: "XER34", price: 300000, year: 2013, kms: 55000, model: "City AXi", color: "Metallic Blue"},
    {id: "MPQ29", price: 400000, year: 2015, kms: 25000, model: "Swift DXi", color: "Black"},
    {id: "PYQ88", price: 480000, year: 2012, kms: 75000, model: "Etios VXi", color: "White"},
    {id: "DFI61", price: 300000, year: 2013, kms: 55000, model: "City ZXi", color: "Red"},
    {id: "JUW88", price: 400000, year: 2015, kms: 25000, model: "Swift Dzire VXi", color: "White"},
    {id: "KPW09", price: 285000, year: 2012, kms: 76321, model: "Swift Dzire VXi", color: "White"},
    {id: "NHH09", price: 725000, year: 2018, kms: 15000, model: "City ZXi", color: "Silver Grey"},
    {id: "CTT26", price: 815000, year: 2016, kms: 42500, model: "City AXi", color: "Metallic Blue"},
    {id: "VAU55", price: 345000, year: 2014, kms: 81559, model: "Swift DXi", color: "Red"},
    {id: "BTR31", price: 184000, year: 2011, kms: 120833, model: "Etios VXi", color: "Silver Grey"}
   ];

let carMaster = [
    {model: "Swift Dzire VXi", make: "Maruti", fuel: "Diesel", 
     colors: ["White", "Silver Grey", "Metallic Blue", "Red"], type: "Sedan", transmission: "Manual"},
    {model: "Etios SMi", make: "Toyota", fuel: "Diesel",
     colors: ["White", "Steel Grey", "Black"], type: "Hatchback", transmission: "Manual"},
    {model: "City AXi", make: "Honda", fuel: "Petrol",
     colors: ["Silver Grey", "Metallic Blue", "Black"], type: "Sedan", transmission: "Automatic"},
    {model: "Swift DXi", make: "Maruti", fuel: "Diesel",
     colors: ["White", "Red", "Black"], type: "Hatchback", transmission: "Manual"},
    {model: "Etios VXi", make: "Toyota", fuel: "Diesel",
     colors: ["White", "Silver Grey", "Black"], type: "Sedan", transmission: "Manual"},
    {model: "City ZXi", make: "Honda", fuel: "Petrol",
     colors: ["Silver Grey", "Metallic Blue", "Red"], type: "Sedan", transmission: "Manual"}
   ];

app.get('/cvr/cars', function(req, res){
    let arr1=carsData;
    const{minprice, maxprice, fuel, type, sort}=req.query
    if(minprice)arr1=arr1.filter(n=>n.price>=1*minprice);
    if(maxprice)arr1=arr1.filter(n=>n.price<=1*maxprice);
    if(fuel){
        let arr2=carMaster.reduce((acc, curr)=>curr.fuel==fuel?[curr.model, ...acc]:acc,[]);
        arr1=arr1.filter(n=>arr2.includes(n.model));
    }
    if(type){
        let arr2=carMaster.reduce((acc, curr)=>curr.type==type?[curr.model, ...acc]:acc,[]);
        arr1=arr1.filter(n=>arr2.includes(n.model));
    }
    if(sort){
        if(sort=='kms') arr1.sort((a,b)=>a.kms-b.kms);
        else if(sort=='price') arr1.sort((a,b)=>a.price-b.price);
        else if(sort=='year') arr1.sort((a,b)=>a.year-b.year);
    };
    res.send(arr1);
});
app.get('/cvr/cars/:id', function(req, res){
    let id=req.params.id;
    let car=carsData.find(st=>st.id==id);
    if(car)res.send(car);
    else res.status(404).send('No customer found');
})

app.post('/cvr/cars', function(req, res){
    let body=req.body;
    carsData.push(body);
    console.log(body);
})

app.put('/cvr/cars/:id', function(req, res){
    let id=req.params.id;
    let body=req.body;
    let index=carsData.findIndex(st=>st.id===id);
    if(index>=0){
        carsData[index]=body;
        res.send(body);
    }
    else res.status(404).send('No student found');
})

app.delete('/cvr/cars/:id', function(req, res){
    let id=req.params.id;
    let index=carsData.findIndex((st)=>st.id===id);
    if(index>=0){
        let deleteCars=carsData.splice(index, 1);
        res.send(deleteCars);
    }
    else res.status(404).send('No student found');

});