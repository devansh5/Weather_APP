const express=require('express');
const request=require('request');
const bodyparser=require('body-parser');
const app=express();

const port =process.env.PORT || 3000;

app.use(bodyparser.urlencoded({extended:true}));

app.set('view engine','ejs')
app.use(express.static(__dirname + '/public'));
let city='London'
let apikey='e553741d54dc7d56afe2e89648cb44c2'
let url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`


// app.get('/',(req,res)=>{
//     request(url,function(error,response,body){
//         weather_json=JSON.parse(body)
        
//         console.log(weather_json)
//         res.send(weather_json)
//     })
    
// })

app.get('/weather',(req,res)=>{
    res.render('index',{weather:null,error:null})
    
});

app.post('/weather',(req,res)=>{
    let city=req.body.city_name
    let apikey='e553741d54dc7d56afe2e89648cb44c2'
    let url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
    request(url,function(error,response,body){
        if(error){
            res.render('index',{weather:null,error:'Error Please try again'})
        }
        else{
            weather_json = JSON.parse(body);
            let weather={
                city:city ,
                temperature : Math.round(weather_json.main.temp),
                description : weather_json.weather[0].description,
                icon : weather_json.weather[0].icon
            }

            let weather_data={weather:weather};
        

            res.render('index',weather_data)
    }
        });
        
})






app.get("*",(req,res)=>{
    res.send("404 PAGE NOT FOUND")
})



app.listen(port,()=>{
    console.log("server is running")
})