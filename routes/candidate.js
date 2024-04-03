const { Router } = require("express");
const User = require("../models/user");
const router = Router();
const Candidate = require("../models/candidate.js");
const { getDataFromToken } = require("../controllers/getDataFromCookie.js");
const checkForAuthenticationCookie= require("../middlewares/authentication.js");

router.get("/", async (req, res) => {
  try {
    const data = await Candidate.find();
    console.log("data fetch");
    res.status(200).json(data);
    const candidate = await Candidate.find().sort({ voteCount: "desc" });

    // Map the candidates to only return their name and voteCount
    const voteRecord = candidate.map((data) => {
      return {
        name: data.name,
        count: data.voteCount,
        id:data._id
      };
    });

    return res.status(200).json(voteRecord);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//to post a andidate
// router.post("/", async(req, res) => {
//     try {
//         const data =req.body;
//         const newCandidate = new Candidate(data);
//         const saveCandidate=await newCandidate.save();
//         console.log("Candidate saved");
//         res.status(200).json(saveCandidate);
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({error: 'Internal Server Error'});
//     }

// })

//user voting
router.post("/:candidateID", checkForAuthenticationCookie, async (req, res) => {
  // no admin can vote
  // user can only vote once
  const candidateID = req.params.candidateID;
  const userId = req.userAuth.id;

  try {
    // Find the Candidate document with the specified candidateID
    const candidate = await Candidate.findById(candidateID);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if (user.role == "admin") {
      return res.status(403).json({ message: "admin is not allowed" });
    }
    if (user.isVoted) {
      return res.status(400).json({ message: "You have already voted" });
    }

    // Update the Candidate document to record the vote
    candidate.votes.push({ user: userId });
    candidate.voteCount++;
    await candidate.save();

    // update the user document
    user.isVoted = true;
    await user.save();

    return res.status(200).json({ message: "Vote recorded successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
