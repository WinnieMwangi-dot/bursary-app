app.post("/api/apply", async (req, res) => {
  try {
    const { fullName, email, school, familyIncome } = req.body;

    const application = new BursaryApplication({
      fullName,
      email,
      school,
      familyIncome,
    });

    await application.save();

    res.status(201).json({ message: "Application submitted and saved!" });
  } catch (err) {
    console.error("Error saving application:", err);
    res.status(500).json({ error: "Failed to save application." });
  }
});
