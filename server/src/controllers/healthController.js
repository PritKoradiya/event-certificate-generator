export const getHealthStatus = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Event Certificate and Report Generator API is running",
    modules: ["Certificate Generator", "Event Report Generator"]
  });
};
