const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const SignUp = require("./Signin");
const Image = require("./ImageDetails");
const multer = require("multer");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const blogs = require("./BlogsData");
const Comment = require("./Comment");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/src/imgs/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });
console.log("Hey Server!!!!");
const dbURI =
"mongodb+srv://buniversity4:Adeel044@shariqadeel.6dniwds.mongodb.net/BlogsData?retryWrites=true&w=majority";

const app = express();
app.use('/images', express.static('../frontend/src/imgs/'));
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log(`Server is listening on Port 5000`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
app.use(express.json());
app.use(cors());

let loggedInUsername;
let imgName;
let blogId;
let BlogBody;
let BlogSnip;
let BlogTitle;
const otp = randomstring.generate({
  length: 4,
  charset: "numeric",
});

// SignUp Page
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newLogin = new SignUp({ username, email, password, otp });
    await newLogin.save();
    useremail = newLogin.email;
    console.log(useremail);
    await sendOTPEmail(email, otp);
    console.log("Saved");
    res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
async function sendOTPEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "buniversity4@gmail.com", // your email
      pass: "edncfsesssdwyqcz",
    },
  });
  const mailOptions = {
    from: "Quill Quotient",
    to: email,
    subject: "Quills OTP is For Signup",
    text: `Thank You For Using Our Services \n Your OTP for signup is: ${otp} \n Best ragrds, Adeel Devloper`,
  };

  await transporter.sendMail(mailOptions);
}
// SignUp Page

// OTP PAge
app.post("/otpScreen", async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await SignUp.findOne({ email: useremail });
    console.log(useremail);
    if (otp === user.otp) {
      console.log("Success OTP Verified");
      return res.status(200).json({ message: "OTP verification successful" });
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// OTP PAge

// upload-image Page
app.post("/upload-image", upload.single("image"), async (req, res) => {
  imgName = req.file.filename;
  console.log("haaan");
  try {
    await blogs.create({ im: imgName });
    console.log("Saved img");
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "err" });
  }
});
// upload-image Page

