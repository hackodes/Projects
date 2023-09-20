const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect(process.env.connectionUrl)

const UserSchema = mongoose.Schema({
  username: String,
});

const ExerciseSchema =  mongoose.Schema({
  user_id: { type: String, required: true },
  description: String,
  duration: Number,
  date: Date,
});

const User = mongoose.model("User", UserSchema);
const Exercise = mongoose.model("Exercise", ExerciseSchema);

app.use(cors())
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post("/api/users", async (req, res) => {
  const username = req.body.username;

  const newUser = new User({
    username: username,
  });

  try {
    const user = await newUser.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to create user" });
  }
})

app.get("/api/users", async (req, res) => {
  const usersList = await User.find({}).select("_id username");
  res.json(usersList);
})

app.post("/api/users/:_id/exercises", async (req, res) => {
  const userId = req.params._id;
  const { description, duration, date } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newExercise = new Exercise({
      user_id: user._id,
      description,
      duration,
      date: date ? new Date(date) : new Date(),
    });

    const savedExercise = await newExercise.save();

    res.json({
      _id: user._id,
      username: user.username,
      description: savedExercise.description,
      duration: savedExercise.duration,
      date: new Date(savedExercise.date).toDateString(),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create exercise for user" });
  }
});

app.get("/api/users/:_id/logs", async (req, res) => {
  const userId = req.params._id;
  const { from, to, limit } = req.query;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let exercisesQuery = Exercise.find({ user_id: userId });

    if (from) {
      exercisesQuery = exercisesQuery.where("date").gte(new Date(from));
    }

    if (to) {
      exercisesQuery = exercisesQuery.where("date").lte(new Date(to));
    }

    if (limit) {
      exercisesQuery = exercisesQuery.limit(parseInt(limit, 10));
    } else {
      exercisesQuery = exercisesQuery.limit(80); // Default limit
    }

    const exercises = await exercisesQuery.exec();

    const log = exercises.map((exercise) => ({
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString(),
    }));

    res.json({
      username: user.username,
      count: exercises.length,
      _id: user._id,
      log,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user logs" });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
