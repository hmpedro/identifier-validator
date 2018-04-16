const StatusService = require('../services/status.service');

const StatusController = {
  status: (req, res) => {
    res.status(200).send({
      uptime: StatusService.getUptime(),
      queries: StatusService.queries,
    });
  },
};

module.exports = StatusController;
