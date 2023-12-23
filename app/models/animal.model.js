module.exports = (sequelize, Sequelize) => {
    const Animal = sequelize.define("animal", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Animal;
  };