// passport-config.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import prisma from "../db/index.js";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const JSON_KEY = process.env.JSON_KEY;

// JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JSON_KEY,
};

passport.use(
  new JwtStrategy(jwtOptions, function (payload, done) {
    try {
      return done(null, {
        userName: payload.userName,
        id: payload.id,
        email: payload.email,
      });
    } catch (e) {
      return done(e, null);
    }
  })
);

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create the user in the database
        console.log(profile);
        const user = await prisma.user.upsert({
          where: { email: profile.emails[0].value },
          update: {},
          create: {
            email: profile.emails[0].value,
            // fullName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            userName: profile.displayName,
            imageUrl: profile.photos[0].value
          },
        });

        // Set the expiration time for the token (e.g., 1 hour from now)
        const expiresIn = "6h";

        // Create a JWT token with an expiration time and send it in the done function
        const token = jwt.sign(
          {
            userId: user.id,
            email: user.email,
          },
          JSON_KEY,
          {
            expiresIn,
          }
        );
        return done(null, token);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
