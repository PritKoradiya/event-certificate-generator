export const getHealthStatus = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Event Certificate Generator API is running"
  });
};
