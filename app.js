const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const app = express();

const mongoose=require("mongoose");
const session=require("express-session");
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose");
const { urlencoded } = require("body-parser");

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.use(session({
  secret:"Our little secret.",
  resave:false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
const urldb="mongodb url";
mongoose.connect(urldb,{useNewUrlParser:true,useUnifiedTopology: true });
mongoose.set("useCreateIndex",true);

LocalUsers=[];

const userSchema=new mongoose.Schema({
    User:String,
    password:String,
    score:[],
    totalscore:Number});

userSchema.plugin(passportLocalMongoose);
const User=new mongoose.model("User",userSchema);

passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    })
  });


app.get("/",function(req,res){
    res.render("home");
});

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});

app.post("/loginpage",function(req,res){
    res.render("login");
});

app.post("/registerpage",function(req,res){
    res.render("register");
});

app.post("/register",function(req,res){
    User.register(
        {username:req.body.username,totalscore:0},req.body.password,function(err,user){
        if(err){
            res.send(err);
        }
        else{
            passport.authenticate("local")(req,res,function(){ 
                res.redirect("/")
            })
        }
    })
});

app.post("/login",function(req,res){
  usern=req.body.username;
  if(usern){
    const user=new User({
        username:req.body.username,
        password:req.body.password
    })
    req.login(user,function(err){
        if(err){
            res.send(err);
        }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/homepage");
            });
        }

    })
  }
  else{
    res.render("home");
  }
});

app.get("/homepage",function(req,res){
  usern=req.user.username;
    if(usern){
    User.findOne({username:usern},function(err,foundUser){
    if(err){
      console.log(err);
    }
    else{
      if(foundUser){
        foundUser.totalscore=0;
        foundUser.score.forEach(element => {
            foundUser.totalscore=foundUser.totalscore+element;
        });
        // console.log("Score Submitted");
        console.log(foundUser.totalscore);

        foundUser.save(function(){
            res.render("homepage",{
                username:foundUser.username,
                score:foundUser.totalscore
              })
        })
        }
      else{
        res.send("Sorry! Score not updated");
      }
    }
})
    }
    else{
      res.render("home");
    }
});

app.post("/Start/:subject",function(req,res){
  if(req.user){
    let subject=req.params.subject;
    res.render("quiz",{
        username:req.user.username,
        subject:subject,
    })
  }
  else{
    res.render("home");
  }
})

app.post("/SubmitScore/:subject",function(req,res){
  subject=String(req.params.subject);
  usern=req.user.username;
  if(usern){
  User.findOne({username:usern},function(err,foundUser){
    if(err){
      console.log(err);
    }
    else{
      if(foundUser){
        // console.log("Score Submitted");
        const FinalScore=Number(req.body.FinalScore);
        foundUser.score.push(FinalScore);
        console.log(foundUser.score);
        foundUser.save(function(){
          res.redirect("/homepage")
        })
      }
      else{
        res.send("Sorry! Score not updated");
      }
    }
})
  }
  else{
    res.render("home");
  }
})


app.get("/Leaderboard",function(req,res){
  User.find({},function(err,foundUsers){
    if(err){
      console.log(err);
    }
    else{
      if(foundUsers){
        LocalUsers=foundUsers;
        //Got updated list of backed up user data
        }
      else{
        res.send("Sorry! Score not updated");
      }
    }
})

  LocalUsersFiltered=[];

  LocalUsers.forEach((user)=>{
    localuser={
      username:String(user.username),
      totalscore:Number(user.totalscore)
    }
    LocalUsersFiltered.push(localuser);
  })
  
  LocalUsersFiltered.sort((a,b) => 
  (a.totalscore > b.totalscore) ? -1 : 
  ((b.totalscore > a.totalscore) ? 1 : 0)); //Array sorted

  res.render("Leaderboard",{
    Leaderboard:LocalUsersFiltered
  });
});

let port=process.env.PORT;
if(port==null||port==""){
  port=3000;
}

app.listen(port, function() {
  console.log('Server has started successfully');
});