// get-image Page
app.get("/get-image", async (req, res) => {
  try {
    blogs.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (err) {
    res.json({ status: err });
  }
});
// get-image Page

// sidebar Page
app.get("/Sidebar", async (req, res) => {
  try {
    res.status(200).json({ callusername: loggedInUsername });
  } catch (err) {
    console.log("acha");
    res.status(500).json({ error: "Internal server error" });
  }
});
// sidebar Page

// Login Page
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the user exists
    const user = await SignUp.findOne({ username, password });
    if (!user) {
      console.log("No User Found Sorry");
      return res.status(401).json({ error: "Invalid credentials" });
    }
    console.log(" User Found :-> )");
    loggedInUsername = user.username;
    console.log(loggedInUsername);
    return res
      .status(200)
      .json({ message: "Login successful", Logged: user.username });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
// Login Page

// HomeDetails Page
app.post("/HomeDetails", async (req, res) => {
  try {
    const { comment } = req.body;
    const newComment = new Comment({
      username: loggedInUsername,
      comment,
      cod: blogId,
    });
    await newComment.save();
    res.status(200).send("Comment saved successfully");
    console.log("Commented on The Post Sucessfully");
  } catch (error) {
    console.error("Error while saving comment:", error);
    res.status(500).send("Error while saving comment");
  }
});
// HomeDetails Page

// Create Page
app.post("/Create", async (req, res) => {
  try {
    const { title, snippets, body } = req.body;
    const newLogin = new blogs({
      username: loggedInUsername,
      title,
      snippets,
      body,
      im: imgName,
    });
    await newLogin.save();
    const createdBlog = await blogs.findOne({ _id: newLogin._id });
    if (createdBlog) {
      BlogTitle = createdBlog.title;
      BlogSnip = createdBlog.snippets;
      BlogBody = createdBlog.body;
      const formattedBody = `<p>${createdBlog.body.replace(/\n/g, '<br>')}</p>`;
      console.log(BlogTitle);
      return res
        .status(200)
        .json({
          message: "Login successful",
          title: BlogTitle,
          body: formattedBody,
          Snips: BlogSnip,
          imag: createdBlog.im,
        });
    } else {
      console.error("Error retrieving the newly created blog");
      res.status(500).json({ error: "Internal server error" });
    }
    console.log("Data Sent");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Create Page

// Home Page
app.get("/Home", async (req, res) => {
  try {
    const PostedBlogs = await blogs.find();
    if (PostedBlogs.length > 0) {
      return res.json({
        message: "Blog retrieval successful",
        blogs: PostedBlogs,
      });
    } else {
      console.error("Error retrieving the blogs");
      return res.status(404).json({ error: "Blogs not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
// Home Page

// All Blogs Page
app.get("/AllBlogs", async (req, res) => {
  try {
    const PostedBlogs = await blogs.find({ username: loggedInUsername });
    if (PostedBlogs.length > 0) {
      return res.json({
        message: "Blog retrieval successful",
        blogs: PostedBlogs,
      });
    } else {
      console.error("Error retrieving the blogs");
      return res.status(404).json({ error: "Blogs not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
// All Blogs Page

// Home Detail Page
app.get("/HomeDetail/:id", async (req, res) => {
  try {
    blogId = req.params.id;
    console.log("Received request for blog ID:", blogId);
    const blog = await blogs.findById(blogId);
    const cmnt = await Comment.find({ cod: blogId });

    if (blog) {
      return res.json({
        message: "Blog retrieval successful",
        blogs: blog,
        comment: cmnt,
      });
    } else {
      console.error("Error retrieving the blog");
      return res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
// Home Detail Page

// UserBlog Detail Page with the Prams
app.get("/UserBlogDetail/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    console.log("Received request for blog ID:", blogId);
    const blog = await blogs.findById(blogId);

    if (blog) {
      return res.json({
        message: "Blog retrieval successful",
        blogs: blog,
      });
    } else {
      console.error("Error retrieving the blog");
      return res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
// UserBlog Detail Page with the Prams

// UserBlogDetail delete Page From Prams
app.delete("/UserBlogDetail/:id", async (req, res) => {
  try {
    const blog = await blogs.findById(req.params.id);
    const deletedItem = await blogs.findByIdAndDelete(blog);
    if (!deletedItem) {
      return res.status(404).send({ error: "Item not found" });
    } else {
      console.log("deleted");
      return res
        .status(200)
        .send({ message: "Item deleted successfully", deletedItem });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }
});
// UserBlogDetail delete Page From Prams

// Update Page with Prams
app.put("/Update/:id", async (req, res) => {
  try {
    const blog = await blogs.findById(req.params.id);
    console.log("update wla");
    const updatedData = req.body;
    const updatedItem = await Item.findByIdAndUpdate(blog, updatedData, {
      new: true,
    });

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Update Page with Prams

// Update Blog Page with Prams to Upadte Databas
app.put("/UpdatePage/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedBlog = await blogs.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        snippets: req.body.snippets,
        body: req.body.body,
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog updated successfully", updatedBlog });
    console.log("Blog Updated:");
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Update Blog Page with Prams to Upadte Databas

// UserProfile Page
app.get("/UserProfile", async (req, res) => {
  try {
    const Info = await SignUp.findOne({ username: loggedInUsername });
    if (!Info) {
      console.log("No User Data Found You Made Mistake");
      res.status(401).json({ message: "Data not found" });
    } else {
      console.log("User FOund Hurray");
      res
        .status(200)
        .json({
          message: "Data Successfully Retrieved",
          username: loggedInUsername,
          email: Info.email,
          password: Info.password,
        });
    }
  } catch (error) {
    console.error("Error Getting Data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// UserProfile Page
