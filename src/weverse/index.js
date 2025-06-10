const puppeteer = require("puppeteer");
require("dotenv").config();
const { postExists, savePost } = require("./src/database/db");
