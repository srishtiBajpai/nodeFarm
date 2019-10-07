var http = require("http")
var fs = require("fs")
var data= fs.readFileSync("data.json")
var products= fs.readFileSync("product.html")
var overview= fs.readFileSync("overview.html")
var url = require("url")
var card= fs.readFileSync("cards.html")

products+=""
card+="";
overview+=""
datajson= JSON.parse(data)
  
var str=""                
  

var replace = function(num,template){
    var mytemplate;
             template=template.replace(/#productName#/g,num["productName"])
             template=template.replace(/#From#/g,num["from"])
             template=template.replace(/#nutrients#/g,num["nutrients"])
             template=template.replace(/#Quantity#/g,num["quantity"])
             template=template.replace(/#Price#/g,num["price"])
             template=template.replace(/#image#/g,num["image"])
             template=template.replace(/#discription#/g,num["description"])
             if(!num["organic"])
             {template=template.replace(/#not-organic#/g,"not-organic")}
             template= template.replace(/%%link%%/g,num["id"])

             mytemplate=template;
             return mytemplate;
} 

var server = http.createServer(function(req,res)   
{
    res.writeHead(200,{"content-type":"json"})
  
 var Url =url.parse(req.url,true)

 var id=Url["query"]["id"];

 var num = datajson[id]

 for(var i =0; i<datajson.length;i++)
            {  
                var numb = datajson[i]
              //  console.log(numb)
            str = str + replace(numb,card)
          
        }
              
        

    if(req.url=="/"|| req.url ==""||req.url=="/homepage"|| req.url=="/HOMEPAGE")
     {overview= overview.replace(/#card#/g,str)
        res.write(overview)
     }

    else if(Url.pathname=="/product")
     {
         
           mytemplate=replace(num,products)
//            mytemplate= mytemplate.replace(/%%link%%/g,num)
//    console.log(mytemplate)
             res.write(mytemplate)
         

     }

   
     else if(req.url=="/api")
     {
         res.write(data)
     }
     else 
     {
         res.end("<h1>Error 404 page not found</h1>")
     }

})

var port = process.env.PORT||3000

server.listen(port, function()
{

    console.log("Server listening at 3000")
})