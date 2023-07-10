const router = require("express").Router();
const User = require("./users-model");

router.get("/", async (req, res) => {
  try {
    const users = await User.bul();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.idyeGoreBul(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { username } = req.body;
    const foundedUser = await User.goreBul(username);
    if (foundedUser) {
      res.status(422).json({ message: "Yazar zaten var" });
    } else {
      const user = await User.ekle({ username: username });
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.put("/:id", async (req, res) => {
//   try {
//     const { username } = req.body;
//     const user = await User.update({ username: username }, req.params.id);
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const user = await User.remove(req.params.id);
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

module.exports = router;
