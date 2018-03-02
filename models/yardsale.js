// ******************************************************************************
//This file holds the Sequelize data which creates the table and columns into our mySQL database 
//using Sequelize.
// ******************************************************************************

module.exports = function(sequelize, DataTypes) {
    var Yardsale = sequelize.define("Yardsale", {

        submitterName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
//changed datatype for yardDate, startTime and endTime to string for now to make it work - Derrick
        yardDate: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        startTime: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        endTime: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },



        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        zip: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        secretCode: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        //changed items to description//

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },


        category: {
            type: DataTypes.STRING,
            defaultValue: "Yard Sale"
        }
    });
    return Yardsale;
};