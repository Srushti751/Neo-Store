const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const userModel = require('./models/userModel.js');


const GOOGLE_CLIENT_ID = "663032186229-f2b5tvi4lc9k646mb88275m9dmucp0em.apps.googleusercontent.com";
const GITHUB_CLIENT_ID = " Iv1.b9953bab06064f4d";
const GOOGLE_CLIENT_SECRET = "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";
const GITHUB_CLIENT_SECRET = "b21657784fc44133efe207e71e1732fab03c588c";



const FACEBOOK_APP_ID = "191937333111640";
const FACEBOOK_APP_SECRET = "fc5953d80052a3239c4c2936c0f36115";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);

      console.log(profile)
      //storing user to database

      const userExists = userModel.findOne({ name: profile.displayName });
      if (userExists) {
        // res.status(400).json("User Exists");
        throw new Error("User already exists");
      }
      else {



        const newblog = new userModel({
          name: profile.displayName,
          password: "123456"
          // profileImg:profile._json.picture
        });
        console.log(newblog);


        newblog.save((error) => {
          if (error) {
            return ((500), console.log("Something went wrong", error))
          }
          console.log("Your data is saved in database!!!")

        })
      }
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);

      const newblog = new userModel({
        name: profile.displayName
      });
      newblog.save((error) => {
        if (error) {
          return ((500), console.log("Something went wrong"))
        }
        console.log("Your data is saved in database!!!")

      })
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);

      const newblog = new userModel({
        name: profile.name,
        profileImg: profile.profile_pic
      });
      newblog.save((error) => {
        if (error) {
          return ((500), console.log("Something went wrong"))
        }
        console.log("Your data is saved in database!!!")

      })
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});