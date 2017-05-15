import { Meteor } from 'meteor/meteor';
import {WebApp} from 'meteor/webapp';
import '../imports/api/users';
import {Links} from '../imports/api/links';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  // code to run on server at startup



  // let now = new Date();

  // console.log(now);



  // let momentNow = moment(0)


  // console.log(momentNow.fromNow());
    
   WebApp.connectHandlers.use((req,res,next)=>{
    //  console.log("this from my custom middleware");
    //  console.log(req.url,req.method,req.headers,req.query);
    //  res.statusCode = 404;
    //  res.setHeader('my-custom-header',"Bhavaarsh");
    // //  res.write('<h1>Hello world!</h1>');
    //  res.end();

    const _id = req.url.slice(1);
    
     const link = Links.findOne({_id});


     if(link){

        res.statusCode = 302;
        res.setHeader('Location',link.url);
        res.end();

        Meteor.call('links.trackVisit',_id)
     } else {
       next();
     }


    // res.statusCode = 302;
    // res.setHeader('Location','https://www.google.com');
    //  res.end();
   })
});
