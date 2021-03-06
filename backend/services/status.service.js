const StatusService = {
  startupTime: new Date().getTime(),
  queries: {
    createIdentifier: 0,
    updateIdentifier: 0,
    deleteIdentifier: 0,
    retrieveIdentifier: 0,
  },

  getUptime: () => {
    const now = new Date().getTime();
    return now - StatusService.startupTime;
  },

  incrementQuery: (query) => {
    StatusService.queries[query] += 1;
  },
};

module.exports = StatusService;
