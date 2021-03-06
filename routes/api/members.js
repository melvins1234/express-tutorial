const express = require("express");
const router = express.Router();

// This is not necessary because we are not using database
const uuid = require("uuid");

const members = require("../../Members");

//Gets All Members
router.get("/", (req, res) => res.json(members));

// Get Single Member
router.get("/:id", (req, res) => {
  let found = members.some((member) => member.id === parseInt(req.params.id));
  if (found)
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  else {
    res.status(400).json({ msg: `No member with the ID of ${req.params.id}` });
  }
});

// Create a member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: `Please include a name and email` });
  }

  members.push(newMember);
  return res.json(members);
});

// Update member

router.put("/:id", (req, res) => {
  let found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updateMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;
        res.json({ msg: "Member udpated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the ID of ${req.params.id}` });
  }
});

module.exports = router;

// Delete member
// Get Single Member
router.delete("/:id", (req, res) => {
  let found = members.some((member) => member.id === parseInt(req.params.id));
  if (found)
    res.json({
      msg: "Member delete",
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  else {
    res.status(400).json({ msg: `No member with the ID of ${req.params.id}` });
  }
});
