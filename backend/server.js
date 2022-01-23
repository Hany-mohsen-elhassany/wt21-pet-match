const express = require('express');
const app = express();
const mongoose = require('mongoose');
const axios = require('axios');
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");

const matchQuiz = require('./models/matchquiz');
const userAnswer = require('./models/answer');
const user = require('./models/user');
const cats = require('./models/cats');


mongoose.connect('mongodb+srv://petmatch-admin:techlab2122@cluster0.9nbuq.mongodb.net/petmatch', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
      secret: "secretcode",
      resave: true,
      saveUninitialized: true,
    })
  );
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
// require("./passportConfig")(passport);


// get all questionnaires from database
app.get('/matchquiz', async(req, res) => {
    const questions = await matchQuiz.find().sort({'questionID': 1});
    res.json(questions);  
});

// non-user --> create dummy account and save answer in Answer collection
app.post("/viewresult", async(req, res) => {
    // create dummy user
    const dummyUser = new user({
        memberAccount: false,
        acceptedConsent: req.body.acceptedConsent
    });
    await dummyUser.save().then(savedDoc => {
        dummyid = savedDoc._id;
    });
    // save answer
    const dummyAnswer = new userAnswer({
        userID: dummyid,
        allChosenAnswer: req.body.allChosenAnswer
    });
    await dummyAnswer.save();
    res.json(dummyAnswer);
    // pass data to model
})

// register new user
app.post("/register", (req, res) => {
    user.findOne({email: req.body.email}, async(err, doc) => {
        if (err) throw err;
        if (doc) res.send('User Already Exists');
        if (!doc) {
            // create new user
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new user({
                email: req.body.email,
                password: hashedPassword,
                memberAccount: true,
                acceptedConsent: req.body.acceptedConsent,
            });
            await newUser.save().then(savedDoc => {
                newid = savedDoc._id;
            });
            // save answer in answer collection
            const newAnswer = new userAnswer({
                userID: newid,
                allChosenAnswer: req.body.allChosenAnswer
            });
            await newAnswer.save();
            res.json(newAnswer);
        }
    })
    // pass data to model
})

// log-in


// 'your matches' for log-in user --> show result based on answer saved in database
// find user & get answers --> send to another route (submit answer to model route)
app.post('/yourmatchesresult', async(req, res) => {
    const ID = req.body.userID;
    const savedAnswer = await userAnswer.findOne({userID: ID}).exec();
    res.json(savedAnswer);
    // how to pass to model route
})

// 'retake quiz' for log-in user ---> user retakes a quiz and we update answer in database
// update answer ---> send to another route (submit answer to model route)
app.patch('/submitretakequiz', async(req, res) => {
    const ID = req.body.userID;
    const newChosenAnswer = req.body.allChosenAnswer;
    for (let newAns of newChosenAnswer){
        updateAnswer = await userAnswer.updateOne(
            {userID: ID, "allChosenAnswer.questionID": newAns.questionID},
            {$set: {"allChosenAnswer.$.chosenAnswer": newAns.chosenAnswer}}
        )
    }
    res.json(req);
    // pass data to model route
})

// connected to model and retrieve cat info from database --> send data to FE
app.post('/showresult', async (req, res) => {
    // const userID = req.body.userID;
    // const userAnswer = req.body.allChosenAnswer;
    // const allAnswer = [];
    // for (let choices of userAnswer){
    //     allAnswer.push(choices["a"]);
    // };
        
    modelOutput = await axios.post('http://omaistat.pythonanywhere.com/predict', [{"1": 1, "2": 2, "3": 4, "4": 3, "5": 2, "6": 5, "7": 4, "8": 3, "9": 4, "10": 5, "11": 3, "12": 4, "13": 5, "14": 2, "15": 3, "16": 4, "17": 5, "18": 4, "19": 3}]
        // userID: userID,
        // allUserAnswer: allAnswer
    );
    console.log(modelOutput)  

    res.send('ok')
    // res.json();
})

// find cat from database
// put in same route as model 
app.post('/showresult1', async (req, res) => {
    const catResult = [];
    for (let cat of req.body.result){
        catInfo = {};
        catInfo['catOrder'] = cat.catOrder;
        const catData = await cats.findOne({catID: cat.catID}).exec();
        catInfo['catData'] = catData;
        catResult.push(catInfo);
    };
    const userResult = {
        userID: req.body.userID,
        Result: catResult
    };
    res.json(userResult);
})

// log-out
app.get('/logout', (req, res) => {
    req.logOut();
})
   

app.listen(3001, () => {
    console.log('it is working!')
})