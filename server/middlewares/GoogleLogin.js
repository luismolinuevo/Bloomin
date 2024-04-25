import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import prisma from "../db/index.js";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const JSON_KEY = process.env.JSON_KEY;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/google/callback", //put the callback here worked. i called /google
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create the user in the database
        const user = await prisma.user.upsert({
          where: { email: profile.emails[0].value },
          update: {},
          create: {
            email: profile.emails[0].value,
            fullName: profile.displayName,
            userName: profile.emails[0].value,
          },
        });

        // Set the expiration time for the token (e.g., 1 hour from now)
        const expiresIn = "6h";

        // Create a JWT token with an expiration time and send it in the done function
        const token = jwt.sign(
          { id: user.id, email: user.email, fullName: user.fullName },
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
